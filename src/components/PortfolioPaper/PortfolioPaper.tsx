import { Title } from '@mantine/core'
import { PortfolioTable, ErrorBoundary, Paper } from '@components'

export const PortfolioPaper = () => {
  return (
    <Paper data-testid='PortfolioPaper'>
      <ErrorBoundary>
        <Title order={2}>Portfolio Analysis</Title>
        <PortfolioTable />
      </ErrorBoundary>
    </Paper>
  )
}
