import { ContributionTable, ErrorBoundary, Paper } from '@components'
import { Title } from '@mantine/core'

export const ContributionPaper = () => {
  return (
    <Paper data-testid='ContributionPaper'>
      <Title order={3} style={{ marginBottom: 8 }}>
        All Contributions
      </Title>
      <ErrorBoundary>
        <ContributionTable />
      </ErrorBoundary>
    </Paper>
  )
}
