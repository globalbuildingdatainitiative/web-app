import { Title, Alert } from '@mantine/core'
import { PortfolioTable, ErrorBoundary, Paper, PortfolioCharts } from '@components'
import { useState, useCallback } from 'react'
import type { MRT_VisibilityState } from 'mantine-react-table'
import { AlertCircle } from 'lucide-react'

const MAX_VISIBLE_COLUMNS = 9

const EXCLUDED_COLUMNS = ['name', 'breakdown']

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

  const [showError, setShowError] = useState(false)

  const handleColumnVisibilityChange = useCallback((updatedVisibility: MRT_VisibilityState) => {
    const visibleColumnsCount = Object.entries(updatedVisibility).filter(
      ([key, isVisible]) => isVisible && !EXCLUDED_COLUMNS.includes(key),
    ).length

    if (visibleColumnsCount > MAX_VISIBLE_COLUMNS) {
      setShowError(true)
      return // Don't update the state if we exceed the limit
    }

    setShowError(false)
    setColumnVisibility(updatedVisibility)
  }, [])

  return (
    <Paper data-testid='PortfolioPaper'>
      <ErrorBoundary>
        <Title order={2}>Portfolio Analysis</Title>

        {showError && (
          <Alert icon={<AlertCircle size={16} />} color='red' title='Column Limit Exceeded' mb='md'>
            You can only select up to {MAX_VISIBLE_COLUMNS} columns at a time. Please deselect some columns before
            adding new ones.
          </Alert>
        )}

        <PortfolioCharts visibleColumns={columnVisibility} />
        <PortfolioTable columnVisibility={columnVisibility} onColumnVisibilityChange={handleColumnVisibilityChange} />
      </ErrorBoundary>
    </Paper>
  )
}
