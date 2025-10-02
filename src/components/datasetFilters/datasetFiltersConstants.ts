import { BuildingTypology, GetProjectDataForBoxPlotQuery, LifeCycleStage } from 'queries/generated'

const formatEnumValue = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const capitalizeEnumValue = (value: string): string => {
  return value.toUpperCase()
}

const formatCountryName = (countryName: string): string => {
  switch (countryName) {
    case 'United Kingdom of Great Britain and Northern Ireland':
      return 'UK'
    case 'United States of America':
      return 'USA'
    case 'Korea, Republic of':
      return 'South Korea'
    default:
      return countryName
  }
}

export const buildingTypologyOptions = Object.values(BuildingTypology).map((value) => ({
  value,
  label: formatEnumValue(value),
}))

export const lifeCycleOptions = [
  { value: 'all', label: 'Select All' },
  ...Object.values(LifeCycleStage).map((value) => ({
    value,
    label: capitalizeEnumValue(value),
  })),
]

export function countryOptionsFromData(data: GetProjectDataForBoxPlotQuery) {
  const countries = data.projects.groups.map((group) => ({
    value: group.group,
    label: formatCountryName(group.items[0].location.countryName),
  }))
  return [{ value: 'all', label: 'Select All' }, ...countries.sort((a, b) => a.label.localeCompare(b.label))]
}

export function softwareOptionsFromData(data: GetProjectDataForBoxPlotQuery) {
  const softwareSet = new Set<string>()
  data.projects.groups.forEach((group) => {
    const software = group.items[0].softwareInfo?.lcaSoftware
    if (software) softwareSet.add(software)
  })

  const options = Array.from(softwareSet).map((software) => ({
    value: software,
    label: software,
  }))

  return [{ value: 'all', label: 'Select All' }, ...options.sort((a, b) => a.label.localeCompare(b.label))]
}

export function sourceOptionsFromData(data: GetProjectDataForBoxPlotQuery) {
  const sourceSet = new Set<string>()
  data.projects.groups.forEach((group) => {
    // Iterate over all items in the group
    group.items.forEach((item) => {
      const sourceName = item.metaData?.source?.name
      if (sourceName) sourceSet.add(sourceName)
    })
  })
  const options = Array.from(sourceSet).map((source) => ({
    value: source,
    label: source,
  }))
  return [{ value: 'all', label: 'Select All' }, ...options.sort((a, b) => a.label.localeCompare(b.label))]
}

type PlotDesignerDataFilterSelection<T> = {
  enabled: boolean
  value: T
}

function makeFilter<T>(value: T, enabled: boolean = false): PlotDesignerDataFilterSelection<T> {
  return {
    enabled,
    value,
  }
}

export interface PlotDesignerDataFiltersSelection {
  typologies: PlotDesignerDataFilterSelection<string[]>
  lifeCycleStages: PlotDesignerDataFilterSelection<LifeCycleStage[]>
  countries: PlotDesignerDataFilterSelection<string[]>
  software: PlotDesignerDataFilterSelection<string[]>
  sources: PlotDesignerDataFilterSelection<string[]>
  gfaRange: PlotDesignerDataFilterSelection<[number, number]>
  confirmedGfaRange: PlotDesignerDataFilterSelection<[number, number]>
}

export function defaultFilters(): PlotDesignerDataFiltersSelection {
  return {
    typologies: makeFilter([]),
    lifeCycleStages: makeFilter([LifeCycleStage.A1A3], true),
    countries: makeFilter([]),
    software: makeFilter([]),
    sources: makeFilter([]),
    gfaRange: makeFilter([100, 5000], true),
    confirmedGfaRange: makeFilter([0, 0]),
  }
}

export interface PlotDesignerPlotParameters {
  quantity: 'gwp' | 'gwp_per_m2'
  lifeCycleStagesToInclude: LifeCycleStage[]
  groupBy: 'country' | 'buildingType' | 'software' | 'source'
}

export function defaultPlotParameters(): PlotDesignerPlotParameters {
  return {
    quantity: 'gwp',
    lifeCycleStagesToInclude: [LifeCycleStage.A1A3],
    groupBy: 'country',
  }
}

export interface PlotDesignerPlotSettings {
  filters: PlotDesignerDataFiltersSelection
  plotParameters: PlotDesignerPlotParameters
}

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

export function groupByFromPlotParameters(plotParameters: PlotDesignerPlotParameters): string {
  let groupBy = '$location.country'
  if (plotParameters.groupBy === 'buildingType') {
    groupBy = '$projectInfo.buildingType'
  } else if (plotParameters.groupBy === 'software') {
    groupBy = '$softwareInfo.lcaSoftware'
  } else if (plotParameters.groupBy === 'source') {
    groupBy = '$metaData.source.name'
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
