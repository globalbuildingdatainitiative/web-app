import { type MapCircleRadiusSource, MapCircleRadiusSourceLabels } from 'components/PlotDesignerPaper/plotDesignerUtils'

export const mapCircleRadiusSourceOptions: { value: MapCircleRadiusSource; label: string }[] = Object.entries(
  MapCircleRadiusSourceLabels,
).map(([key, label]) => ({
  value: key as MapCircleRadiusSource,
  label,
}))
