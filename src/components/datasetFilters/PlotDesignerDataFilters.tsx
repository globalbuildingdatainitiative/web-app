import { MultiSelect, RangeSlider, Switch } from '@mantine/core'
import { LifeCycleStage } from '@queries'
import {
  buildingTypologyOptions,
  countryOptions,
  frameTypeOptions,
  lcaSoftwareOptions,
  lifeCycleOptions,
  sourceOptions,
} from './filtersConstants'
import type { PlotDesignerDataFiltersSelection } from './plotSettings'

interface PlotDesignerDataFiltersProps {
  filters: PlotDesignerDataFiltersSelection
  disabled?: boolean
  onFilterChange: (f: PlotDesignerDataFiltersSelection) => void
}

export const PlotDesignerDataFilters = ({ filters, onFilterChange, disabled }: PlotDesignerDataFiltersProps) => {
  function setFieldEnabled(field: keyof PlotDesignerDataFiltersSelection, enabled: boolean) {
    onFilterChange({
      ...filters,
      [field]: {
        enabled,
        value: filters[field].value,
      },
    })
  }
  function setFieldValue(
    field: keyof PlotDesignerDataFiltersSelection,
    value: string[] | LifeCycleStage[] | [number, number],
  ) {
    onFilterChange({
      ...filters,
      [field]: {
        enabled: filters[field].enabled,
        value,
      },
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', flexWrap: 'wrap' }}>
      <MultiSelect
        data={buildingTypologyOptions}
        value={filters.typologies.value}
        onChange={(value) => setFieldValue('typologies', value)}
        label={
          <Switch
            checked={filters.typologies.enabled}
            onChange={(event) => setFieldEnabled('typologies', event.currentTarget.checked)}
            label='Building Typology'
            disabled={disabled}
          />
        }
        placeholder='Select building typologies'
        disabled={!filters.typologies.enabled || disabled}
      />

      <MultiSelect
        data={lifeCycleOptions}
        value={filters.lifeCycleStages.value}
        onChange={(value) => setFieldValue('lifeCycleStages', value)}
        label={
          <Switch
            checked={filters.lifeCycleStages.enabled}
            onChange={(event) => setFieldEnabled('lifeCycleStages', event.currentTarget.checked)}
            label='Life Cycle Stage'
            disabled={disabled}
          />
        }
        placeholder='Select life cycle stages'
        disabled={!filters.lifeCycleStages.enabled || disabled}
      />

      <MultiSelect
        data={countryOptions}
        value={filters.countries.value}
        onChange={(value) => setFieldValue('countries', value)}
        label={
          <Switch
            checked={filters.countries.enabled}
            onChange={(event) => setFieldEnabled('countries', event.currentTarget.checked)}
            label='Country'
            disabled={disabled}
          />
        }
        searchable
        nothingFoundMessage='No country found'
        placeholder='Select countries'
        disabled={!filters.countries.enabled || disabled}
      />

      <MultiSelect
        data={frameTypeOptions}
        value={filters.frameTypes.value}
        onChange={(value) => setFieldValue('frameTypes', value)}
        label={
          <Switch
            checked={filters.frameTypes.enabled}
            onChange={(event) => setFieldEnabled('frameTypes', event.currentTarget.checked)}
            label='Frame Type (Structure Type)'
            disabled={disabled}
          />
        }
        searchable
        nothingFoundMessage='No frame type found'
        placeholder='Select frame types'
        disabled={!filters.frameTypes.enabled || disabled}
      />

      <MultiSelect
        data={lcaSoftwareOptions}
        value={filters.software.value}
        onChange={(value) => setFieldValue('software', value)}
        label={
          <Switch
            checked={filters.software.enabled}
            onChange={(event) => setFieldEnabled('software', event.currentTarget.checked)}
            label='LCA Software'
            disabled={disabled}
          />
        }
        placeholder='Select LCA software'
        searchable
        nothingFoundMessage='No software found'
        clearable
        disabled={!filters.software.enabled || disabled}
      />

      <MultiSelect
        data={sourceOptions}
        value={filters.sources.value}
        onChange={(value) => setFieldValue('sources', value)}
        label={
          <Switch
            checked={filters.sources.enabled}
            onChange={(event) => setFieldEnabled('sources', event.currentTarget.checked)}
            label='Source'
            disabled={disabled}
          />
        }
        placeholder='Select sources'
        searchable
        clearable
        disabled={!filters.sources.enabled || disabled}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Switch
          checked={filters.gfaRange.enabled}
          onChange={(event) => setFieldEnabled('gfaRange', event.currentTarget.checked)}
          label='Gross Floor Area (m²)'
          disabled={disabled}
        />
        <RangeSlider
          min={0}
          max={5000}
          step={100}
          value={filters.gfaRange.value}
          onChange={(value) => setFieldValue('gfaRange', value)}
          // onChangeEnd={handleRangeConfirm}
          label={(value) => `${value.toLocaleString()} m²`}
          marks={[
            { value: 0, label: '0 m²' },
            { value: 2500, label: '2500 m²' },
            { value: 5000, label: '5000 m²' },
          ]}
          disabled={!filters.gfaRange.enabled || disabled}
        />
      </div>
    </div>
  )
}
