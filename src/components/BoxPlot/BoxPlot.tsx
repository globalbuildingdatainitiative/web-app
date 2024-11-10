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
  ScatterProps,
  Tooltip,
  TooltipProps,
} from 'recharts'
import { useMemo } from 'react'
import { BoxPlotData } from './types.ts'
import { useViewportSize } from '@mantine/hooks'
import { theme } from '@components'

// Custom dot component to control size
const CustomDot = (props: ScatterProps) => {
  const { cx, cy } = props

  const dotFillColor = theme.colors?.red?.[6] ?? '#d84c30'

  return (
    <circle
      cx={cx}
      cy={cy}
      r={5} // Set small radius
      fill={dotFillColor}
      stroke='FFF'
      strokeWidth={1}
    />
  )
}

// The whisker component that handles both the solid whiskers and dotted connecting lines
const Whisker = ({ x, y, width, height, color }: RectangleProps & { color: string }) => {
  if (x == null || y == null || width == null || height == null) {
    return null
  }

  const whiskerHeight = Math.min(height, 10) // Define max whisker height

  return (
    <>
      {/* Left whisker */}
      <line
        x1={x}
        x2={x}
        y1={y + height / 2 - whiskerHeight / 2}
        y2={y + height / 2 + whiskerHeight / 2}
        stroke={color}
        strokeWidth={1}
      />
      {/* Right whisker */}
      <line
        x1={x + width}
        x2={x + width}
        y1={y + height / 2 - whiskerHeight / 2}
        y2={y + height / 2 + whiskerHeight / 2}
        stroke={color}
        strokeWidth={1}
      />
      {/* Horizontal line connecting whiskers */}
      <line
        x1={x}
        x2={x + width}
        y1={y + height / 2}
        y2={y + height / 2}
        stroke={color}
        strokeWidth={1}
        strokeDasharray='3 3'
      />
    </>
  )
}

const MedianBar = ({ x, y, width, color }: RectangleProps & { color: string }) => {
  if (x == null || y == null || width == null) {
    return null
  }

  return <line x1={x} y1={y} x2={x + width} y2={y} stroke={color} strokeWidth={3} /> // Increase stroke width for visibility
}

const HorizonBar = ({ x, y, width, color }: RectangleProps & { color: string }) => {
  if (x == null || y == null || width == null) {
    return null
  }

  return <line x1={x} y1={y} x2={x + width} y2={y} stroke={color} strokeWidth={1} />
}

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const formatNumber = (num: number) => Number(num.toFixed(2)).toString()

    return (
      <div
        style={{
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        <p style={{ fontWeight: 'bold' }}>{label}</p>
        <p>Minimum: {formatNumber(data.min)}</p>
        <p>25th Percentile: {formatNumber(data.pct25)}</p>
        <p>Median: {formatNumber(data.median)}</p>
        <p>75th Percentile: {formatNumber(data.pct75)}</p>
        <p>Maximum: {formatNumber(data.max)}</p>
        <p>Average: {formatNumber(data.avg)}</p>
        <p>Count: {data.count}</p>
      </div>
    )
  }

  return null
}

interface BoxPlotProps {
  data: BoxPlotData[]
}

export const BoxPlot = (props: BoxPlotProps) => {
  const { height } = useViewportSize()

  const getColor = (colorName: string, shade: number, fallback: string): string => {
    return theme.colors?.[colorName]?.[shade] || fallback
  }

  const bottomBoxColor = getColor('light_green', 3, '#6da4b0')
  const topBoxColor = getColor('green', 9, '#bfd7dc')
  const lineColor = getColor('blue', 6, '#31a985')
  const medianColor = getColor('orange', 9, '#ec701b')

  const chartData = useMemo(
    () =>
      props.data.map((v) => ({
        name: v.name,
        min: v.min,
        pct25: v.pct25,
        median: v.median,
        pct75: v.pct75,
        max: v.max,
        avg: v.avg,
        count: v.count,
        bottomWhisker: v.pct25 - v.min,
        bottomBox: v.median - v.pct25,
        topBox: v.pct75 - v.median,
        topWhisker: v.max - v.pct75,
      })),
    [props.data],
  )

  // Calculate domain bounds rounded to nearest 10
  const maxValue = Math.max(...props.data.map((d) => Math.max(d.max, d.avg))) || 0
  const roundedMax = Math.ceil(maxValue / 10) * 10

  return (
    <div data-testid='BoxPlot'>
      <ResponsiveContainer width='100%' height={height * 0.9}>
        <ComposedChart layout='vertical' data={chartData} margin={{ left: 100, right: 50, bottom: 50 }}>
          <CartesianGrid strokeDasharray='3 3' horizontal={false} />
          <XAxis
            type='number'
            domain={[0, roundedMax]}
            tickCount={7}
            ticks={Array.from({ length: 8 }, (_, i) => Math.round((i * roundedMax) / 7 / 10) * 10)}
            label={{ value: 'GWP Intensity (kgCO₂eq/m²)', position: 'insideBottom', offset: -10 }}
          />
          <YAxis type='category' dataKey='name' />
          <Tooltip content={CustomTooltip} />
          {/* Invisible Bar for stacking */}
          <Bar stackId='a' dataKey='min' fill='none' />
          {/* Horizon Bar */}
          <Bar stackId='a' dataKey='bar' shape={<HorizonBar color={lineColor} />} />
          {/* Bottom Whisker */}
          <Bar stackId='a' dataKey='bottomWhisker' shape={<Whisker color={lineColor} />} />
          {/* Bottom Box */}
          <Bar stackId='a' dataKey='bottomBox' fill={bottomBoxColor} />
          {/* Median Bar */}
          <Bar stackId='a' dataKey='bar' shape={<MedianBar color={medianColor} />} />
          {/* Top Box */}
          <Bar stackId='a' dataKey='topBox' fill={topBoxColor} />
          {/* Top Whisker */}
          <Bar stackId='a' dataKey='topWhisker' shape={<Whisker color={lineColor} />} />
          {/* Horizon Bar */}
          <Bar stackId='a' dataKey='bar' shape={<HorizonBar color={lineColor} />} />
          <ZAxis type='number' dataKey='count' range={[0, 250]} />
          <Scatter dataKey='avg' shape={<CustomDot />} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
