import { alpha3AndUnknownToCountryName, formatCountryName } from '@lib'
import { PlotDesignerPlotParameters } from 'components/datasetFilters/datasetFiltersConstants'
import { GetProjectDataForBoxPlotQuery } from 'queries/generated'

export function getCountryNameFromCode(countryCode: string): string {
  return alpha3AndUnknownToCountryName[countryCode.toLowerCase()] || `Invalid country code ${countryCode}`
}

type PlotDesignerAggregationGroupTitleGenerator = (groupValue: string | null) => string

export function plotParametersToAggregationGroupTitleGenerator(
  plotParameters: PlotDesignerPlotParameters,
): PlotDesignerAggregationGroupTitleGenerator {
  if (plotParameters.groupBy === 'country') {
    return (countryName: string | null) =>
      countryName ? formatCountryName(getCountryNameFromCode(countryName)) : `Unknown Country`
  }

  return (groupName: string | null) => (groupName ? groupName : `Unknown`)
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

export function plotParametersToValueAxisLabel(plotParameters: PlotDesignerPlotParameters): string {
  if (plotParameters.quantity === 'gwp_per_m2') {
    return 'GWP Intensity (kgCO₂eq/m²)'
  }
  return 'GWP (kgCO₂eq)'
}
