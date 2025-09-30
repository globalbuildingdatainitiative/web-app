import { Table } from '@mantine/core'
import { PlotDesignerAggregationResultPretty } from './plotDesignerUtils'

interface PlotDesignerTableProps {
  prettifiedData: PlotDesignerAggregationResultPretty[]
}

export const PlotDesignerTable = ({ prettifiedData }: PlotDesignerTableProps) => {
  if (!prettifiedData) {
    return <div>No data available</div>
  }

  const rows = prettifiedData.map((agg) => (
    <Table.Tr key={agg.name}>
      <Table.Td>{agg.name}</Table.Td>
      <Table.Td>{agg.min}</Table.Td>
      <Table.Td>{agg.pct25}</Table.Td>
      <Table.Td>{agg.median}</Table.Td>
      <Table.Td>{agg.pct75}</Table.Td>
      <Table.Td>{agg.max}</Table.Td>
      <Table.Td>{agg.avg}</Table.Td>
      <Table.Td>{agg.count}</Table.Td>
    </Table.Tr>
  ))

  return (
    <div style={{ overflowX: 'auto' }}>
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
