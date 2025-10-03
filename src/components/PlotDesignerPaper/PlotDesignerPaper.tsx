import { BoxPlot, BoxPlotData, ErrorMessage, Loading, Paper } from '@components'
import { Button, Center, Title } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useGetProjectDataForBoxPlotLazyQuery } from '@queries'
import { makeErrorFromOptionalString } from 'lib/uiUtils/errors'
import { PlotDesignerDataFilters } from 'components/datasetFilters/PlotDesignerDataFilters'
import {
  PlotDesignerDataFiltersSelection,
  PlotDesignerPlotParameters,
  PlotDesignerPlotSettings,
  defaultFilters,
  defaultPlotParameters,
  filtersToAggregation,
} from 'components/datasetFilters/datasetFiltersConstants'
import { PlotDesignerPlotParametersSelector } from 'components/datasetFilters/PlotDesignerPlotParametersSelector'
import { plotParametersToValueAxisLabel, prettifyPlotDesignerAggregation } from './plotDesignerUtils'
import { PlotDesignerTable } from './PlotDesignerTable'

interface BoxPlotVisualSettings {
  valueAxisLabel: string
  labelHeightFactor: number
}

export const PlotDesignerPaper = () => {
  const [filters, setFilters] = useState<PlotDesignerDataFiltersSelection>(defaultFilters())
  const [filtersUpdated, setFiltersUpdated] = useState<boolean>(true)
  const [plotParameters, setPlotParameters] = useState<PlotDesignerPlotParameters>(defaultPlotParameters())
  const [plotParametersUpdated, setPlotParametersUpdated] = useState<boolean>(true)
  const [boxPlotVisualSettings, setBoxPlotVisualSettings] = useState<BoxPlotVisualSettings>({
    valueAxisLabel: '',
    labelHeightFactor: 50,
  })

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
      valueAxisLabel: plotParametersToValueAxisLabel(plotParameters),
      labelHeightFactor: plotParameters.groupBy === 'country' ? 50 : 100,
    })
  }

  const boxPlotData: BoxPlotData[] = useMemo(() => {
    if (!data) return []
    return prettifyPlotDesignerAggregation(data, plotParameters)
  }, [data, plotParameters])

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
          <PlotDesignerDataFilters filters={filters} onFilterChange={onFilterChange} data={data} />
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
            <div>
              <Title order={4} style={{ marginBottom: '8px' }}>
                Box Plot {filtersUpdated || plotParametersUpdated ? ' (out of date)' : ''}
              </Title>
              <Center style={{ height: boxPlotData.length * boxPlotVisualSettings.labelHeightFactor }}>
                <BoxPlot
                  data={boxPlotData}
                  orientation='vertical'
                  valueAxisLabel={boxPlotVisualSettings.valueAxisLabel}
                />
              </Center>
            </div>
            <div>
              <Title order={4} style={{ marginBottom: '8px' }}>
                Raw data {filtersUpdated || plotParametersUpdated ? ' (out of date)' : ''}
              </Title>
              <PlotDesignerTable prettifiedData={boxPlotData} />
            </div>
          </>
        )}
      </div>
    </Paper>
  )
}
