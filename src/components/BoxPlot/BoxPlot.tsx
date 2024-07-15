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
  Tooltip,
} from 'recharts'
import { useMemo } from 'react'
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

  return <line x1={x + width / 2} y1={y + height} x2={x + width / 2} y2={y} stroke='#000' strokeWidth={3} />
}

interface BoxPlotProps {
  data: BoxPlotData[]
}

export const BoxPlot = (props: BoxPlotProps) => {
  const data = useMemo(
    () =>
      props.data.map((v) => {
        return {
          name: v.name, // Ensure that the name is correctly set here for the y-axis
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
  console.log(data)

  return (
    <ResponsiveContainer minHeight={600}>
      <ComposedChart layout='vertical' data={data} margin={{ left: 100, right: 50, bottom: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          type='number'
          domain={[0, 100]}
          tickCount={7}
          label={{ value: 'GWP Intensity (kgCO2eq/m2)', position: 'insideBottom', offset: -10 }}
        />
        <YAxis type='category' dataKey='name' />
        <Tooltip />
        <Bar stackId='a' dataKey='min' fill='none' />
        <Bar stackId='a' dataKey='bar' shape={<HorizonBar />} />
        <Bar stackId='a' dataKey='bottomWhisker' shape={<DotBar />} />
        <Bar stackId='a' dataKey='bottomBox' fill='#444E86' />
        <Bar stackId='a' dataKey='bar' shape={<HorizonBar />} />
        <Bar stackId='a' dataKey='topBox' fill='#444E86' />
        <Bar stackId='a' dataKey='topWhisker' shape={<DotBar />} />
        <Bar stackId='a' dataKey='bar' shape={<HorizonBar />} />
        <ZAxis type='number' dataKey='size' range={[0, 250]} />
        <Scatter dataKey='average' fill='red' stroke='#FFF' />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
