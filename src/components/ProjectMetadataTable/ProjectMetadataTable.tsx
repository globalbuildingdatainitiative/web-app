import { GetProjectDetailsQuery } from '@queries'
import { useMemo, useState } from 'react'
import { MantineReactTable, MRT_ColumnDef, MRT_PaginationState, useMantineReactTable } from 'mantine-react-table'
import { Group, Pagination, Select } from '@mantine/core'
import { camelCaseToHumanCase } from '@lib'
import { ErrorBoundary } from '../ErrorBoundary'

type Project = NonNullable<GetProjectDetailsQuery['contributions']['items']>[number]['project']

interface ProjectMetadataTableProps {
  project: Project
}

interface MetaData {
  name: string
  value: string | number | string[]
  unit?: string
}

// Formatting numbers with thousand separators
const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value)
}

// Formatting units with proper superscript
const formatUnit = (unit?: string): string => {
  if (!unit) return ''
  return unit.replace('m2', 'm²').replace('m3', 'm³').replace('kg/m2', 'kg/m²').replace('kWh/m2', 'kWh/m²')
}

// Formatting enum values by capitalizing first letter and replacing underscores with spaces
const formatEnumValue = (value: string): string => {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// Formatting cell value based on its type and unit
const formatCellValue = (value: string | number | string[], unit?: string): string => {
  let formattedValue: string

  if (Array.isArray(value)) {
    formattedValue = value.map((v) => (typeof v === 'string' ? formatEnumValue(v) : formatNumber(Number(v)))).join(', ')
  } else if (typeof value === 'number') {
    formattedValue = formatNumber(value)
  } else if (typeof value === 'string' && value.includes('_')) {
    formattedValue = formatEnumValue(value)
  } else {
    formattedValue = String(value)
  }

  // Append unit if it exists
  return unit ? `${formattedValue} ${formatUnit(unit)}` : formattedValue
}

export const ProjectMetadataTable = (props: ProjectMetadataTableProps) => {
  const { project } = props
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 })

  const metaData = useMemo(() => flattenMetadata(project), [project])

  const columns = useMemo<MRT_ColumnDef<MetaData>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'value',
        header: 'Value',
        Cell: ({ cell }) => formatCellValue(cell.getValue<string | number | string[]>(), cell.row.original.unit),
      },
      {
        accessorKey: 'unit',
        header: 'Unit',
        Cell: ({ cell }) => formatUnit(cell.getValue<string>()),
      },
    ],
    [],
  )

  const rowData = useMemo(
    () => metaData.slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize),
    [metaData, pagination],
  )

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: metaData.length,
    pageCount: Math.ceil(metaData.length / pagination.pageSize),
    enablePagination: false,
    enableGlobalFilter: false,
    mantinePaperProps: {
      shadow: 'xs',
      withBorder: true,
      p: 'md',
    },
    mantineTableProps: {
      striped: true,
      highlightOnHover: true,
    },
    state: {
      pagination,
    },
    onPaginationChange: (newPagination) => {
      if (typeof newPagination === 'function') {
        setPagination((prevPagination) => newPagination(prevPagination))
      } else {
        setPagination(newPagination)
      }
    },
  })

  return (
    <div data-testid='MetadataTable'>
      <ErrorBoundary>
        <MantineReactTable table={table} />
      </ErrorBoundary>
      <Group align='flex-end' mt='md'>
        <Pagination
          total={Math.ceil(metaData.length / pagination.pageSize)}
          value={pagination.pageIndex + 1}
          onChange={(page) => setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))}
        />
        <Select
          value={String(pagination.pageSize)}
          onChange={(size) => setPagination((prev) => ({ ...prev, pageSize: Number(size), pageIndex: 0 }))}
          data={['10', '20', '30', '50', '100', '200']}
          label='Rows per page'
        />
      </Group>
    </div>
  )
}

const flattenMetadata = (project: Project): MetaData[] => {
  const projectInfo = Object.entries(project.projectInfo)
    .filter(([key]) => key !== '__typename')
    // @ts-expect-error ignore
    .map(([key, value]) => prettifyMetadata(key, value))
  const metaData = Object.entries(project.metaData!)
    .filter(([key]) => key !== '__typename')
    .map(([key, value]) => prettifyMetadata(key, value))
  return [...projectInfo, ...metaData]
}

const prettifyMetadata = (key: string, value: { value: string | number | string[]; unit: string } | string) => ({
  name: camelCaseToHumanCase(key),
  // @ts-expect-error ignore
  value: value?.value !== undefined ? value.value : value,
  // @ts-expect-error ignore
  unit: value?.unit,
})
