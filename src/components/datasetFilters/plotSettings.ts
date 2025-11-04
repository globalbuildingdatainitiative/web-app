import { LifeCycleStage } from 'queries/generated'

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
  frameTypes: PlotDesignerDataFilterSelection<string[]>
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
    frameTypes: makeFilter([]),
    gfaRange: makeFilter([100, 5000], true),
    confirmedGfaRange: makeFilter([0, 0]),
  }
}

export function searchParamsToFilters(searchParams: URLSearchParams): PlotDesignerDataFiltersSelection {
  const filtersUsingNumbers = ['gfaRange', 'confirmedGfaRange']
  const filters = defaultFilters()

  const filtersKeys = Object.keys(filters) as (keyof PlotDesignerDataFiltersSelection)[]
  filtersKeys.forEach((key) => {
    const paramValue = searchParams.get(key)
    if (paramValue !== null) {
      filters[key].enabled = true
      if (paramValue !== '') {
        const values = paramValue.split(',')
        filters[key].value = filtersUsingNumbers.includes(key) ? values.map(Number) : (values as unknown as any)
      }
    }
  })

  return filters
}

export function filtersToSearchParams(
  filters: PlotDesignerDataFiltersSelection,
  existingParams: URLSearchParams = new URLSearchParams(),
): URLSearchParams {
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

export type PlotDesignerQuantityOption = 'gwp' | 'gwp_per_m2'
export type PlotDesignerGroupByOption = 'country' | 'software' | 'source' | 'frameType' | 'buildingTypology'

export interface PlotDesignerPlotParameters {
  quantity: PlotDesignerQuantityOption
  lifeCycleStagesToInclude: LifeCycleStage[]
  groupBy: PlotDesignerGroupByOption
}

export function defaultPlotParameters(): PlotDesignerPlotParameters {
  return {
    quantity: 'gwp_per_m2',
    lifeCycleStagesToInclude: [LifeCycleStage.A1A3],
    groupBy: 'country',
  }
}
export interface PlotDesignerPlotSettings {
  filters: PlotDesignerDataFiltersSelection
  plotParameters: PlotDesignerPlotParameters
}

export function searchParamsToPlotParameters(searchParams: URLSearchParams): PlotDesignerPlotParameters {
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

export function plotParametersToSearchParams(plotParameters: PlotDesignerPlotParameters): URLSearchParams {
  const searchParams = new URLSearchParams()
  searchParams.set('quantity', plotParameters.quantity)
  searchParams.set('groupBy', plotParameters.groupBy)
  searchParams.set('lifeCycleStagesToInclude', plotParameters.lifeCycleStagesToInclude.join(','))
  return searchParams
}
