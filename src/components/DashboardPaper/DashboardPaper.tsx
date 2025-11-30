import {
  BoxPlot,
  BoxPlotData,
  ErrorBoundary,
  ErrorMessage,
  Loading,
  Paper,
} from '@components'
import { Button, Center, Title, Text } from '@mantine/core'
import { useMemo, useState } from 'react'
import { LifeCycleStage, useGetProjectDataForBoxPlotLazyQuery } from '@queries'
import { makeErrorFromOptionalString } from 'lib/uiUtils/errors'
import { useSearchParamsReplicator } from 'lib/hooks/useSearchParamsReplicator'
import {
  type BoxPlotVisualSettings,
  defaultFilters,
  filtersToSearchParams,
  PlotDesignerDataFiltersSelection,
  PlotDesignerPlotParameters,
  PlotDesignerPlotSettings,
  searchParamsToFilters,
} from 'components/datasetFilters/plotSettings'
import { filtersToAggregation } from 'components/datasetFilters/aggregationBuilders'
import {
  aggregationToMapData,
  getMapCircleRadiusSourceLabel,
  MapCircleRadiusSource,
  prettifyPlotDesignerAggregation,
} from 'components/PlotDesignerPaper/plotDesignerUtils'
import { CircleMap, CircleMapData, CircleMapDataPoint } from 'components/CircleMap/CircleMap'
import { PlotDesignerDataFilters } from 'components/datasetFilters/PlotDesignerDataFilters'

const dashboardPlotParameters: PlotDesignerPlotParameters = {
  groupBy: 'country',
  lifeCycleStagesToInclude: [LifeCycleStage.A1A3],
  quantity: 'gwp_per_m2',
}

const dashboardBoxPlotVisualSettings: BoxPlotVisualSettings = {
  valueAxisLabel: 'GWP per m²',
  labelHeightFactor: 50,
}

const dashboardMapCircleRadiusSource: MapCircleRadiusSource = 'count'

export const DashboardPaper = () => {
  const [filters, setFilters] = useSearchParamsReplicator<PlotDesignerDataFiltersSelection>(
    searchParamsToFilters,
    filtersToSearchParams,
    defaultFilters(),
  )
  const [filtersUpdated, setFiltersUpdated] = useState<boolean>(true)

  const aggregation = useMemo(() => {
    const settings: PlotDesignerPlotSettings = {
      filters,
      plotParameters: dashboardPlotParameters,
    }
    return filtersToAggregation(settings)
  }, [filters])

  const [getProjectDataForBoxPlot, { data, loading, error }] = useGetProjectDataForBoxPlotLazyQuery()

  const updatePlot = () => {
    getProjectDataForBoxPlot({ variables: { aggregation } })
    setFiltersUpdated(false)
  }

  const boxPlotData: BoxPlotData[] = useMemo(() => {
    if (!data) return []
    return prettifyPlotDesignerAggregation(data, dashboardPlotParameters)
  }, [data])

  const mapData: CircleMapData | null = useMemo(() => {
    if (!data) return null
    return aggregationToMapData(data, dashboardMapCircleRadiusSource)
  }, [data])

  const boxPlotHeight = 150 + boxPlotData.length * dashboardBoxPlotVisualSettings.labelHeightFactor

  const onFilterChange = (newFilters: PlotDesignerDataFiltersSelection) => {
    setFilters(newFilters)
    setFiltersUpdated(true)
  }

  return (
    <Paper data-testid='DashboardPaper'>
      <Title order={3} style={{ marginBottom: 16 }}>
        GWP Intensity (Global Level - Building Type)
      </Title>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '16px' }}>
        <div>
          <Title order={4} style={{ marginBottom: '8px' }}>
            Data Filters {filtersUpdated ? ' (updated)' : ''}
          </Title>
          <PlotDesignerDataFilters filters={filters} onFilterChange={onFilterChange} disabled={loading} />
        </div>
        <div>
          <Title order={4} style={{ marginBottom: '8px' }}>
            Draw plot
          </Title>
          <Button onClick={updatePlot} disabled={!filtersUpdated || loading}>
            {data ? 'Update plot' : 'Draw plot'}
          </Button>
        </div>

        {error && <ErrorMessage error={makeErrorFromOptionalString(error.message)} />}
        {loading && <Loading />}

        {data && (
          <ErrorBoundary>
            {boxPlotData.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 8 }}>
                <div>
                  <Title order={4} style={{ marginBottom: 4 }}>
                    Box Plot {filtersUpdated ? ' (out of date)' : ''}
                  </Title>
                  <Center style={{ height: boxPlotHeight }}>
                    <BoxPlot
                      data={boxPlotData}
                      orientation={'vertical'}
                      valueAxisLabel={dashboardBoxPlotVisualSettings.valueAxisLabel}
                    />
                  </Center>
                </div>
                {mapData && (
                  <div>
                    <Title order={4} style={{ marginBottom: 4 }}>
                      Map {filtersUpdated ? ' (out of date)' : ''}
                    </Title>
                    <Center style={{ height: 800, width: '100%', position: 'relative', zIndex: 0 }}>
                      <CircleMap
                        data={mapData}
                        minPointRadius={1}
                        maxPointRadius={20}
                        makePopup={(point: CircleMapDataPoint) => (
                          <>
                            <Title order={5}>{point.name}</Title>
                            <Text>
                              {getMapCircleRadiusSourceLabel(dashboardMapCircleRadiusSource)}: {point.value}
                            </Text>
                          </>
                        )}
                      />
                    </Center>
                  </div>
                )}
              </div>
            ) : (
              <Center style={{ height: 300 }}>
                <Title order={4}>No data matching those parameters</Title>
              </Center>
            )}
          </ErrorBoundary>
        )}
      </div>
    </Paper>
  )
}
