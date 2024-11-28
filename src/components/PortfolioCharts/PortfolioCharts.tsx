import { useViewportSize } from '@mantine/hooks'
import { Tabs } from '@mantine/core'
import { AttributeChart } from '../AttributeChart'
import { CarbonIntensityChart } from '../CarbonIntensityChart'

interface PortfolioChartsProps {
  className?: string
}

export const PortfolioCharts = (props: PortfolioChartsProps) => {
  const { className } = props
  const { height } = useViewportSize()
  return (
    <div style={{ height: height * 0.5 }} className={className}>
      <Tabs keepMounted={false} defaultValue='attributes'>
        <Tabs.List>
          <Tabs.Tab value='attributes'>Project Attributes</Tabs.Tab>
          <Tabs.Tab value='intensity'>Carbon Intensity</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='attributes'>
          <AttributeChart />
        </Tabs.Panel>
        <Tabs.Panel value='intensity'>
          <CarbonIntensityChart />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
