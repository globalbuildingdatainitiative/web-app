import { GlobalBoxPlot, ErrorBoundary, GlobalMap, Paper } from '@components'
import { Grid, Title } from '@mantine/core'

export const DashboardPaper = () => {
  const gridSize = { base: 12, xl: 6 }

  return (
    <Paper data-testid='DashboardPaper'>
      <Title order={3} style={{ marginBottom: 8 }}>
        GWP Intensity (Global Level - Building Type)
      </Title>

      <Grid grow>
        <Grid.Col span={gridSize}>
          <ErrorBoundary>
            <div
              style={{
                position: 'relative',
                zIndex: 0,
              }}
            >
              <GlobalMap />
            </div>
          </ErrorBoundary>
        </Grid.Col>
        <Grid.Col span={gridSize}>
          <ErrorBoundary>
            <GlobalBoxPlot />
          </ErrorBoundary>
        </Grid.Col>
      </Grid>
    </Paper>
  )
}
