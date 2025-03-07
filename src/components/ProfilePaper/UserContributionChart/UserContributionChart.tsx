import { useEffect, useState } from 'react'
import { BarChart } from '@mantine/charts'
import { useGetContributionsPerMonthQuery } from '@queries'
import { Loader, Center, Title } from '@mantine/core'
import { theme } from '@components'

type ChartDataType = {
  month: string
  contributions: number
}

export const UserContributionsChart = () => {
  const { loading, error, data } = useGetContributionsPerMonthQuery()
  const [chartData, setChartData] = useState<ChartDataType[]>([])
  const chartColor = theme.primaryColor

  useEffect(() => {
    if (data && data.contributions && data.contributions.items) {
      const contributionsByMonth: { [key: string]: number } = data.contributions.items.reduce(
        (acc: { [key: string]: number }, contribution: { uploadedAt: string }) => {
          const month = new Date(contribution.uploadedAt).toLocaleString('default', { month: 'long', year: 'numeric' })
          if (!acc[month]) {
            acc[month] = 0
          }
          acc[month]++
          return acc
        },
        {},
      )

      const transformedData = Object.entries(contributionsByMonth).map(([month, count]) => ({
        month,
        contributions: count,
      }))
      setChartData(transformedData)
    }
  }, [data])

  if (loading) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  if (error) {
    console.error('Error loading data:', error instanceof Error ? error.message : error)
    return <p>An error occurred while loading data. Please try again later.</p>
  }

  return (
    <>
      <Title order={4} style={{ marginBottom: 8 }}>
        User Contributions Over Time (Monthly)
      </Title>
      <BarChart
        h={300}
        data={chartData}
        dataKey='month'
        series={[{ name: 'contributions', color: chartColor }]}
        tickLine='y'
      />
    </>
  )
}
