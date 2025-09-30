import { MultiSelect, RangeSlider, Switch } from '@mantine/core'
import { type GetProjectDataForBoxPlotQuery, LifeCycleStage } from '@queries'
import { useMemo } from 'react'
import {
  buildingTypologyOptions,
  countryOptionsFromData,
  lifeCycleOptions,
  PlotDesignerDataFiltersSelection,
  softwareOptionsFromData,
  sourceOptionsFromData,
} from './datasetFiltersConstants'

interface PlotDesignerDataFiltersProps {
  filters: PlotDesignerDataFiltersSelection
  onFilterChange: (f: PlotDesignerDataFiltersSelection) => any
  data: GetProjectDataForBoxPlotQuery | undefined
}

export const PlotDesignerDataFilters = ({ filters, onFilterChange, data }: PlotDesignerDataFiltersProps) => {
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

  // TODO : should all of these be dependent on this data or should all countries be available?
  const countryOptions = useMemo(() => {
    if (!data) return []
    return countryOptionsFromData(data)
  }, [data])
  const softwareOptions = useMemo(() => {
    if (!data) return []
    return softwareOptionsFromData(data)
  }, [data])
  const sourceOptions = useMemo(() => {
    if (!data) return []
    return sourceOptionsFromData(data)
  }, [data])

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
          />
        }
        placeholder='Select building typologies'
        disabled={!filters.typologies.enabled}
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
          />
        }
        placeholder='Select life cycle stages'
        disabled={!filters.lifeCycleStages.enabled}
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
          />
        }
        placeholder='Select countries'
        disabled={!filters.countries.enabled}
      />

      <MultiSelect
        data={softwareOptions}
        value={filters.software.value}
        onChange={(value) => setFieldValue('software', value)}
        label={
          <Switch
            checked={filters.software.enabled}
            onChange={(event) => setFieldEnabled('software', event.currentTarget.checked)}
            label='LCA Software'
          />
        }
        placeholder='Select LCA software'
        searchable
        clearable
        disabled={!filters.software.enabled}
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
          />
        }
        placeholder='Select sources'
        searchable
        clearable
        disabled={!filters.sources.enabled}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Switch
          checked={filters.gfaRange.enabled}
          onChange={(event) => setFieldEnabled('gfaRange', event.currentTarget.checked)}
          label='Gross Floor Area (m²)'
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
          disabled={!filters.gfaRange.enabled}
        />
      </div>
    </div>
  )
}
