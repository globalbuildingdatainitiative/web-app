import { Center } from '@mantine/core'
import { BoxPlot, BoxPlotData, Loading } from '@components'
import { useGetProjectDataForBoxPlotQuery } from '@queries'
import { useMemo } from 'react'

export const GlobalBoxPlot = () => {
  const divideAggregation = { $divide: ['$results.gwp.a1a3', '$projectInfo.buildingFootprint.value'] }
  const aggregation = [
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
  const { data, loading, error } = useGetProjectDataForBoxPlotQuery({ variables: { aggregation: aggregation } })

  const boxPlotData: BoxPlotData[] = useMemo(() => {
    if (!data) return []

    return data.projects.aggregation.map(
      (agg: { min: number; pct: [number, number]; median: number; max: number; avg: number; group: string }) => ({
        min: agg.min,
        pct25: agg.pct[0],
        median: agg.median,
        pct75: agg.pct[1],
        max: agg.max,
        avg: agg.avg,
        name: data.projects.groups.find((group) => group.group == agg.group)?.items[0].location.countryName,
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

  return <BoxPlot data={boxPlotData} />
}
