import { BoxPlot, BoxPlotData, BoxPlotOrientation, ErrorMessage, Loading, Paper } from '@components'
import { Button, Center, Select, Title, Text } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useGetProjectDataForBoxPlotLazyQuery } from '@queries'
import { makeErrorFromOptionalString } from 'lib/uiUtils/errors'
import { PlotDesignerDataFilters } from 'components/datasetFilters/PlotDesignerDataFilters'
import { boxPlotOrientationOptions, mapCircleRadiusSourceOptions } from 'components/datasetFilters/filtersConstants'
import { PlotDesignerPlotParametersSelector } from 'components/datasetFilters/PlotDesignerPlotParametersSelector'
import {
  aggregationToMapData,
  getMapCircleRadiusSourceLabel,
  MapCircleRadiusSource,
  prettifyPlotDesignerAggregation,
} from './plotDesignerUtils'
import { PlotDesignerTable } from './PlotDesignerTable'
import { useSearchParamsReplicator } from 'lib/hooks/useSearchParamsReplicator'
import { filtersToAggregation } from 'components/datasetFilters/aggregationBuilders'
import {
  PlotDesignerDataFiltersSelection,
  defaultFilters,
  PlotDesignerPlotParameters,
  defaultPlotParameters,
  PlotDesignerPlotSettings,
  filtersToSearchParams,
  plotParametersToSearchParams,
  searchParamsToFilters,
  searchParamsToPlotParameters,
  type BoxPlotVisualSettings,
} from 'components/datasetFilters/plotSettings'
import { formatQuantity } from 'components/datasetFilters/plotParametersConstants'
import { CircleMap, CircleMapData, CircleMapDataPoint } from 'components/CircleMap'

export const PlotDesignerPaper = () => {
  const [filters, setFilters] = useSearchParamsReplicator<PlotDesignerDataFiltersSelection>(
    searchParamsToFilters,
    filtersToSearchParams,
    defaultFilters(),
  )
  const [filtersUpdated, setFiltersUpdated] = useState<boolean>(true)

  const [plotParameters, setPlotParameters] = useSearchParamsReplicator<PlotDesignerPlotParameters>(
    searchParamsToPlotParameters,
    plotParametersToSearchParams,
    defaultPlotParameters(),
  )
  const [plotParametersUpdated, setPlotParametersUpdated] = useState<boolean>(true)

  const [boxPlotVisualSettings, setBoxPlotVisualSettings] = useState<BoxPlotVisualSettings>({
    valueAxisLabel: '',
    labelHeightFactor: 50,
  })
  const [boxPlotOrientation, setBoxPlotOrientation] = useState<BoxPlotOrientation>('vertical')
  const [mapCircleRadiusSource, setMapCircleRadiusSource] = useState<MapCircleRadiusSource>('count')

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

  const mapData: CircleMapData | null = useMemo(() => {
    if (!data) return null
    return aggregationToMapData(data, mapCircleRadiusSource)
  }, [data, mapCircleRadiusSource])

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
          <PlotDesignerDataFilters filters={filters} onFilterChange={onFilterChange} disabled={loading} />
        </div>
        <div>
          <Title order={4} style={{ marginBottom: '8px' }}>
            Plot Parameters {plotParametersUpdated ? ' (updated)' : ''}
          </Title>
          <PlotDesignerPlotParametersSelector
            parameters={plotParameters}
            onPlotParametersChange={onPlotParametersChange}
            disabled={loading}
          />
        </div>
        <div>
          <Title order={4} style={{ marginBottom: '8px' }}>
            Draw plot
          </Title>
          <Button onClick={updatePlot} disabled={(!filtersUpdated && !plotParametersUpdated) || loading}>
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
                {mapData && (
                  <div>
                    <Title order={4} style={{ marginBottom: 4 }}>
                      Map {filtersUpdated || plotParametersUpdated ? ' (out of date)' : ''}
                    </Title>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <Select
                        data={mapCircleRadiusSourceOptions}
                        value={mapCircleRadiusSource}
                        onChange={(value) => setMapCircleRadiusSource(value as MapCircleRadiusSource)}
                        label='Display'
                        placeholder='Select information to display'
                      />
                    </div>
                    <Center style={{ height: 800, width: '100%', position: 'relative', zIndex: 0 }}>
                      <CircleMap
                        data={mapData}
                        minPointRadius={1}
                        maxPointRadius={20}
                        makePopup={(point: CircleMapDataPoint) => (
                          <>
                            <Title order={5}>{point.name}</Title>
                            <Text>
                              {getMapCircleRadiusSourceLabel(mapCircleRadiusSource)}: {point.value}
                            </Text>
                          </>
                        )}
                      />
                    </Center>
                  </div>
                )}
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
