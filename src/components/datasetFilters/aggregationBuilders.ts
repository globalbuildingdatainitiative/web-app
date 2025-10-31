import { PlotDesignerDataFiltersSelection, PlotDesignerPlotParameters, PlotDesignerPlotSettings } from "./plotSettings"

export function matchStageFromFilters(filters: PlotDesignerDataFiltersSelection): object[] {
  const filtersToApply: object[] = []

  if (filters.lifeCycleStages.enabled) {
    filtersToApply.push(
      ...filters.lifeCycleStages.value.map((stage) => ({
        [`results.gwp.${stage.toLowerCase()}`]: { $gt: 0 },
      })),
    )
  }

  if (filters.gfaRange.enabled) {
    filtersToApply.push({
      'projectInfo.grossFloorArea.value': {
        $gte: filters.gfaRange.value[0],
        $lte: filters.gfaRange.value[1],
      },
    })
  }

  if (filters.typologies.value.length > 0 && filters.typologies.enabled) {
    filtersToApply.push({
      'projectInfo.buildingTypology': {
        $in: filters.typologies.value,
      },
    })
  }

  if (filters.countries.value.length > 0 && filters.countries.enabled) {
    filtersToApply.push({
      'location.country': {
        $in: filters.countries.value,
      },
    })
  }

  if (filters.frameTypes.value.length > 0 && filters.frameTypes.enabled) {
    filtersToApply.push({
      'projectInfo.frameType': {
        $in: filters.frameTypes.value,
      },
    })
  }

  if (filters.software.value.length > 0 && filters.software.enabled) {
    filtersToApply.push({
      'softwareInfo.lcaSoftware': { $in: filters.software.value },
    })
  }

  if (filters.sources.value.length > 0 && filters.sources.enabled) {
    filtersToApply.push({
      'metaData.source.name': {
        $in: filters.sources.value,
      },
    })
  }

  return filtersToApply
}

export function computationFromPlotParameters(plotParameters: PlotDesignerPlotParameters): object {
  const gwpSum = {
    $sum: plotParameters.lifeCycleStagesToInclude.map((stage) => `$results.gwp.${stage.toLowerCase()}`),
  }

  if (plotParameters.quantity === 'gwp_per_m2') {
    return { $divide: [gwpSum, '$projectInfo.grossFloorArea.value'] }
  } else {
    return gwpSum
  }
}

export function groupByFromPlotParameters(plotParameters: PlotDesignerPlotParameters): string | { $arrayElemAt: [string, number] } {
  let groupBy: string | { $arrayElemAt: [string, number] } = '$location.country'
  if (plotParameters.groupBy === 'software') {
    groupBy = '$softwareInfo.lcaSoftware'
  } else if (plotParameters.groupBy === 'source') {
    groupBy = '$metaData.source.name'
  } else if (plotParameters.groupBy === 'frameType') {
    groupBy = '$projectInfo.frameType'
  } else if (plotParameters.groupBy === 'buildingTypology') {
    groupBy = { $arrayElemAt: ['$projectInfo.buildingTypology', 0] } 
  }
  return groupBy
}

export function filtersToAggregation(settings: PlotDesignerPlotSettings): object[] {
  const computation = computationFromPlotParameters(settings.plotParameters)

  return [
    {
      $match: {
        $and: matchStageFromFilters(settings.filters),
      },
    },
    {
      $group: {
        _id: groupByFromPlotParameters(settings.plotParameters),
        count: { $sum: 1 },
        minimum: { $min: computation },
        percentiles: {
          $percentile: {
            p: [0.25, 0.75],
            method: 'approximate',
            input: computation,
          },
        },
        median: {
          $median: {
            method: 'approximate',
            input: computation,
          },
        },
        maximum: { $max: computation },
        average: { $avg: computation },
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
}