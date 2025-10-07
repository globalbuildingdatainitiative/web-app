import { Button, Table } from '@mantine/core'
import { PlotDesignerAggregationResultPretty } from './plotDesignerUtils'
import Papa from 'papaparse'

interface PlotDesignerTableProps {
  prettifiedData: PlotDesignerAggregationResultPretty[]
}

export const PlotDesignerTable = ({ prettifiedData }: PlotDesignerTableProps) => {
  if (!prettifiedData) {
    return <div>No data available</div>
  }

  function downloadAsCSV() {
    const headers = [
      'Label',
      'Min',
      '25th percentile',
      'Median',
      '75th percentile',
      'Max',
      'Average',
      'Project count',
    ]
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

    // make csv with papaparse
    const csv = Papa.unparse({
      fields: headers,
      data: rows,
    })

    // download csv
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'plot_data.csv')
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

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <Button onClick={downloadAsCSV}>Download CSV</Button>
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
