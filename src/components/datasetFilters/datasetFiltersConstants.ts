import { BuildingTypology, GetProjectDataForBoxPlotQuery, LifeCycleStage } from "queries/generated"

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

function disabledFilter<T>(value: T): PlotDesignerDataFilterSelection<T> {
  return {
    enabled: false,
    value
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
    typologies: disabledFilter([]),
    lifeCycleStages: disabledFilter([LifeCycleStage.A1A3]),
    countries: disabledFilter([]),
    software: disabledFilter([]),
    sources: disabledFilter([]),
    gfaRange: disabledFilter([0, 0]),
    confirmedGfaRange: disabledFilter([0, 0])
  }
}

export function filtersToAggregation(filters: PlotDesignerDataFiltersSelection): object[] {
  const divideAggregation = filters.lifeCycleStages.enabled ? {
    $sum: filters.lifeCycleStages.value.map((stage) => `$results.gwp.${stage.toLowerCase()}`),
  } : null

  const stageFilters = filters.lifeCycleStages.enabled ? filters.lifeCycleStages.value.map((stage) => ({
    [`results.gwp.${stage.toLowerCase()}`]: { $gt: 0 },
  })) : []

  const gfaFilter = filters.gfaRange.enabled ? {
    'projectInfo.grossFloorArea.value': {
      $gte: filters.gfaRange.value[0],
      $lte: filters.gfaRange.value[1],
    },
  } : null

  const filtersToApply: object[] = [...stageFilters]
  if (gfaFilter) filtersToApply.push(gfaFilter)

  const typologyFilter =
    (filters.typologies.value.length > 0 && filters.typologies.enabled)
      ? { 'projectInfo.buildingTypology': { $in: filters.typologies.value } }
      : {}
  if (typologyFilter) {
    filtersToApply.push(typologyFilter)
  }

  const countryFilter =
    (filters.countries.value.length > 0 && filters.countries.enabled)
      ? { 'location.country': { $in: filters.countries.value } }
      : {}
  if (countryFilter) {
    filtersToApply.push(countryFilter)
  }

  const softwareFilter =
    (filters.software.value.length > 0 && filters.software.enabled)
      ? { 'softwareInfo.lcaSoftware': { $in: filters.software.value } }
      : {}
  if (softwareFilter) {
    filtersToApply.push(softwareFilter)
  }

  const sourceFilter =
    (filters.sources.value.length > 0 && filters.sources.enabled)
      ? { 'metaData.source.name': { $in: filters.sources.value } }
      : {}
  if (sourceFilter) {
    filtersToApply.push(sourceFilter)
  }

  return [
    {
      $match: {
        $and: filtersToApply,
      },
    },
    {
      $group: {
        _id: '$location.country',
        count: { $sum: 1 },
        minimum: { $min: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] } },
        percentiles: {
          $percentile: {
            p: [0.25, 0.75],
            method: 'approximate',
            input: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] },
          },
        },
        median: {
          $median: {
            method: 'approximate',
            input: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] },
          },
        },
        maximum: { $max: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] } },
        average: { $avg: { $divide: [divideAggregation, '$projectInfo.grossFloorArea.value'] } },
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