import { LifeCycleStage } from "queries/generated"
import { PlotDesignerQuantityOption, PlotDesignerGroupByOption } from "./plotSettings"

const plotDesignerQuantityOptionToLabel: Record<PlotDesignerQuantityOption, string> = {
  'gwp': 'GWP building',
  'gwp_per_m2': 'GWP per m²'
}

export function formatQuantity(quantity: string): string {
  return plotDesignerQuantityOptionToLabel[quantity as PlotDesignerQuantityOption] ?? 'Unknown quantity'
}

export const plotDesignerQuantityOptions = Object.entries(plotDesignerQuantityOptionToLabel).map(([key, value]) => ({
  value: key,
  label: value
}))

const plotDesignerGroupByOptionToLabel: Record<PlotDesignerGroupByOption, string> = {
  'country': 'Country',
  'software': 'Software',
  'source': 'Source',
  'frameType': 'Frame Type (Structure Type)',
  'buildingTypology': 'Building Typology'
}

export function formatGroupByOption(groupBy: string): string {
  return plotDesignerGroupByOptionToLabel[groupBy as PlotDesignerGroupByOption] ?? 'Unknown group by option'
}

export const plotDesignerGroupByOptions = Object.entries(plotDesignerGroupByOptionToLabel).map(([key, value]) => ({
  value: key,
  label: value
}))

export const plotDesignerLifeCycleStageOptions: { value: LifeCycleStage; label: string }[] = [
  ...Object.values(LifeCycleStage).map((value) => ({
    value,
    label: value.toUpperCase(),
  })),
]
