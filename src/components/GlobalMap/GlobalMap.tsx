import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { useGetProjectsCountsByCountryQuery, useGetProjectDataForBoxPlotQuery } from '@queries'
import 'leaflet/dist/leaflet.css'
import { Center, useMantineTheme, Text } from '@mantine/core'
import { Loading } from '@components'
import { useViewportSize } from '@mantine/hooks'
import { FilterState } from '@components'
import { useMemo } from 'react'

interface GlobalMapProps {
  filters: FilterState
}

export const GlobalMap = ({ filters }: GlobalMapProps) => {
  const { data: mapData, loading: mapLoading, error: mapError } = useGetProjectsCountsByCountryQuery()
  const { height } = useViewportSize()
  const theme = useMantineTheme()

  // Create aggregation pipeline based on all filters
  const aggregation = useMemo(() => {
    const { selectedTypologies, selectedLifeCycleStages, selectedCountries, selectedSoftware, confirmedGfaRange } =
      filters

    // Build filter conditions
    const typologyFilter =
      selectedTypologies.length > 0 ? { 'projectInfo.buildingTypology': { $in: selectedTypologies } } : {}
    const countryFilter = selectedCountries.length > 0 ? { 'location.country': { $in: selectedCountries } } : {}
    const softwareFilter = selectedSoftware.length > 0 ? { 'softwareInfo.lcaSoftware': { $in: selectedSoftware } } : {}
    const gfaFilter = {
      'projectInfo.grossFloorArea.value': {
        $gte: confirmedGfaRange[0],
        $lte: confirmedGfaRange[1],
      },
    }
    const stageFilters = selectedLifeCycleStages.map((stage) => ({
      [`results.gwp.${stage.toLowerCase()}`]: { $gt: 0 },
    }))

    return [
      {
        $match: {
          $and: [
            ...stageFilters,
            { 'projectInfo.grossFloorArea.value': { $gt: 0 } },
            typologyFilter,
            countryFilter,
            softwareFilter,
            gfaFilter,
          ],
        },
      },
      {
        $group: {
          _id: '$location.country',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          group: '$_id',
          count: 1,
        },
      },
    ]
  }, [filters])

  // Get filtered data for determining active countries
  const { data: filteredData, loading: filterLoading } = useGetProjectDataForBoxPlotQuery({
    variables: { aggregation },
  })

  // Function to check if a country is filtered out based on all criteria
  const isCountryActive = (countryCode: string) => {
    if (!filteredData?.projects.aggregation) return false

    // Check if the country exists in the filtered data
    return filteredData.projects.aggregation.some((agg: { group: string }) => agg.group === countryCode)
  }

  // Calculate circle color based on filter state
  const getCircleColor = (countryCode: string) => {
    return isCountryActive(countryCode) ? theme.primaryColor : theme.colors.gray[4] // Grayed out color for filtered countries
  }

  // Calculate circle radius based on project count
  const getRadius = (count: number) => {
    const maxCount = Math.max(...(mapData?.projects.groups.map((group) => group.count) || [1]))
    const minRadius = 1
    const maxRadius = 20
    return minRadius + (Math.log(count) / Math.log(maxCount)) * (maxRadius - minRadius)
  }

  if (mapLoading || filterLoading)
    return (
      <Center style={{ height: '600px' }}>
        <Loading />
      </Center>
    )
  if (mapError) return <p>Error: {mapError.message}</p>

  return (
    <div style={{ height: height * 0.9 }} data-testid='GlobalMap'>
      <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {mapData?.projects.groups.map((projectGroup, index) => {
          const countryCode = projectGroup.group
          return (
            <CircleMarker
              key={index}
              radius={getRadius(projectGroup.count)}
              pathOptions={{
                color: 'white',
                weight: 1,
                fillColor: getCircleColor(countryCode),
                fillOpacity: 1,
              }}
              center={[projectGroup.items[0].location.latitude, projectGroup.items[0].location.longitude]}
            >
              <Popup>
                <Text>{projectGroup.items[0].location.countryName}</Text>
                <Text>Number of Projects: {projectGroup.count}</Text>
                {!isCountryActive(countryCode) && (
                  <Text size='sm' c='dimmed'>
                    (Filtered out by current selection)
                  </Text>
                )}
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}
