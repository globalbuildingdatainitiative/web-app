import {
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ZAxis,
  Bar,
  RectangleProps,
  Scatter,
} from 'recharts'
import { useMemo } from 'react'
// import { useMantineTheme } from '@mantine/core'
import { BoxPlotData } from './types.ts'

const HorizonBar = (props: RectangleProps) => {
  const { x, y, width, height } = props

  if (x == null || y == null || width == null || height == null) {
    return null
  }

  return <line x1={x} y1={y} x2={x + width} y2={y} stroke='#000' strokeWidth={3} />
}

const DotBar = (props: RectangleProps) => {
  const { x, y, width, height } = props

  if (x == null || y == null || width == null || height == null) {
    return null
  }

  return (
    <line
      x1={x + width / 2}
      y1={y + height}
      x2={x + width / 2}
      y2={y}
      stroke='#000'
      strokeWidth={5}
      strokeDasharray='5'
    />
  )
}

interface BoxPlotProps {
  data: BoxPlotData[]
}

export const BoxPlot = (props: BoxPlotProps) => {
  // const theme = useMantineTheme()
  const data = useMemo(
    () =>
      props.data.map((v) => {
        return {
          min: v.min,
          bottomWhisker: v.pct25 - v.min,
          bottomBox: v.median - v.pct25,
          topBox: v.pct75 - v.median,
          topWhisker: v.max - v.pct75,
          average: v.avg,
          size: 250,
        }
      }),
    [props.data],
  )

  return (
    <ResponsiveContainer minHeight={600}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <Bar stackId='a' dataKey='min' fill='none' />
        <Bar stackId='a' dataKey='bar' shape={<HorizonBar />} />
        <Bar stackId='a' dataKey='bottomWhisker' shape={<DotBar />} />
        <Bar stackId='a' dataKey='bottomBox' fill='#8884d8' />
        <Bar stackId='a' dataKey='bar' shape={<HorizonBar />} />
        <Bar stackId='a' dataKey='topBox' fill='#8884d8' />
        <Bar stackId='a' dataKey='topWhisker' shape={<DotBar />} />
        <Bar stackId='a' dataKey='bar' shape={<HorizonBar />} />
        <ZAxis type='number' dataKey='size' range={[0, 250]} />

        <Scatter dataKey='average' fill='red' stroke='#FFF' />
        <XAxis />
        <YAxis />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
