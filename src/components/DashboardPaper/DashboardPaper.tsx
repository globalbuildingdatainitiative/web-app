import { GlobalBoxPlot, ErrorBoundary, GlobalMap, Paper } from '@components'
import { Group, Title } from '@mantine/core'

export const DashboardPaper = () => {
  return (
    <Paper data-testid='DashboardPaper'>
      <Title order={3} style={{ marginBottom: 8 }}>
        GWP Intensity (Global Level - Building Type)
      </Title>
      <Group grow>
        <ErrorBoundary>
          <GlobalMap />
        </ErrorBoundary>
        <ErrorBoundary>
          <GlobalBoxPlot />
        </ErrorBoundary>
      </Group>
    </Paper>
  )
}
