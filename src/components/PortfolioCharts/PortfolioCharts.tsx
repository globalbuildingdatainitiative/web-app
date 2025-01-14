import { useViewportSize } from '@mantine/hooks'
import { Paper, Tabs } from '@mantine/core'
import { AttributeChart } from '../AttributeChart'
import { CarbonIntensityChart } from '../CarbonIntensityChart'
import type { MRT_VisibilityState } from 'mantine-react-table'
import { IconPrinter } from '@tabler/icons-react'
import { ChartTab } from '@components'
import domtoimage from 'dom-to-image'

interface PortfolioChartsProps {
  className?: string
  visibleColumns: MRT_VisibilityState
  filters: object
  activeTab: ChartTab
  onTabChange: (tab: ChartTab) => void
}

export const PortfolioCharts = (props: PortfolioChartsProps) => {
  const { className, visibleColumns, filters, activeTab, onTabChange } = props
  const { height } = useViewportSize()

  const handleTabChange = async (value: string | null) => {
    if (value === 'attributes' || value === 'intensity') {
      onTabChange(value as ChartTab)
    } else if (value === 'print') {
      const node = document.getElementById(activeTab!)
      const dataUrl = await domtoimage.toPng(node!, { bgcolor: 'white' })
      const link = document.createElement('a')
      link.download = `${activeTab!}.png`
      link.href = dataUrl
      link.click()
    }
  }

  return (
    <Paper shadow='xs' p='md' mb='xl' className={className}>
      <Tabs keepMounted={false} value={activeTab} onChange={handleTabChange}>
        <Tabs.List mb='md'>
          <Tabs.Tab value='attributes'>Project Attributes</Tabs.Tab>
          <Tabs.Tab value='intensity'>Carbon Intensity</Tabs.Tab>
          <Tabs.Tab value='print' ml='auto' leftSection={<IconPrinter />}>
            Print Charts
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='attributes'>
          <div style={{ height: `${height * 0.7}px`, minHeight: '800px' }} id='attributes'>
            <AttributeChart visibleColumns={visibleColumns} filters={filters} activeTab={activeTab} />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value='intensity'>
          <div style={{ height: `${height * 0.7}px`, minHeight: '800px' }} id='intensity'>
            <CarbonIntensityChart visibleColumns={visibleColumns} filters={filters} activeTab={activeTab} />
          </div>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  )
}
