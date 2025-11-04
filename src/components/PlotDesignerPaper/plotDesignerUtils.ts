import { alpha3AndUnknownToCountryName, formatCountryName, getLatLonFromAlpha3 } from '@lib'
import { CircleMapData, CircleMapDataPoint } from 'components/CircleMap/CircleMap'
import { formatFrameType, formatLcaSoftware } from 'components/datasetFilters/filtersConstants'
import { PlotDesignerGroupByOption, PlotDesignerPlotParameters } from 'components/datasetFilters/plotSettings'
import { GetProjectDataForBoxPlotQuery } from 'queries/generated'

export function getCountryNameFromCode(countryCode: string): string {
  return alpha3AndUnknownToCountryName[countryCode.toLowerCase()] || `Invalid country code ${countryCode}`
}

type PlotDesignerAggregationGroupTitleGenerator = (groupValue: string | null) => string
const groupByToTitleGenerator: Record<PlotDesignerGroupByOption, PlotDesignerAggregationGroupTitleGenerator> = {
  country: (countryName: string | null) =>
    countryName ? formatCountryName(getCountryNameFromCode(countryName)) : `Unknown Country`,
  frameType: (frameType: string | null) => (frameType ? formatFrameType(frameType) : `Unknown Frame Type`),
  software: (softwareName: string | null) => (softwareName ? formatLcaSoftware(softwareName) : `Unknown Software`),
  source: (sourceName: string | null) => (sourceName ? sourceName : `Unknown Source`),
  buildingTypology: (typologyName: string | null) => (typologyName ? typologyName : `Unknown Typology`),
}

export function plotParametersToAggregationGroupTitleGenerator(
  plotParameters: PlotDesignerPlotParameters,
): PlotDesignerAggregationGroupTitleGenerator {
  return (
    groupByToTitleGenerator[plotParameters.groupBy] ||
    ((groupName: string | null) => (groupName ? groupName : `Unknown`))
  )
}

interface PlotDesignerAggregationResultRaw {
  min: number
  pct: [number, number]
  median: number
  max: number
  avg: number
  group: string
  count: number
}

export interface PlotDesignerAggregationResultPretty {
  min: number
  pct25: number
  median: number
  pct75: number
  max: number
  avg: number
  name: string
  count: number
}

function rawAggregationToPretty(
  agg: PlotDesignerAggregationResultRaw,
  titleGenerator: PlotDesignerAggregationGroupTitleGenerator,
): PlotDesignerAggregationResultPretty {
  return {
    min: agg.min,
    pct25: agg.pct[0],
    median: agg.median,
    pct75: agg.pct[1],
    max: agg.max,
    avg: agg.avg,
    name: titleGenerator(agg.group),
    count: agg.count,
  }
}

export function prettifyPlotDesignerAggregation(
  data: GetProjectDataForBoxPlotQuery,
  plotParameters: PlotDesignerPlotParameters,
): PlotDesignerAggregationResultPretty[] {
  const titleGenerator = plotParametersToAggregationGroupTitleGenerator(plotParameters)

  return data.projects.aggregation
    .map((agg: PlotDesignerAggregationResultRaw) => rawAggregationToPretty(agg, titleGenerator))
    .sort((a: PlotDesignerAggregationResultPretty, b: PlotDesignerAggregationResultPretty) => {
      const aName = a?.name ?? ''
      const bName = b?.name ?? ''
      return aName.localeCompare(bName)
    })
}

export type MapCircleRadiusSource = 'count' | 'median' | 'avg' | 'min' | 'max' | 'pct25' | 'pct75'
export const MapCircleRadiusSourceLabels: Record<MapCircleRadiusSource, string> = {
  count: 'Project count',
  median: 'Median',
  avg: 'Average',
  min: 'Minimum',
  max: 'Maximum',
  pct25: '25th Percentile',
  pct75: '75th Percentile',
}

export function getMapCircleRadiusSourceLabel(source: MapCircleRadiusSource): string {
  return MapCircleRadiusSourceLabels[source] || 'Unknown'
}

export function aggregationToMapData(
  data: GetProjectDataForBoxPlotQuery,
  radiusSource: MapCircleRadiusSource,
): CircleMapData | null {
  const points = data.projects.aggregation
    .map((agg: PlotDesignerAggregationResultRaw): CircleMapDataPoint | null => {
      const coords = getLatLonFromAlpha3(agg.group)
      if (!coords) return null
      const { lat, lon } = coords
      const name = formatCountryName(getCountryNameFromCode(agg.group))
      const id = agg.group

      let value = 0
      if (radiusSource === 'count') value = agg.count
      else if (radiusSource === 'median') value = agg.median
      else if (radiusSource === 'avg') value = agg.avg
      else if (radiusSource === 'min') value = agg.min
      else if (radiusSource === 'max') value = agg.max
      else if (radiusSource === 'pct25') value = agg.pct[0]
      else if (radiusSource === 'pct75') value = agg.pct[1]

      return { lat, lon, value, name, id }
    })
    .filter((point: CircleMapDataPoint | null) => point !== null)
  return { points }
}
