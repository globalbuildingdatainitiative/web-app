import { ErrorBoundary, ErrorMessage, GlobalBoxPlot, GlobalMap, Paper } from '@components'
import { Grid, Title } from '@mantine/core'
import { useMemo, useState } from 'react'
import { LifeCycleStage, useGetProjectDataForBoxPlotQuery } from '@queries'
import { makeErrorFromOptionalString } from 'lib/uiUtils/errors'

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

  const { data, loading, error } = useGetProjectDataForBoxPlotQuery({ variables: { aggregation } })

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
      {error ? (
        <ErrorMessage
          error={makeErrorFromOptionalString(error.message)}
        />
      ) : null}
    </Paper>
  )
}
