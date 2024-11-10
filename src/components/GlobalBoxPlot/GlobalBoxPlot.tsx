import { Center, Grid, MultiSelect, Stack, RangeSlider, Text } from '@mantine/core'
import { BoxPlot, BoxPlotData, Loading } from '@components'
import { useGetProjectDataForBoxPlotQuery, LifeCycleStage, BuildingTypology } from '@queries'
import { useState, useMemo } from 'react'

const formatEnumValue = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const capitalizeEnumValue = (value: string): string => {
  return value.toUpperCase()
}

const formatCountryName = (countryName: string): string => {
  switch (countryName) {
    case 'United Kingdom of Great Britain and Northern Ireland':
      return 'UK'
    case 'United States of America':
      return 'USA'
    case 'Korea, Republic of':
      return 'South Korea'
    default:
      return countryName
  }
}

export const GlobalBoxPlot = () => {
  const [selectedTypologies, setSelectedTypologies] = useState<string[]>([])
  const [selectedLifeCycleStages, setSelectedLifeCycleStages] = useState<string[]>([LifeCycleStage.A1A3])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([])
  const [gfaRange, setGfaRange] = useState<[number, number]>([0, 5000])
  const [confirmedGfaRange, setConfirmedGfaRange] = useState<[number, number]>([0, 5000])

  const typologyOptions = useMemo(
    () =>
      Object.values(BuildingTypology).map((value) => ({
        value,
        label: formatEnumValue(value),
      })),
    [],
  )

  const lifeCycleOptions = useMemo(
    () => [
      { value: 'all', label: 'Select All' },
      ...Object.values(LifeCycleStage).map((value) => ({
        value,
        label: capitalizeEnumValue(value),
      })),
    ],
    [],
  )

  const aggregation = useMemo(() => {
    const divideAggregation = {
      $sum: selectedLifeCycleStages.map((stage) => `$results.gwp.${stage.toLowerCase()}`),
    }
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
          minimum: { $min: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] } },
          percentiles: {
            $percentile: {
              p: [0.25, 0.75],
              method: 'approximate',
              input: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] },
            },
          },
          median: {
            $median: {
              method: 'approximate',
              input: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] },
            },
          },
          maximum: { $max: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] } },
          average: { $avg: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] } },
        },
      },
      {
        $project: {
          _id: null,
          group: '$_id',
          count: '$count',
          min: '$minimum',
          pct: '$percentiles',
          median: '$median',
          max: '$maximum',
          avg: '$average',
        },
      },
    ]
  }, [selectedTypologies, selectedLifeCycleStages, selectedCountries, selectedSoftware, confirmedGfaRange])

  const { data, loading, error } = useGetProjectDataForBoxPlotQuery({ variables: { aggregation } })

  const handleLifeCycleStageChange = (value: string[]) => {
    if (value.includes('all')) {
      const allStages = Object.values(LifeCycleStage)
      setSelectedLifeCycleStages(allStages)
    } else {
      setSelectedLifeCycleStages(value)
    }
  }

  const countryOptions = useMemo(() => {
    if (!data) return []
    const countries = data.projects.groups.map((group) => ({
      value: group.group,
      label: formatCountryName(group.items[0].location.countryName),
    }))
    return [{ value: 'all', label: 'Select All' }, ...countries.sort((a, b) => a.label.localeCompare(b.label))]
  }, [data])

  const softwareOptions = useMemo(() => {
    if (!data) return []
    const softwareSet = new Set<string>()
    data.projects.groups.forEach((group) => {
      const software = group.items[0].softwareInfo?.lcaSoftware
      if (software) softwareSet.add(software)
    })

    const options = Array.from(softwareSet).map((software) => ({
      value: software,
      label: software,
    }))

    return [{ value: 'all', label: 'Select All' }, ...options.sort((a, b) => a.label.localeCompare(b.label))]
  }, [data])

  const handleCountryChange = (value: string[]) => {
    if (value.includes('all')) {
      const allCountries = countryOptions.filter((option) => option.value !== 'all').map((option) => option.value)
      setSelectedCountries(allCountries)
    } else {
      setSelectedCountries(value)
    }
  }

  const handleSoftwareChange = (value: string[]) => {
    if (value.includes('all')) {
      const allSoftware = softwareOptions.filter((option) => option.value !== 'all').map((option) => option.value)
      setSelectedSoftware(allSoftware)
    } else {
      setSelectedSoftware(value)
    }
  }

  const handleRangeConfirm = (value: [number, number]) => {
    setGfaRange(value)
    setConfirmedGfaRange(value)
  }

  const formatGfaValue = (value: number) => {
    return `${value.toLocaleString()} m²`
  }

  const boxPlotData: BoxPlotData[] = useMemo(() => {
    if (!data) return []

    return data.projects.aggregation
      .map(
        (agg: {
          min: number
          pct: [number, number]
          median: number
          max: number
          avg: number
          group: string
          count: number
        }) => ({
          min: agg.min,
          pct25: agg.pct[0],
          median: agg.median,
          pct75: agg.pct[1],
          max: agg.max,
          avg: agg.avg,
          name: formatCountryName(
            data.projects.groups.find((group) => group.group == agg.group)?.items[0].location.countryName ?? '',
          ),
          count: agg.count,
        }),
      )
      .sort((a: BoxPlotData, b: BoxPlotData) => (a.name && b.name ? a.name.localeCompare(b.name) : 0))
  }, [data])

  if (loading)
    return (
      <Center style={{ height: '600px' }}>
        <Loading />
      </Center>
    )
  if (error) return <p>Error: {error.message}</p>

  return (
    <Stack>
      <Grid>
        <Grid.Col span={4}>
          <MultiSelect
            data={typologyOptions}
            value={selectedTypologies}
            onChange={(value: string[]) => setSelectedTypologies(value)}
            label='Building Typology'
            placeholder='Select building typologies'
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <MultiSelect
            data={lifeCycleOptions}
            value={selectedLifeCycleStages}
            onChange={handleLifeCycleStageChange}
            label='Life Cycle Stage'
            placeholder='Select life cycle stages'
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <MultiSelect
            data={countryOptions}
            value={selectedCountries}
            onChange={handleCountryChange}
            label='Country'
            placeholder='Select countries'
            searchable
            clearable
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <MultiSelect
            data={softwareOptions}
            value={selectedSoftware}
            onChange={handleSoftwareChange}
            label='LCA Software'
            placeholder='Select LCA software'
            searchable
            clearable
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size='sm' fw={500} style={{ marginBottom: '0.5rem' }}>
            Gross Floor Area Range
          </Text>
          <RangeSlider
            min={0}
            max={5000}
            step={100}
            value={gfaRange}
            onChange={setGfaRange}
            onChangeEnd={handleRangeConfirm}
            onBlur={() => setConfirmedGfaRange(gfaRange)}
            label={formatGfaValue}
            marks={[
              { value: 0, label: '0 m²' },
              { value: 2500, label: '2500 m²' },
              { value: 5000, label: '5000 m²' },
            ]}
          />
        </Grid.Col>
      </Grid>
      <BoxPlot data={boxPlotData} />
    </Stack>
  )
}
