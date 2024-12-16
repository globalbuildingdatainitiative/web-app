import { GetProjectDetailsQuery } from '@queries'
import { useMemo, useState } from 'react'
import { MantineReactTable, MRT_ColumnDef, MRT_PaginationState, useMantineReactTable } from 'mantine-react-table'
import { Group, Pagination, Select } from '@mantine/core'
import { camelCaseToHumanCase } from '@lib'
import { ErrorBoundary } from '../ErrorBoundary'

type Project = NonNullable<GetProjectDetailsQuery['contributions']['items']>[number]['project']

interface ProjectMetadataTableProps {
  project: Project | null
  loading: boolean
}

interface MetaData {
  name: string
  value: string | number | string[]
  unit?: string
}

interface ValueWithUnit {
  value: string | number | string[]
  unit: string
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

  return unit ? `${formattedValue} ${formatUnit(unit)}` : formattedValue
}

type MetadataValue = ValueWithUnit | string | number | null | undefined | { [key: string]: unknown }

const isValueWithUnit = (value: unknown): value is ValueWithUnit => {
  return value !== null && typeof value === 'object' && 'value' in value && 'unit' in value
}

const prettifyMetadata = (key: string, value: MetadataValue): MetaData => {
  const name = camelCaseToHumanCase(key)

  if (value === null || value === undefined) {
    return {
      name,
      value: 'N/A',
    }
  }

  if (isValueWithUnit(value)) {
    return {
      name,
      value: value.value,
      unit: value.unit,
    }
  }

  // Handle nested objects (like source, owner, etc.)
  if (typeof value === 'object') {
    const flatValue = Object.entries(value)
      .filter(([k]) => k !== '__typename')
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ')
    return {
      name,
      value: flatValue || 'N/A',
    }
  }

  return {
    name,
    value: String(value),
  }
}

const flattenMetadata = (project: Project): MetaData[] => {
  if (!project) return []

  const projectInfo = Object.entries(project.projectInfo)
    .filter(([key]) => key !== '__typename')
    .map(([key, value]) => prettifyMetadata(key, value as MetadataValue))

  const metaData = project.metaData
    ? Object.entries(project.metaData)
        .filter(([key]) => key !== '__typename')
        .map(([key, value]) => prettifyMetadata(key, value as MetadataValue))
    : []

  return [...projectInfo, ...metaData]
}

export const ProjectMetadataTable = (props: ProjectMetadataTableProps) => {
  const { project, loading } = props
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 })

  const metaData = useMemo(() => (project ? flattenMetadata(project) : []), [project])

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
      isLoading: loading,
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
