import { Title } from '@mantine/core'
import { ErrorBoundary, Paper, PortfolioCharts, PortfolioTable } from '@components'
import { useState } from 'react'

export const PortfolioPaper = () => {
  const [filters, setFilters] = useState({})

  return (
    <Paper data-testid='PortfolioPaper'>
      <ErrorBoundary>
        <Title order={2}>Portfolio Analysis</Title>
        <ErrorBoundary>
          <PortfolioCharts filters={filters} />
        </ErrorBoundary>
        <ErrorBoundary>
          <PortfolioTable filters={filters} setFilters={setFilters} />
        </ErrorBoundary>
      </ErrorBoundary>
    </Paper>
  )
}
