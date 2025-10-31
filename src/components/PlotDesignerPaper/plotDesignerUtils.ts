import { alpha3AndUnknownToCountryName, formatCountryName } from '@lib'
import { formatFrameType, formatLcaSoftware } from 'components/datasetFilters/filtersConstants'
import { PlotDesignerGroupByOption, PlotDesignerPlotParameters } from 'components/datasetFilters/plotSettings'
import { GetProjectDataForBoxPlotQuery } from 'queries/generated'

export function getCountryNameFromCode(countryCode: string): string {
  return alpha3AndUnknownToCountryName[countryCode.toLowerCase()] || `Invalid country code ${countryCode}`
}

type PlotDesignerAggregationGroupTitleGenerator = (groupValue: string | null) => string
const groupByToTitleGenerator: Record<PlotDesignerGroupByOption, PlotDesignerAggregationGroupTitleGenerator> = {
  'country': (countryName: string | null) =>
    countryName ? formatCountryName(getCountryNameFromCode(countryName)) : `Unknown Country`,
  'frameType': (frameType: string | null) => frameType ? formatFrameType(frameType) : `Unknown Frame Type`,
  'software': (softwareName: string | null) => (softwareName ? formatLcaSoftware(softwareName) : `Unknown Software`),
  'source': (sourceName: string | null) => (sourceName ? sourceName : `Unknown Source`),
  'buildingTypology': (typologyName: string | null) => (typologyName ? typologyName : `Unknown Typology`),
}

export function plotParametersToAggregationGroupTitleGenerator(
  plotParameters: PlotDesignerPlotParameters,
): PlotDesignerAggregationGroupTitleGenerator {
  return groupByToTitleGenerator[plotParameters.groupBy] || ((groupName: string | null) => (groupName ? groupName : `Unknown`))
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