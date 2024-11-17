import { GlobalBoxPlot, ErrorBoundary, GlobalMap, Paper } from '@components'
import { Grid, Title } from '@mantine/core'
import { useState } from 'react'
import { LifeCycleStage } from '@queries'

export interface FilterState {
  selectedTypologies: string[]
  selectedLifeCycleStages: string[]
  selectedCountries: string[]
  selectedSoftware: string[]
  gfaRange: [number, number]
  confirmedGfaRange: [number, number]
}

export const DashboardPaper = () => {
  const gridSize = { base: 12, xl: 6 }

  const [filters, setFilters] = useState<FilterState>({
    selectedTypologies: [],
    selectedLifeCycleStages: [LifeCycleStage.A1A3],
    selectedCountries: [],
    selectedSoftware: [],
    gfaRange: [0, 5000],
    confirmedGfaRange: [0, 5000],
  })

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
              <GlobalMap filters={filters} />
            </div>
          </ErrorBoundary>
        </Grid.Col>
        <Grid.Col span={gridSize}>
          <ErrorBoundary>
            <GlobalBoxPlot filters={filters} onFiltersChange={setFilters} />
          </ErrorBoundary>
        </Grid.Col>
      </Grid>
    </Paper>
  )
}
