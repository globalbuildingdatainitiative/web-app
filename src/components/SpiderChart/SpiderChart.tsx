import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { snakeCaseToHumanCase } from '@lib'
import { useMantineTheme } from '@mantine/core'

export interface SpiderData {
  name: string
  value: number
  refValue: number
}

interface SpiderChartProps {
  data: SpiderData[]
}

export const SpiderChart = (props: SpiderChartProps) => {
  const { data } = props
  const theme = useMantineTheme()

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RadarChart
        cx='50%'
        cy='50%'
        outerRadius='70%'
        data={data.map((phase) => ({ ...phase, name: snakeCaseToHumanCase(phase.name) }))}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey='name' />
        <PolarRadiusAxis angle={18} />
        <Radar name='Reference' dataKey='refValue' fill={theme.colors.green[1]} fillOpacity={1} />
        <Radar name='Project' dataKey='value' fill={theme.colors.red[6]} fillOpacity={0.5} />
        <Legend />
        <Tooltip formatter={(value) => Number(value).toFixed(2)} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
