import { ErrorBoundary, ErrorMessage, GlobalBoxPlot, GlobalMap, Loading, Paper } from '@components'
import { Grid, Title } from '@mantine/core'
import { useMemo, useState } from 'react'
import { LifeCycleStage, useGetProjectDataForBoxPlotQuery } from '@queries'
import { makeErrorFromOptionalString } from 'lib/uiUtils/errors'
import { PlotDesignerDataFilters } from 'components/datasetFilters/PlotDesignerDataFilters'
import { PlotDesignerDataFiltersSelection, defaultFilters, filtersToAggregation } from 'components/datasetFilters/datasetFiltersConstants'


export const PlotDesignerPaper = () => {
  const [filters, setFilters] = useState<PlotDesignerDataFiltersSelection>(defaultFilters());

  const aggregation = useMemo(() => {
    return filtersToAggregation(filters)
  }, [filters])

  const { data, loading, error } = useGetProjectDataForBoxPlotQuery({ variables: { aggregation } })

  return (
    <Paper data-testid='PlotDesignerPaper'>
      <PlotDesignerDataFilters filters={filters} onFilterChange={setFilters} data={data} />

      {loading && <Loading />}
      {error && <ErrorMessage error={makeErrorFromOptionalString(error.message)} />}
    </Paper>
  )
}
