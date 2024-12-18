import { useViewportSize } from '@mantine/hooks'
import { Tabs, Paper } from '@mantine/core'
import { AttributeChart } from '../AttributeChart'
import { CarbonIntensityChart } from '../CarbonIntensityChart'
import type { MRT_VisibilityState } from 'mantine-react-table'

interface PortfolioChartsProps {
  className?: string
  visibleColumns: MRT_VisibilityState
  filters: any
}

export const PortfolioCharts = (props: PortfolioChartsProps) => {
  const { className, visibleColumns, filters } = props
  const { height } = useViewportSize()

  return (
    <Paper shadow='xs' p='md' mb='xl' className={className}>
      <Tabs keepMounted={false} defaultValue='attributes'>
        <Tabs.List mb='md'>
          <Tabs.Tab value='attributes'>Project Attributes</Tabs.Tab>
          <Tabs.Tab value='intensity'>Carbon Intensity</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='attributes'>
          <div style={{ height: `${height * 0.7}px`, minHeight: '800px' }}>
            <AttributeChart visibleColumns={visibleColumns} />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value='intensity'>
          <div style={{ height: `${height * 0.7}px`, minHeight: '800px' }}>
            <CarbonIntensityChart visibleColumns={visibleColumns} filters={filters} />
          </div>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  )
}
