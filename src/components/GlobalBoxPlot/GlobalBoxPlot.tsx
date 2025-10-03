import { Center, Grid, MultiSelect, RangeSlider, Skeleton, Stack, Text } from '@mantine/core'
import { BoxPlot, BoxPlotData, FilterState, Loading } from '@components'
import { BuildingTypology, GetProjectDataForBoxPlotQuery, LifeCycleStage } from '@queries'
import { useMemo } from 'react'
import { useElementSize, useViewportSize } from '@mantine/hooks'

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

interface GlobalBoxPlotProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  data: GetProjectDataForBoxPlotQuery | undefined
  loading: boolean
}

export const GlobalBoxPlot = (props: GlobalBoxPlotProps) => {
  const { filters, onFiltersChange, loading, data } = props
  const {
    selectedTypologies,
    selectedLifeCycleStages,
    selectedCountries,
    selectedSoftware,
    selectedSources,
    gfaRange,
  } = filters
  const { height } = useViewportSize()
  const { ref, height: gridHeight } = useElementSize()

  const handleSourceChange = (value: string[]) => {
    if (value.includes('all')) {
      const allSources = sourceOptions.filter((option) => option.value !== 'all').map((option) => option.value)
      onFiltersChange({ ...filters, selectedSources: allSources })
    } else {
      onFiltersChange({ ...filters, selectedSources: value })
    }
  }

  const sourceOptions = useMemo(() => {
    if (!data) return []
    const sourceSet = new Set<string>()
    data.projects.groups.forEach((group) => {
      // Iterate over all items in the group
      group.items.forEach((item) => {
        const sourceName = item.metaData?.source?.name
        if (sourceName) sourceSet.add(sourceName)
      })
    })
    const options = Array.from(sourceSet).map((source) => ({
      value: source,
      label: source,
    }))
    return [{ value: 'all', label: 'Select All' }, ...options.sort((a, b) => a.label.localeCompare(b.label))]
  }, [data])

  const handleTypologyChange = (value: string[]) => {
    onFiltersChange({ ...filters, selectedTypologies: value })
  }

  const handleLifeCycleStageChange = (value: string[]) => {
    if (value.includes('all')) {
      const allStages = Object.values(LifeCycleStage)
      onFiltersChange({ ...filters, selectedLifeCycleStages: allStages })
    } else {
      onFiltersChange({ ...filters, selectedLifeCycleStages: value })
    }
  }

  const handleCountryChange = (value: string[]) => {
    if (value.includes('all')) {
      const allCountries = countryOptions.filter((option) => option.value !== 'all').map((option) => option.value)
      onFiltersChange({ ...filters, selectedCountries: allCountries })
    } else {
      onFiltersChange({ ...filters, selectedCountries: value })
    }
  }

  const handleSoftwareChange = (value: string[]) => {
    if (value.includes('all')) {
      const allSoftware = softwareOptions.filter((option) => option.value !== 'all').map((option) => option.value)
      onFiltersChange({ ...filters, selectedSoftware: allSoftware })
    } else {
      onFiltersChange({ ...filters, selectedSoftware: value })
    }
  }

  const handleRangeChange = (value: [number, number]) => {
    onFiltersChange({ ...filters, gfaRange: value })
  }

  const handleRangeConfirm = (value: [number, number]) => {
    onFiltersChange({
      ...filters,
      gfaRange: value,
      confirmedGfaRange: value,
    })
  }

  // Options for select components
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

  return (
    <Stack data-testid='GlobalBoxPlot' style={{ height: height * 0.9 }}>
      <Grid ref={ref}>
        <Grid.Col span={4}>
          <Skeleton visible={loading}>
            <MultiSelect
              data={typologyOptions}
              value={selectedTypologies}
              onChange={handleTypologyChange}
              label='Building Typology'
              placeholder='Select building typologies'
            />
          </Skeleton>
        </Grid.Col>
        <Grid.Col span={4}>
          <Skeleton visible={loading}>
            <MultiSelect
              data={lifeCycleOptions}
              value={selectedLifeCycleStages}
              onChange={handleLifeCycleStageChange}
              label='Life Cycle Stage'
              placeholder='Select life cycle stages'
            />
          </Skeleton>
        </Grid.Col>
        <Grid.Col span={4}>
          <Skeleton visible={loading}>
            <MultiSelect
              data={countryOptions}
              value={selectedCountries}
              onChange={handleCountryChange}
              label='Country'
              placeholder='Select countries'
              searchable
              clearable
            />
          </Skeleton>
        </Grid.Col>
        <Grid.Col span={4}>
          <Skeleton visible={loading}>
            <MultiSelect
              data={softwareOptions}
              value={selectedSoftware}
              onChange={handleSoftwareChange}
              label='LCA Software'
              placeholder='Select LCA software'
              searchable
              clearable
            />
          </Skeleton>
        </Grid.Col>
        <Grid.Col span={4}>
          <Skeleton visible={loading}>
            <MultiSelect
              data={sourceOptions}
              value={selectedSources}
              onChange={handleSourceChange}
              label='Source'
              placeholder='Select sources'
              searchable
              clearable
            />
          </Skeleton>
        </Grid.Col>
        <Grid.Col span={4}>
          <Skeleton visible={loading}>
            <Text size='sm' fw={500} style={{ marginBottom: '0.5rem' }}>
              Gross Floor Area Range
            </Text>
            <RangeSlider
              min={0}
              max={5000}
              step={100}
              value={gfaRange}
              onChange={handleRangeChange}
              onChangeEnd={handleRangeConfirm}
              label={formatGfaValue}
              marks={[
                { value: 0, label: '0 m²' },
                { value: 2500, label: '2500 m²' },
                { value: 5000, label: '5000 m²' },
              ]}
            />
          </Skeleton>
        </Grid.Col>
      </Grid>
      <Center style={{ height: height * 0.9 - gridHeight }}>
        {loading ? (
          <Loading />
        ) : (
          <BoxPlot data={boxPlotData} orientation='vertical' valueAxisLabel='GWP Intensity (kgCO₂eq/m²)' />
        )}
      </Center>
    </Stack>
  )
}
