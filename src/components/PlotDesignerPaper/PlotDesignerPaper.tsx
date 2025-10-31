import { BoxPlot, BoxPlotData, BoxPlotOrientation, ErrorMessage, Loading, Paper } from '@components'
import { Button, Center, Select, Title } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useGetProjectDataForBoxPlotLazyQuery } from '@queries'
import { makeErrorFromOptionalString } from 'lib/uiUtils/errors'
import { PlotDesignerDataFilters } from 'components/datasetFilters/PlotDesignerDataFilters'
import { boxPlotOrientationOptions } from 'components/datasetFilters/filtersConstants'
import { PlotDesignerPlotParametersSelector } from 'components/datasetFilters/PlotDesignerPlotParametersSelector'
import { prettifyPlotDesignerAggregation } from './plotDesignerUtils'
import { PlotDesignerTable } from './PlotDesignerTable'
import { useSearchParamsReplicator } from 'lib/hooks/useSearchParamsReplicator'
import { filtersToAggregation } from 'components/datasetFilters/aggregationBuilders'
import { PlotDesignerDataFiltersSelection, defaultFilters, PlotDesignerPlotParameters, defaultPlotParameters, PlotDesignerPlotSettings, filtersToSearchParams, filtersToSearchParamsPlotParameters, searchParamsToFilters, searchParamsToPlotParameters } from 'components/datasetFilters/plotSettings'
import { formatQuantity } from 'components/datasetFilters/plotParametersConstants'

interface BoxPlotVisualSettings {
  valueAxisLabel: string
  labelHeightFactor: number
}

export const PlotDesignerPaper = () => {
  const [filters, setFilters] = useSearchParamsReplicator<PlotDesignerDataFiltersSelection>(
    searchParamsToFilters,
    filtersToSearchParams,
    defaultFilters()
  )
  const [filtersUpdated, setFiltersUpdated] = useState<boolean>(true)

  const [plotParameters, setPlotParameters] = useSearchParamsReplicator<PlotDesignerPlotParameters>(
    searchParamsToPlotParameters,
    filtersToSearchParamsPlotParameters,
    defaultPlotParameters()
  )
  const [plotParametersUpdated, setPlotParametersUpdated] = useState<boolean>(true)

  const [boxPlotVisualSettings, setBoxPlotVisualSettings] = useState<BoxPlotVisualSettings>({
    valueAxisLabel: '',
    labelHeightFactor: 50,
  })
  const [boxPlotOrientation, setBoxPlotOrientation] = useState<BoxPlotOrientation>('vertical')

  const onFilterChange = (newFilters: PlotDesignerDataFiltersSelection) => {
    setFilters(newFilters)
    setFiltersUpdated(true)
  }

  const onPlotParametersChange = (newPlotParameters: PlotDesignerPlotParameters) => {
    setPlotParameters(newPlotParameters)
    setPlotParametersUpdated(true)
  }

  const aggregation = useMemo(() => {
    const settings: PlotDesignerPlotSettings = {
      filters,
      plotParameters,
    }
    return filtersToAggregation(settings)
  }, [filters, plotParameters])

  const [getProjectDataForBoxPlot, { data, loading, error }] = useGetProjectDataForBoxPlotLazyQuery()

  const updatePlot = () => {
    getProjectDataForBoxPlot({ variables: { aggregation } })

    setFiltersUpdated(false)
    setPlotParametersUpdated(false)

    setBoxPlotVisualSettings({
      valueAxisLabel: formatQuantity(plotParameters.quantity),
      labelHeightFactor: plotParameters.groupBy === 'country' ? 50 : 100,
    })
  }

  const boxPlotData: BoxPlotData[] = useMemo(() => {
    if (!data) return []
    return prettifyPlotDesignerAggregation(data, plotParameters)
  }, [data, plotParameters])

  const boxPlotHeight =
    boxPlotOrientation === 'vertical' ? 150 + boxPlotData.length * boxPlotVisualSettings.labelHeightFactor : 900

  return (
    <Paper data-testid='PlotDesignerPaper'>
      <Title order={3} style={{ marginBottom: 16 }}>
        Plot Designer
      </Title>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '16px' }}>
        <div>
          <Title order={4} style={{ marginBottom: '8px' }}>
            Data Filters {filtersUpdated ? ' (updated)' : ''}
          </Title>
          <PlotDesignerDataFilters filters={filters} onFilterChange={onFilterChange} />
        </div>
        <div>
          <Title order={4} style={{ marginBottom: '8px' }}>
            Plot Parameters {plotParametersUpdated ? ' (updated)' : ''}
          </Title>
          <PlotDesignerPlotParametersSelector
            parameters={plotParameters}
            onPlotParametersChange={onPlotParametersChange}
          />
        </div>
        <div>
          <Title order={4} style={{ marginBottom: '8px' }}>
            Draw plot
          </Title>
          <Button onClick={updatePlot} disabled={!filtersUpdated && !plotParametersUpdated}>
            {data ? 'Update plot' : 'Draw plot'}
          </Button>
        </div>

        {error && <ErrorMessage error={makeErrorFromOptionalString(error.message)} />}
        {loading && <Loading />}

        {data && (
          <>
            {boxPlotData.length > 0 ? (
              <>
                <div>
                  <Title order={4} style={{ marginBottom: 4 }}>
                    Box Plot {filtersUpdated || plotParametersUpdated ? ' (out of date)' : ''}
                  </Title>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <Select
                      data={boxPlotOrientationOptions}
                      value={boxPlotOrientation}
                      onChange={(value) => setBoxPlotOrientation(value as BoxPlotOrientation)}
                      label='Orientation'
                      placeholder='Select Orientation'
                    />
                  </div>
                  <Center style={{ height: boxPlotHeight }}>
                    <BoxPlot
                      data={boxPlotData}
                      orientation={boxPlotOrientation}
                      valueAxisLabel={boxPlotVisualSettings.valueAxisLabel}
                    />
                  </Center>
                </div>
                <div>
                  <Title order={4} style={{ marginBottom: '8px' }}>
                    Raw data {filtersUpdated || plotParametersUpdated ? ' (out of date)' : ''}
                  </Title>
                  <PlotDesignerTable prettifiedData={boxPlotData} filters={filters} plotParameters={plotParameters} />
                </div>
              </>
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
