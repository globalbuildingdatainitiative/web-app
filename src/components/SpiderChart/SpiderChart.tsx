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
import { snakeCaseToHumanCase, formatStages } from '@lib'
import { useMantineTheme } from '@mantine/core'

export interface SpiderData {
  name: string
  value: number
  refValue: number
}

interface SpiderChartProps {
  data: SpiderData[]
}

const phaseStages: Record<string, string[]> = {
  production: ['a1a3'],
  construction: ['a4', 'a5'],
  use_embodied: ['b1', 'b2', 'b3', 'b4', 'b5'],
  use_operational: ['b6', 'b7'],
  end_of_life: ['c1', 'c2', 'c3', 'c4'],
  other: ['d'],
}

export const SpiderChart = (props: SpiderChartProps) => {
  const { data } = props
  const theme = useMantineTheme()

  const formatPhaseName = (name: string) => {
    const stages = phaseStages[name] || []
    const formattedStages = formatStages(stages)
    const baseName =
      name === 'use_embodied'
        ? 'Use Embodied'
        : name === 'use_operational'
          ? 'Use Operational'
          : snakeCaseToHumanCase(name)
    return `${baseName} ${formattedStages}`
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RadarChart
        cx='50%'
        cy='50%'
        outerRadius='70%'
        data={data.map((phase) => ({ ...phase, name: formatPhaseName(phase.name) }))}
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
