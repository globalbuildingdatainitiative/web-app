import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MockSessionProvider } from '@mocks'
import { BoxPlot, BoxPlotData } from '@components'
import { vi, describe, it, expect } from 'vitest'
import React from 'react'

const mockData: BoxPlotData[] = [
  {
    name: 'Denmark',
    min: 95,
    pct25: 97.5,
    median: 100,
    pct75: 102.5,
    max: 105,
    avg: 100,
    count: 10,
  },
  {
    name: 'Germany',
    min: 5,
    pct25: 7.5,
    median: 10,
    pct75: 12.5,
    max: 15,
    avg: 10,
    count: 100,
  },
]

interface ComposedChartProps {
  children: React.ReactNode
}

interface ResponsiveContainerProps {
  children: React.ReactNode
}

interface AxisProps {
  label?: { value: string; position: string; offset: number }
  dataKey?: string
}

interface ShapeProps {
  x?: number
  y?: number
  width?: number
  height?: number
}

interface BarProps {
  shape?: (props: ShapeProps) => JSX.Element
}

vi.mock('recharts', () => ({
  ComposedChart: ({ children }: ComposedChartProps) => <svg>{children}</svg>,
  ResponsiveContainer: ({ children }: ResponsiveContainerProps) => (
    <div style={{ width: 800, height: 600 }}>{children}</div>
  ),
  XAxis: ({ label }: AxisProps) => <text>{label?.value}</text>,
  YAxis: ({ dataKey }: AxisProps) => {
    if (dataKey === 'name') {
      // Extract country names from mockData
      const countryNames = mockData.map((d) => d.name)
      return (
        <text>
          name
          {countryNames.map((country, index) => (
            <text key={index}>{country}</text>
          ))}
        </text>
      )
    }
    return <text>{dataKey}</text>
  },
  CartesianGrid: () => null,
  Tooltip: () => null,
  Bar: ({ shape }: BarProps) => (shape ? shape : null),
  Scatter: () => null,
  ZAxis: () => null,
}))

const renderBoxPlot = () => {
  render(
    <MockSessionProvider
      sessionContext={{
        loading: false,
        userId: '1',
        invalidClaims: [],
        doesSessionExist: true,
        accessTokenPayload: {},
      }}
    >
      <MemoryRouter>
        <BoxPlot data={mockData} />
      </MemoryRouter>
    </MockSessionProvider>,
  )
}

describe('BoxPlot', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <MockSessionProvider
        sessionContext={{
          loading: false,
          userId: '1',
          invalidClaims: [],
          doesSessionExist: true,
          accessTokenPayload: {},
        }}
      >
        <MemoryRouter>
          <BoxPlot data={mockData} />
        </MemoryRouter>
      </MockSessionProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  it('Renders Correctly', async () => {
    renderBoxPlot()
    await waitFor(() => expect(screen.getByTestId('BoxPlot')).toBeInTheDocument())
  })

  it('Renders X-Axis Label', async () => {
    renderBoxPlot()
    await waitFor(() => expect(screen.getByText('GWP Intensity (kgCO₂eq/m²)')).toBeInTheDocument())
  })

  it('Renders Country Names', async () => {
    renderBoxPlot()

    await waitFor(() => {
      expect(screen.getByText('Denmark')).toBeInTheDocument()
      expect(screen.getByText('Germany')).toBeInTheDocument()
    })
  })
})
