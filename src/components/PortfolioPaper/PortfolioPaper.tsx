import { Title } from '@mantine/core'
import { PortfolioTable, ErrorBoundary, Paper, PortfolioCharts } from '@components'

export const PortfolioPaper = () => {
  return (
    <Paper data-testid='PortfolioPaper'>
      <ErrorBoundary>
        <Title order={2}>Portfolio Analysis</Title>
        <PortfolioCharts />
        <PortfolioTable />
      </ErrorBoundary>
    </Paper>
  )
}
