import { Button, Switch, Table } from '@mantine/core'
import { PlotDesignerAggregationResultPretty } from './plotDesignerUtils'
import Papa from 'papaparse'
import {
  filtersToSearchParams,
  PlotDesignerDataFiltersSelection,
  PlotDesignerPlotParameters,
  plotParametersToSearchParams,
} from 'components/datasetFilters/plotSettings'
import { useState } from 'react'
import { StatsCard } from 'components/StatsCard/StatsCard'

interface PlotDesignerTableProps {
  prettifiedData: PlotDesignerAggregationResultPretty[]
  filters: PlotDesignerDataFiltersSelection
  plotParameters: PlotDesignerPlotParameters
}

function buildFiltersSlug(filters: PlotDesignerDataFiltersSelection): string {
  const activeFilters = Object.entries(filters)
    .filter(([_, filter]) => filter.enabled && filter.value.length > 0)
    .map(([key, filter]) => `${key}-${filter.value.join('-')}`)

  return activeFilters.join('__')
}

function buildPlotParametersSlug(plotParameters: PlotDesignerPlotParameters): string {
  return `quantity-${plotParameters.quantity}__groupBy-${plotParameters.groupBy}__lifeCycleStages-${plotParameters.lifeCycleStagesToInclude.join('-')}`
}

function makeYamlStyleHeaderForCSV(
  filters: PlotDesignerDataFiltersSelection,
  plotParameters: PlotDesignerPlotParameters,
): string {
  let header = '## Plot Designer Parameters\n'
  header += `## URL : ${window.location.origin}/plot-designer?${filtersToSearchParams(filters)}&${plotParametersToSearchParams(plotParameters)}\n`
  header += `## Quantity: ${plotParameters.quantity}\n`
  header += `## Group By: ${plotParameters.groupBy}\n`
  header += `## Life Cycle Stages Included: ${plotParameters.lifeCycleStagesToInclude.join(', ')}\n`
  header += '## Applied Filters:\n'
  Object.entries(filters).forEach(([key, filter]) => {
    if (filter.enabled) {
      header += `##   - ${key}: [${filter.value.join(', ')}]\n`
    }
  })
  return header
}

export const PlotDesignerTable = ({ prettifiedData, filters, plotParameters }: PlotDesignerTableProps) => {
  const [addHeaders, setAddHeaders] = useState<boolean>(true)
  if (!prettifiedData) {
    return <div>No data available</div>
  }

  function downloadAsCSV() {
    const headers = ['Label', 'Min', '25th percentile', 'Median', '75th percentile', 'Max', 'Average', 'Project count']
    const rows = prettifiedData.map((agg) => [
      agg.name,
      agg.min,
      agg.pct25,
      agg.median,
      agg.pct75,
      agg.max,
      agg.avg,
      agg.count,
    ])

    const csv = Papa.unparse({
      fields: headers,
      data: rows,
    })
    const content = addHeaders ? `${makeYamlStyleHeaderForCSV(filters, plotParameters)}\n${csv}` : csv

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    // limit to 250 characters for file system compatibility
    const completeSlug =
      `plot___Params_${buildPlotParametersSlug(plotParameters)}___Filters_${buildFiltersSlug(filters)}`.slice(0, 250)
    link.setAttribute('download', `${completeSlug}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const rows = prettifiedData.map((agg) => (
    <Table.Tr key={agg.name}>
      <Table.Td>{agg.name}</Table.Td>
      <Table.Td>{agg.min.toFixed(2)}</Table.Td>
      <Table.Td>{agg.pct25.toFixed(2)}</Table.Td>
      <Table.Td>{agg.median.toFixed(2)}</Table.Td>
      <Table.Td>{agg.pct75.toFixed(2)}</Table.Td>
      <Table.Td>{agg.max.toFixed(2)}</Table.Td>
      <Table.Td>{agg.avg.toFixed(2)}</Table.Td>
      <Table.Td>{agg.count}</Table.Td>
    </Table.Tr>
  ))

  const totalAllItems = prettifiedData.reduce((sum, agg) => sum + agg.count, 0)

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <StatsCard title="Item Count" value={prettifiedData.length} />
        <StatsCard title="Project Count" value={totalAllItems} hoverCardContent="Project count across all items" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Button onClick={downloadAsCSV}>Download CSV</Button>
          <Switch
            label='Add filters and parameters to CSV headers (may decrease compatibility)'
            checked={addHeaders}
            onChange={(event) => setAddHeaders(event.currentTarget.checked)}
          />
        </div>
      </div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Label</Table.Th>
            <Table.Th>Min</Table.Th>
            <Table.Th>25th percentile</Table.Th>
            <Table.Th>Median</Table.Th>
            <Table.Th>75th percentile</Table.Th>
            <Table.Th>Max</Table.Th>
            <Table.Th>Average</Table.Th>
            <Table.Th>Project count</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  )
}
