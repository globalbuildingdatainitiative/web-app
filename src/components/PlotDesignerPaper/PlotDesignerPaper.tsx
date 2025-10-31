import { BoxPlot, BoxPlotData, BoxPlotOrientation, ErrorMessage, Loading, Paper } from '@components'
import { Button, Center, Select, Title } from '@mantine/core'
import { useMemo, useState } from 'react'
import { LifeCycleStage, useGetProjectDataForBoxPlotLazyQuery } from '@queries'
import { makeErrorFromOptionalString } from 'lib/uiUtils/errors'
import { PlotDesignerDataFilters } from 'components/datasetFilters/PlotDesignerDataFilters'
import {
  PlotDesignerDataFiltersSelection,
  PlotDesignerPlotParameters,
  PlotDesignerPlotSettings,
  boxPlotOrientationOptions,
  defaultFilters,
  defaultPlotParameters,
  filtersToAggregation,
} from 'components/datasetFilters/datasetFiltersConstants'
import { PlotDesignerPlotParametersSelector } from 'components/datasetFilters/PlotDesignerPlotParametersSelector'
import { plotParametersToValueAxisLabel, prettifyPlotDesignerAggregation } from './plotDesignerUtils'
import { PlotDesignerTable } from './PlotDesignerTable'
import { useSearchParamsReplicator } from 'lib/hooks/useSearchParamsReplicator'

interface BoxPlotVisualSettings {
  valueAxisLabel: string
  labelHeightFactor: number
}

function searchParamsToFilters(searchParams: URLSearchParams): PlotDesignerDataFiltersSelection {
  const filtersUsingNumbers = ["gfaRange", "confirmedGfaRange"]
  const filters =  defaultFilters()

  const filtersKeys = Object.keys(filters) as (keyof PlotDesignerDataFiltersSelection)[]
  filtersKeys.forEach((key) => {
    const paramValue = searchParams.get(key)
    if (paramValue !== null) {
      filters[key].enabled = true
      if (paramValue !== '') {
        const values = paramValue.split(',')
        filters[key].value = filtersUsingNumbers.includes(key) ? values.map(Number) : values as unknown as any
      }
    }
  })

  return filters
}

function filtersToSearchParams(filters: PlotDesignerDataFiltersSelection, existingParams: URLSearchParams = new URLSearchParams()): URLSearchParams {
  const filterKeys = Object.keys(filters) as (keyof PlotDesignerDataFiltersSelection)[]
  filterKeys.forEach((key) => {
    if (filters[key].enabled) {
      existingParams.set(key, filters[key].value.join(','))
    } else {
      existingParams.delete(key)
    }
  })
  return existingParams
}

function searchParamsToPlotParameters(searchParams: URLSearchParams): PlotDesignerPlotParameters {
  const plotParameters = defaultPlotParameters()
  
  const quantityParam = searchParams.get('quantity')
  if (quantityParam) {
    plotParameters.quantity = quantityParam as PlotDesignerPlotParameters['quantity']
  }

  const groupByParam = searchParams.get('groupBy')
  if (groupByParam) {
    plotParameters.groupBy = groupByParam as PlotDesignerPlotParameters['groupBy']
  }

  const lifeCycleStagesParam = searchParams.get('lifeCycleStagesToInclude')
  if (lifeCycleStagesParam) {
    plotParameters.lifeCycleStagesToInclude = lifeCycleStagesParam.split(',') as LifeCycleStage[]
  }

  return plotParameters
}

function filtersToSearchParamsPlotParameters(plotParameters: PlotDesignerPlotParameters): URLSearchParams {
  const searchParams = new URLSearchParams()
  searchParams.set('quantity', plotParameters.quantity)
  searchParams.set('groupBy', plotParameters.groupBy)
  searchParams.set('lifeCycleStagesToInclude', plotParameters.lifeCycleStagesToInclude.join(','))
  return searchParams
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
      valueAxisLabel: plotParametersToValueAxisLabel(plotParameters),
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
                  <PlotDesignerTable prettifiedData={boxPlotData} />
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
