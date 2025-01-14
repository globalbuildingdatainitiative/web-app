import { Title } from '@mantine/core'
import { ErrorBoundary, Paper, PortfolioCharts, PortfolioTable } from '@components'
import { useCallback, useState } from 'react'
import type { MRT_VisibilityState } from 'mantine-react-table'
import { ChartTab } from '@components'

export const PortfolioPaper = () => {
  const [activeTab, setActiveTab] = useState<ChartTab>('attributes')
  const [attributesChartVisibility, setAttributesChartVisibility] = useState<MRT_VisibilityState>({
    'location.countryName': true,
    'projectInfo.buildingType': true,
    'softwareInfo.lcaSoftware': true,
    'metaData.source.name': true,
    'projectInfo.buildingTypology': false,
    'projectInfo.generalEnergyClass': false,
    'projectInfo.roofType': false,
    'projectInfo.frameType': false,
  })
  const [intensityChartVisibility, setIntensityChartVisibility] = useState<MRT_VisibilityState>({
    'projectInfo.buildingType': true,
  })
  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>({
    name: true,
    'location.countryName': true,
    'projectInfo.buildingType': true,
    'softwareInfo.lcaSoftware': true,
    'metaData.source.name': true,
    'projectInfo.grossFloorArea.value': true,
    results: true,
    breakdown: true,
    'projectInfo.buildingCompletionYear': false,
    'projectInfo.buildingFootprint.value': false,
    'projectInfo.buildingHeight.value': false,
    'projectInfo.buildingMass.value': false,
    'projectInfo.buildingPermitYear': false,
    'projectInfo.buildingTypology': false,
    'projectInfo.buildingUsers': false,
    'projectInfo.floorsAboveGround': false,
    'projectInfo.floorsBelowGround': false,
    'projectInfo.generalEnergyClass': false,
    'projectInfo.heatedFloorArea.value': false,
    'projectInfo.roofType': false,
    'projectInfo.frameType': false,
  })

  const [filters, setFilters] = useState({})

  const handleColumnVisibilityChange = useCallback((updatedVisibility: MRT_VisibilityState) => {
    setColumnVisibility(updatedVisibility)
  }, [])

  // Handler for chart visibility that switches between the two states
  const handleChartVisibilityChange = useCallback(
    (updatedVisibility: MRT_VisibilityState) => {
      if (activeTab === 'attributes') {
        setAttributesChartVisibility(updatedVisibility)
      } else {
        setIntensityChartVisibility(updatedVisibility)
      }
    },
    [activeTab],
  )

  // Get current chart visibility based on active tab
  const getCurrentChartVisibility = useCallback(() => {
    return activeTab === 'attributes' ? attributesChartVisibility : intensityChartVisibility
  }, [activeTab, attributesChartVisibility, intensityChartVisibility])

  // Handler for tab changes
  const handleTabChange = useCallback((newTab: ChartTab) => {
    setActiveTab(newTab)
  }, [])

  return (
    <Paper data-testid='PortfolioPaper'>
      <ErrorBoundary>
        <Title order={2}>Portfolio Analysis</Title>
        <ErrorBoundary>
          <PortfolioCharts
            visibleColumns={getCurrentChartVisibility()}
            filters={filters}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <PortfolioTable
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={handleColumnVisibilityChange}
            chartVisibility={getCurrentChartVisibility()}
            onChartVisibilityChange={handleChartVisibilityChange}
            filters={filters}
            setFilters={setFilters}
            activeTab={activeTab}
          />
        </ErrorBoundary>
      </ErrorBoundary>
    </Paper>
  )
}
