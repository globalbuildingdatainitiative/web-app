import { useViewportSize } from '@mantine/hooks'
import { Paper, Tabs, MultiSelect, Box, rem } from '@mantine/core'
import { AttributeChart } from '../AttributeChart'
import { CarbonIntensityChart } from '../CarbonIntensityChart'
import type { MRT_VisibilityState } from 'mantine-react-table'
import { IconPrinter } from '@tabler/icons-react'
import { useState } from 'react'
import domtoimage from 'dom-to-image'

interface PortfolioChartsProps {
  className?: string
  visibleColumns: MRT_VisibilityState
  filters: object
}

const CHART_COLUMNS = [
  { value: 'location.countryName', label: 'Country' },
  { value: 'projectInfo.buildingType', label: 'Building Type' },
  { value: 'softwareInfo.lcaSoftware', label: 'LCA Software' },
  { value: 'metaData.source.name', label: 'Source' },
  { value: 'projectInfo.grossFloorArea.value', label: 'Gross Floor Area (m²)' },
  { value: 'projectInfo.buildingCompletionYear', label: 'Completion Year' },
  { value: 'projectInfo.buildingFootprint.value', label: 'Building Footprint (m²)' },
  { value: 'projectInfo.buildingHeight.value', label: 'Building Height (m)' },
  { value: 'projectInfo.buildingMass.value', label: 'Building Mass (kg)' },
  { value: 'projectInfo.buildingPermitYear', label: 'Permit Year' },
  { value: 'projectInfo.buildingTypology', label: 'Building Typology' },
  { value: 'projectInfo.buildingUsers', label: 'Building Users' },
  { value: 'projectInfo.floorsAboveGround', label: 'Floors Above Ground' },
  { value: 'projectInfo.floorsBelowGround', label: 'Floors Below Ground' },
  { value: 'projectInfo.generalEnergyClass', label: 'Energy Class' },
  { value: 'projectInfo.heatedFloorArea.value', label: 'Heated Floor Area (m²)' },
  { value: 'projectInfo.roofType', label: 'Roof Type' },
  { value: 'projectInfo.frameType', label: 'Frame Type' },
]

const DEFAULT_VISIBLE_CHARTS = [
  'location.countryName',
  'projectInfo.buildingType',
  'softwareInfo.lcaSoftware',
  'projectInfo.grossFloorArea.value',
]

export const PortfolioCharts = (props: PortfolioChartsProps) => {
  const { className, visibleColumns, filters } = props
  const [activeTab, setActiveTab] = useState<string | null>('attributes')
  const [selectedCharts, setSelectedCharts] = useState<string[]>(DEFAULT_VISIBLE_CHARTS)
  const { height } = useViewportSize()

  const handleTabChange = async (value: string | null) => {
    if (value !== 'print') {
      setActiveTab(value)
    } else {
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
      <Box mb='md'>
        <MultiSelect
          data={CHART_COLUMNS}
          value={selectedCharts}
          onChange={setSelectedCharts}
          label='Select charts to display'
          placeholder='Choose charts'
          searchable
          clearable
          maxValues={9}
          styles={(theme) => ({
            root: {
              marginBottom: rem(12),
            },
            label: {
              marginBottom: rem(8),
              fontSize: theme.fontSizes.sm,
              fontWeight: 500,
              fontFamily: theme.fontFamily,
            },
            input: {
              minHeight: rem(42),
              border: `1px solid ${theme.colors.blue[2]}`,
              fontFamily: theme.fontFamily,
              fontSize: theme.fontSizes.sm,
              '&:focus': {
                borderColor: theme.colors.green[6],
                boxShadow: `0 0 0 1px ${theme.colors.green[6]}`,
              },
            },
            pill: {
              backgroundColor: theme.colors.green[0],
              border: `1px solid ${theme.colors.green[3]}`,
              height: rem(26),
              padding: `0 ${rem(10)}`,
              fontFamily: theme.fontFamily,
              fontSize: theme.fontSizes.sm,
              '&[data-hovered]': {
                backgroundColor: theme.colors.green[1],
              },
            },
            pillRemoveButton: {
              color: theme.colors.green[7],
              '&:hover': {
                background: 'transparent',
                color: theme.colors.green[8],
              },
            },
            searchInput: {
              height: rem(36),
              minHeight: rem(36),
              borderTop: `1px solid ${theme.colors.blue[2]}`,
              fontFamily: theme.fontFamily,
              fontSize: theme.fontSizes.sm,
            },
          })}
        />
      </Box>

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
            <AttributeChart
              visibleColumns={Object.fromEntries(selectedCharts.map((chart) => [chart, true]))}
              filters={filters}
            />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value='intensity'>
          <div style={{ height: `${height * 0.7}px`, minHeight: '800px' }} id='intensity'>
            <CarbonIntensityChart visibleColumns={visibleColumns} filters={filters} />
          </div>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  )
}
