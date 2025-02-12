import { Title } from '@mantine/core'
import { ErrorBoundary, Paper, PortfolioCharts, PortfolioTable } from '@components'
import { useState } from 'react'

export const CarbonIntensityPortfolioPaper = () => {
  const [filters, setFilters] = useState({})

  return (
    <Paper data-testid='CarbonIntensityPortfolioPaper'>
      <ErrorBoundary>
        <Title order={2}>Portfolio Analysis</Title>
        <ErrorBoundary>
          <PortfolioCharts mode='carbon' filters={filters} />
        </ErrorBoundary>
        <ErrorBoundary>
          <PortfolioTable filters={filters} setFilters={setFilters} />
        </ErrorBoundary>
      </ErrorBoundary>
    </Paper>
  )
}
