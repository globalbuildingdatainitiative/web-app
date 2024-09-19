import { Center, Grid, MultiSelect, Select, Stack } from '@mantine/core'
import { BoxPlot, BoxPlotData, Loading } from '@components'
import { useGetProjectDataForBoxPlotQuery, LifeCycleStage, BuildingTypology } from '@queries'
import { useState, useMemo } from 'react'

export const GlobalBoxPlot = () => {
  const [selectedTypologies, setSelectedTypologies] = useState<string[]>([])
  const [selectedLifeCycleStage, setSelectedLifeCycleStage] = useState<string>(LifeCycleStage.A1A3)

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

    return data.projects.aggregation.map(
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
            data={Object.values(BuildingTypology)}
            value={selectedTypologies}
            onChange={(value: string[]) => setSelectedTypologies(value)}
            label='Building Typology'
            placeholder='Select building typologies'
          />
          </Grid.Col>
        <Grid.Col span={6}>
          <Select
            data={Object.values(LifeCycleStage)}
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
