import { Title } from '@mantine/core'
import { PortfolioTable, ErrorBoundary, Paper, PortfolioCharts } from '@components'
import { useState } from 'react'
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

  return (
    <Paper data-testid='PortfolioPaper'>
      <ErrorBoundary>
        <Title order={2}>Portfolio Analysis</Title>
        <PortfolioCharts visibleColumns={columnVisibility} />
        <PortfolioTable columnVisibility={columnVisibility} onColumnVisibilityChange={setColumnVisibility} />
      </ErrorBoundary>
    </Paper>
  )
}
