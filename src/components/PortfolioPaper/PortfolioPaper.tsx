import { Title } from '@mantine/core'
import { ErrorBoundary, Paper, PortfolioCharts, PortfolioTable } from '@components'
import { useCallback, useState } from 'react'
import type { MRT_VisibilityState } from 'mantine-react-table'

export const PortfolioPaper = () => {
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

  return (
    <Paper data-testid='PortfolioPaper'>
      <ErrorBoundary>
        <Title order={2}>Portfolio Analysis</Title>
        <ErrorBoundary>
          <PortfolioCharts visibleColumns={columnVisibility} filters={filters} />
        </ErrorBoundary>
        <ErrorBoundary>
          <PortfolioTable
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={handleColumnVisibilityChange}
            filters={filters}
            setFilters={setFilters}
          />
        </ErrorBoundary>
      </ErrorBoundary>
    </Paper>
  )
}
