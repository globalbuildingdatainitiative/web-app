import { MultiSelect, Select } from '@mantine/core'
import { LifeCycleStage } from '@queries'
import {
  PlotDesignerGroupByOption,
  PlotDesignerPlotParameters,
  PlotDesignerQuantityOption,
} from './datasetFiltersConstants'

interface PlotDesignerPlotParametersSelectorProps {
  parameters: PlotDesignerPlotParameters
  onPlotParametersChange: (parameters: PlotDesignerPlotParameters) => void
}

export const PlotDesignerPlotParametersSelector = ({
  parameters,
  onPlotParametersChange,
}: PlotDesignerPlotParametersSelectorProps) => {
  const quantityOptions: { value: PlotDesignerQuantityOption; label: string }[] = [
    { value: 'gwp', label: 'GWP building' },
    { value: 'gwp_per_m2', label: 'GWP per m²' },
  ]

  const groupByOptions: { value: PlotDesignerGroupByOption; label: string }[] = [
    { value: 'country', label: 'Country' },
    { value: 'software', label: 'Software' },
    { value: 'source', label: 'Source' },
    { value: 'frameType', label: 'Frame Type (Structure Type)' },
    { value: 'buildingTypology', label: 'Building Typology' },
  ]

  const lifeCycleOptions = [
    { value: 'all', label: 'Select All' },
    ...Object.values(LifeCycleStage).map((value) => ({
      value,
      label: value.toUpperCase(),
    })),
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ maxWidth: 300 }}>
        <Select
          data={quantityOptions}
          value={parameters.quantity}
          onChange={(value) => onPlotParametersChange({ ...parameters, quantity: value as PlotDesignerQuantityOption })}
          label='Quantity to display'
          placeholder='Select quantity'
        />
        <p style={{ fontStyle: 'italic', color: 'gray', fontSize: '12px', marginTop: 0 }}>
          Make sure to filter for Gross Floor Area {'>'} 0 if you select "GWP per m²" to avoid a division by zero error.
        </p>
      </div>

      <MultiSelect
        data={lifeCycleOptions}
        value={parameters.lifeCycleStagesToInclude}
        onChange={(value) =>
          onPlotParametersChange({ ...parameters, lifeCycleStagesToInclude: value as LifeCycleStage[] })
        }
        label='Life Cycle Stages to Include in computation'
        placeholder='Select life cycle stages'
      />

      <Select
        data={groupByOptions}
        value={parameters.groupBy}
        onChange={(value) =>
          onPlotParametersChange({
            ...parameters,
            groupBy: value as PlotDesignerGroupByOption,
          })
        }
        label='Group By'
        placeholder='Select grouping'
      />
    </div>
  )
}
