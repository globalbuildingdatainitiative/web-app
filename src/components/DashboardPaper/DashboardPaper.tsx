import {
  BoxPlot,
  BoxPlotData,
  ErrorBoundary,
  ErrorMessage,
  GlobalBoxPlot,
  GlobalMap,
  Loading,
  Paper,
} from '@components'
import { Button, Center, Title, Text, Grid } from '@mantine/core'
import { useMemo, useState } from 'react'
import { LifeCycleStage, useGetProjectDataForBoxPlotLazyQuery, useGetProjectDataForBoxPlotQuery } from '@queries'
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
/*
export interface FilterState {
  selectedTypologies: string[]
  selectedLifeCycleStages: string[]
  selectedCountries: string[]
  selectedSoftware: string[]
  selectedSources: string[]
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
    selectedSources: [],
    gfaRange: [0, 5000],
    confirmedGfaRange: [0, 5000],
  })

  const aggregation = useMemo(() => {
    const divideAggregation = {
      $sum: filters.selectedLifeCycleStages.map((stage) => `$results.gwp.${stage.toLowerCase()}`),
    }
    const stageFilters = filters.selectedLifeCycleStages.map((stage) => ({
      [`results.gwp.${stage.toLowerCase()}`]: { $gt: 0 },
    }))
    const gfaFilter = {
      'projectInfo.grossFloorArea.value': {
        $gte: filters.confirmedGfaRange[0],
        $lte: filters.confirmedGfaRange[1],
      },
    }
    const filtersToApply: object[] = [...stageFilters, gfaFilter]

    const typologyFilter =
      filters.selectedTypologies.length > 0
        ? { 'projectInfo.buildingTypology': { $in: filters.selectedTypologies } }
        : {}
    if (typologyFilter) {
      filtersToApply.push(typologyFilter)
    }
    const countryFilter =
      filters.selectedCountries.length > 0 ? { 'location.country': { $in: filters.selectedCountries } } : {}
    if (countryFilter) {
      filtersToApply.push(countryFilter)
    }
    const softwareFilter =
      filters.selectedSoftware.length > 0 ? { 'softwareInfo.lcaSoftware': { $in: filters.selectedSoftware } } : {}
    if (softwareFilter) {
      filtersToApply.push(softwareFilter)
    }
    const sourceFilter =
      filters.selectedSources.length > 0 ? { 'metaData.source.name': { $in: filters.selectedSources } } : {}
    if (sourceFilter) {
      filtersToApply.push(sourceFilter)
    }

    return [
      {
        $match: {
          $and: filtersToApply,
        },
      },
      {
        $group: {
          _id: '$location.country',
          count: { $sum: 1 },
          minimum: { $min: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] } },
          percentiles: {
            $percentile: {
              p: [0.25, 0.75],
              method: 'approximate',
              input: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] },
            },
          },
          median: {
            $median: {
              method: 'approximate',
              input: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] },
            },
          },
          maximum: { $max: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] } },
          average: { $avg: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] } },
        },
      },
      {
        $project: {
          _id: null,
          group: '$_id',
          count: '$count',
          min: '$minimum',
          pct: '$percentiles',
          median: '$median',
          max: '$maximum',
          avg: '$average',
        },
      },
    ]
  }, [filters])

  // Cache invalidation triggered by useGetProjectsCountsByCountryQuery() inside GlobalMap forced this query to re-run, triggering a re-render loop between the 2 components. Disabling cache for this query fixes the issue, at least temporarily.
  const { data, loading, error } = useGetProjectDataForBoxPlotQuery({
    variables: { aggregation },
    fetchPolicy: 'no-cache',
  })

  return (
    <Paper data-testid='DashboardPaper'>
      <Title order={3} style={{ marginBottom: 8 }}>
        GWP Intensity (Global Level - Building Type)
      </Title>
      <Grid grow>
        <Grid.Col span={gridSize}>
          <ErrorBoundary>
            <GlobalMap loading={loading} data={data} />
          </ErrorBoundary>
        </Grid.Col>
        <Grid.Col span={gridSize}>
          <ErrorBoundary>
            <GlobalBoxPlot filters={filters} onFiltersChange={setFilters} loading={loading} data={data} />
          </ErrorBoundary>
        </Grid.Col>
      </Grid>
      {error ? <ErrorMessage error={makeErrorFromOptionalString(error.message)} /> : null}
    </Paper>
  )
}*/

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
    console.log(data, dashboardPlotParameters)
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
          <>
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
              <>
                <Center style={{ height: 300 }}>
                  <Title order={4}>No data matching those parameters</Title>
                </Center>
              </>
            )}
          </>
        )}
      </div>
    </Paper>
  )
}
