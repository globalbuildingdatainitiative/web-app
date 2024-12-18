import { Paper, Text } from '@mantine/core'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ReactNode } from 'react'

interface ChartContainerProps {
  children: ReactNode
  title: string
}

export const ChartContainer = ({ children, title }: ChartContainerProps) => (
  <Paper p='xs' shadow='sm' h='100%' style={{ minHeight: '250px' }}>
    <Text size='sm' fw={500} mb='xs'>
      {title}
    </Text>
    <div style={{ height: 'calc(100% - 24px)' }}>{children}</div>
  </Paper>
)

interface ChartData {
  count: number

  [key: string]: string | number
}

interface SubBarChartProps {
  data: ChartData[]
  dataKey: string
  fill: string
}

export const SubBarChart = ({ data, dataKey, fill }: SubBarChartProps) => (
  <ResponsiveContainer width='100%' height='100%'>
    <BarChart data={data} margin={{ top: 5, right: 20, left: 40, bottom: 50 }}>
      <XAxis dataKey={dataKey} angle={45} textAnchor='start' interval={0} height={60} tick={{ fontSize: 10 }} />
      <YAxis tick={{ fontSize: 10 }} />
      <Tooltip contentStyle={{ fontSize: '10px' }} />
      <Bar dataKey='count' fill={fill} />
    </BarChart>
  </ResponsiveContainer>
)
