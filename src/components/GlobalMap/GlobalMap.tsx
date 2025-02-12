import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { GetProjectDataForBoxPlotQuery, useGetProjectsCountsByCountryQuery } from '@queries'
import 'leaflet/dist/leaflet.css'
import { Center, Text, useMantineTheme } from '@mantine/core'
import { ErrorMessage, Loading } from '@components'
import { useViewportSize } from '@mantine/hooks'

interface GlobalMapProps {
  loading: boolean
  data: GetProjectDataForBoxPlotQuery | undefined
}

export const GlobalMap = (props: GlobalMapProps) => {
  const { loading, data: filteredData } = props
  const { data: mapData, loading: mapLoading, error: mapError } = useGetProjectsCountsByCountryQuery()
  const { height } = useViewportSize()
  const theme = useMantineTheme()

  // Function to check if a country is filtered out based on all criteria
  const isCountryActive = (countryCode: string) => {
    if (!filteredData?.projects.aggregation) return false

    // Check if the country exists in the filtered data
    return filteredData.projects.aggregation.some((agg: { group: string }) => agg.group === countryCode)
  }

  // Calculate circle color based on filter state
  const getCircleColor = (countryCode: string) => {
    return isCountryActive(countryCode) ? theme.colors.green[9] : theme.colors.green[1] // Grayed out color for filtered countries
  }

  // Calculate circle radius based on project count
  const getRadius = (count: number) => {
    const maxCount = Math.max(...(mapData?.projects.groups.map((group) => group.count) || [1]))
    const minRadius = 1
    const maxRadius = 20
    return minRadius + (Math.log(count) / Math.log(maxCount)) * (maxRadius - minRadius)
  }

  return (
    <div data-testid='GlobalMap'>
      {mapLoading || loading ? (
        <Center style={{ height: height * 0.9 }}>
          <Loading />
        </Center>
      ) : (
        <div style={{ height: height * 0.9, position: 'relative', zIndex: 0 }}>
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
      )}
      {mapError ? (
        <ErrorMessage
          error={{ message: `${mapError.message}. If the problem persists, contact support at office@gbdi.io.` }}
        />
      ) : null}
    </div>
  )
}
