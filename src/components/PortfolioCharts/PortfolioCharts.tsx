import { useViewportSize } from '@mantine/hooks'
import { Paper, Tabs, MultiSelect, Box, rem, Select, Alert } from '@mantine/core'
import { AttributeChart } from '../AttributeChart'
import { CarbonIntensityChart } from '../CarbonIntensityChart'
import { IconPrinter, IconExclamationCircle } from '@tabler/icons-react'
import { useState } from 'react'
import domtoimage from 'dom-to-image'
import { theme } from '@components'

interface PortfolioChartsProps {
  className?: string
  filters: object
  mode: 'attribute' | 'carbon'
}

const CARBON_INTENSITY_COLUMNS = [
  { value: 'projectInfo.buildingType', label: 'Building Type' },
  { value: 'metaData.source.name', label: 'Source' },
  { value: 'softwareInfo.lcaSoftware', label: 'LCA Software' },
  { value: 'projectInfo.buildingTypology', label: 'Building Typology' },
  { value: 'projectInfo.generalEnergyClass', label: 'Energy Class' },
  { value: 'projectInfo.roofType', label: 'Roof Type' },
  { value: 'projectInfo.frameType', label: 'Frame Type' },
]

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

const selectStyles = () => ({
  root: {
    marginBottom: rem(12),
  },
  label: {
    marginBottom: rem(8),
    fontSize: theme?.fontSizes?.sm || '14px',
    fontWeight: 500,
    fontFamily: theme?.fontFamily || 'Plus Jakarta Sans, sans-serif',
  },
  input: {
    minHeight: rem(42),
    border: `1px solid ${theme?.colors?.blue?.[2] || '#dfedef'}`,
    fontFamily: theme?.fontFamily || 'Plus Jakarta Sans, sans-serif',
    fontSize: theme?.fontSizes?.sm || '14px',
    '&:focus': {
      borderColor: theme?.colors?.green?.[6] || '#4bd6ac',
      boxShadow: `0 0 0 1px ${theme?.colors?.green?.[6] || '#4bd6ac'}`,
    },
  },
  pill: {
    backgroundColor: theme?.colors?.green?.[0] || '#eefcf8',
    border: `1px solid ${theme?.colors?.green?.[3] || '#b5edde'}`,
    height: rem(26),
    padding: `0 ${rem(10)}`,
    fontFamily: theme?.fontFamily || 'Plus Jakarta Sans, sans-serif',
    fontSize: theme?.fontSizes?.sm || '14px',
    '&[data-hovered]': {
      backgroundColor: theme?.colors?.green?.[1] || '#ddf5ef',
    },
  },
  item: {
    fontFamily: theme?.fontFamily || 'Plus Jakarta Sans, sans-serif',
    fontSize: theme?.fontSizes?.sm || '14px',
    '&[data-selected]': {
      '&, &:hover': {
        backgroundColor: theme?.colors?.green?.[1] || '#ddf5ef',
        color: theme?.colors?.dark?.[9] || '#1d9a78',
      },
    },
    '&[data-hovered]': {
      backgroundColor: theme?.colors?.gray?.[0] || '#f8f9fa',
    },
  },
})

export const PortfolioCharts = (props: PortfolioChartsProps) => {
  const { className, filters, mode } = props
  const [selectedCharts, setSelectedCharts] = useState<string[]>(DEFAULT_VISIBLE_CHARTS)
  const [selectedCarbonColumn, setSelectedCarbonColumn] = useState<string>(CARBON_INTENSITY_COLUMNS[0].value)
  const [showWarning, setShowWarning] = useState(false)
  const { height } = useViewportSize()

  const chartId = mode === 'attribute' ? 'attributes' : 'intensity'

  const handleTabChange = (value: string | null): void => {
    if (value === 'print') {
      const node = document.getElementById(chartId)
      if (!node) return

      domtoimage.toPng(node, { bgcolor: 'white' }).then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `${chartId}.png`
        link.href = dataUrl
        link.click()
      })
    }
  }

  const handleChartsChange = (newSelection: string[]) => {
    if (newSelection.length === 0) {
      setShowWarning(true)
      return
    }
    setShowWarning(false)
    setSelectedCharts(newSelection)
  }

  return (
    <Paper shadow='xs' p='md' mb='xl' className={className}>
      <Tabs keepMounted={false} onChange={handleTabChange}>
        <Tabs.List mb='md'>
          <Tabs.Tab value='print' ml='auto' leftSection={<IconPrinter />}>
            Print Charts
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      {mode === 'attribute' ? (
        <>
          <Box mb='md'>
            {showWarning && (
              <Alert icon={<IconExclamationCircle size={16} />} color='yellow' mb='md' title='Chart Selection Required'>
                At least one chart needs to be selected at all times
              </Alert>
            )}
            <MultiSelect
              data={CHART_COLUMNS}
              value={selectedCharts}
              onChange={handleChartsChange}
              label='Select charts to display'
              placeholder='Choose charts'
              searchable
              clearable
              maxValues={9}
              styles={selectStyles()}
            />
          </Box>
          <div style={{ height: `${height * 0.7}px`, minHeight: '800px' }} id='attributes'>
            <AttributeChart
              visibleColumns={Object.fromEntries(selectedCharts.map((chart) => [chart, true]))}
              filters={filters}
            />
          </div>
        </>
      ) : (
        <>
          <Box mb='md'>
            <Select
              data={CARBON_INTENSITY_COLUMNS}
              value={selectedCarbonColumn}
              onChange={(value) => setSelectedCarbonColumn(value!)}
              label='Select attribute to analyze'
              placeholder='Choose attribute'
              searchable
              styles={selectStyles()}
            />
          </Box>
          <div style={{ height: `${height * 0.7}px`, minHeight: '800px' }} id='intensity'>
            <CarbonIntensityChart visibleColumns={{ [selectedCarbonColumn]: true }} filters={filters} />
          </div>
        </>
      )}
    </Paper>
  )
}
