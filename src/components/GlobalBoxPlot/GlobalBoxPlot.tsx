import { Center } from '@mantine/core'
import { BoxPlot, BoxPlotData, Loading } from '@components'
import { useGetProjectDataForBoxPlotQuery } from '@queries'
import { useMemo } from 'react'

export const GlobalBoxPlot = () => {
  const { data, loading, error } = useGetProjectDataForBoxPlotQuery()

  const boxPlotData: BoxPlotData[] = useMemo(() => {
    if (!data) return []

    const _data = data.projects.groups.map((group) => {
      const countryName = group.items[0]?.location?.countryName || group.group // Fallback to group name if countryName is not available
      return group.aggregation.reduce(
        (acc, curr) => {
          if (curr.method.toLowerCase() === 'min') acc.min = curr.value!
          if (curr.method.toLowerCase() === 'pct25') acc.pct25 = curr.value!
          if (curr.method.toLowerCase() === 'median') acc.median = curr.value!
          if (curr.method.toLowerCase() === 'pct75') acc.pct75 = curr.value!
          if (curr.method.toLowerCase() === 'max') acc.max = curr.value!
          if (curr.method.toLowerCase() === 'avg') acc.avg = curr.value!
          acc.name = countryName
          return acc
        },
        {
          name: countryName,
          min: 0,
          pct25: 0,
          median: 0,
          pct75: 0,
          max: 0,
          avg: 0,
        } as BoxPlotData,
      )
    })

    return _data
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
