/*
import { Center, Grid, MultiSelect, Select, Stack } from '@mantine/core'
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

export const GlobalBoxPlot = () => {
  const [selectedTypologies, setSelectedTypologies] = useState<string[]>([])
  const [selectedLifeCycleStage, setSelectedLifeCycleStage] = useState<string>(LifeCycleStage.A1A3)

  const typologyOptions = useMemo(
    () =>
      Object.values(BuildingTypology).map((value) => ({
        value,
        label: formatEnumValue(value),
      })),
    [],
  )

  const lifeCycleOptions = useMemo(
    () =>
      Object.values(LifeCycleStage).map((value) => ({
        value,
        label: capitalizeEnumValue(value),
      })),
    [],
  )

  const aggregation = useMemo(() => {
    const divideAggregation = {
      $divide: [`$results.gwp.${selectedLifeCycleStage}`, '$projectInfo.grossFloorArea.value'],
    }
    const typologyFilter =
      selectedTypologies.length > 0 ? { 'projectInfo.buildingTypology': { $in: selectedTypologies } } : {}

    return [
      {
        $match: {
          $and: [
            { [`results.gwp.${selectedLifeCycleStage}`]: { $gt: 0 } },
            { 'projectInfo.grossFloorArea.value': { $gt: 0 } },
            typologyFilter,
          ],
        },
      },
      {
        $group: {
          _id: '$location.country',
          count: { $sum: 1 },
          minimum: { $min: divideAggregation },
          percentiles: { $percentile: { p: [0.25, 0.75], method: 'approximate', input: divideAggregation } },
          median: { $median: { method: 'approximate', input: divideAggregation } },
          maximum: { $max: divideAggregation },
          average: { $avg: divideAggregation },
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
  }, [selectedTypologies, selectedLifeCycleStage])

  const { data, loading, error } = useGetProjectDataForBoxPlotQuery({ variables: { aggregation } })

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
          name: data.projects.groups.find((group) => group.group == agg.group)?.items[0].location.countryName,
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
        <Grid.Col span={6}>
          <MultiSelect
            data={typologyOptions}
            value={selectedTypologies}
            onChange={(value: string[]) => setSelectedTypologies(value)}
            label='Building Typology'
            placeholder='Select building typologies'
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            data={lifeCycleOptions}
            value={selectedLifeCycleStage}
            onChange={(value: string | null) => {
              if (value) setSelectedLifeCycleStage(value as LifeCycleStage)
            }}
            label='Life Cycle Stage'
            placeholder='Select life cycle stage'
          />
        </Grid.Col>
      </Grid>
      <BoxPlot data={boxPlotData} />
    </Stack>
  )
}
*/

import { Center, Grid, MultiSelect, Select, Stack } from '@mantine/core'
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

export const GlobalBoxPlot = () => {
  const [selectedTypologies, setSelectedTypologies] = useState<string[]>([])
  const [selectedLifeCycleStage, setSelectedLifeCycleStage] = useState<string>(LifeCycleStage.A1A3)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])

  const typologyOptions = useMemo(
    () =>
      Object.values(BuildingTypology).map((value) => ({
        value,
        label: formatEnumValue(value),
      })),
    [],
  )

  const lifeCycleOptions = useMemo(
    () =>
      Object.values(LifeCycleStage).map((value) => ({
        value,
        label: capitalizeEnumValue(value),
      })),
    [],
  )

  const aggregation = useMemo(() => {
    const divideAggregation = {
      $divide: [`$results.gwp.${selectedLifeCycleStage}`, '$projectInfo.grossFloorArea.value'],
    }
    const typologyFilter =
      selectedTypologies.length > 0 ? { 'projectInfo.buildingTypology': { $in: selectedTypologies } } : {}
    const countryFilter = selectedCountries.length > 0 ? { 'location.country': { $in: selectedCountries } } : {}

    return [
      {
        $match: {
          $and: [
            { [`results.gwp.${selectedLifeCycleStage}`]: { $gt: 0 } },
            { 'projectInfo.grossFloorArea.value': { $gt: 0 } },
            typologyFilter,
            countryFilter,
          ],
        },
      },
      {
        $group: {
          _id: '$location.country',
          count: { $sum: 1 },
          minimum: { $min: divideAggregation },
          percentiles: { $percentile: { p: [0.25, 0.75], method: 'approximate', input: divideAggregation } },
          median: { $median: { method: 'approximate', input: divideAggregation } },
          maximum: { $max: divideAggregation },
          average: { $avg: divideAggregation },
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
  }, [selectedTypologies, selectedLifeCycleStage, selectedCountries])

  const { data, loading, error } = useGetProjectDataForBoxPlotQuery({ variables: { aggregation } })

  const countryOptions = useMemo(() => {
    if (!data) return []

    const countries = data.projects.groups.map((group) => ({
      value: group.group,
      label: group.items[0].location.countryName,
    }))

    return [{ value: 'all', label: 'Select All' }, ...countries.sort((a, b) => a.label.localeCompare(b.label))]
  }, [data])

  const handleCountryChange = (value: string[]) => {
    if (value.includes('all')) {
      const allCountries = countryOptions.filter((option) => option.value !== 'all').map((option) => option.value)
      setSelectedCountries(allCountries)
    } else {
      setSelectedCountries(value)
    }
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
          name: data.projects.groups.find((group) => group.group == agg.group)?.items[0].location.countryName,
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
          <Select
            data={lifeCycleOptions}
            value={selectedLifeCycleStage}
            onChange={(value: string | null) => {
              if (value) setSelectedLifeCycleStage(value as LifeCycleStage)
            }}
            label='Life Cycle Stage'
            placeholder='Select life cycle stage'
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
      </Grid>
      <BoxPlot data={boxPlotData} />
    </Stack>
  )
}
