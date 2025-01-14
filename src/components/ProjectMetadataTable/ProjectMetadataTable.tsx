import { GetProjectDetailsQuery } from '@queries'
import { useMemo, useState } from 'react'
import { MantineReactTable, MRT_ColumnDef, MRT_PaginationState, useMantineReactTable } from 'mantine-react-table'
import { Button, Group, Pagination, Select } from '@mantine/core'
import { camelCaseToHumanCase, capitalizeFirstLetter, snakeCaseToHumanCase } from '@lib'
import { ErrorBoundary } from '../ErrorBoundary'
import { IconDownload } from '@tabler/icons-react'
import { download, generateCsv, mkConfig } from 'export-to-csv'

type Project = NonNullable<GetProjectDetailsQuery['contributions']['items']>[number]['project']

interface ProjectMetadataTableProps {
  project: Project | null
  loading: boolean
}

export type AcceptedData = number | string | boolean | null | undefined

interface CsvRow {
  [p: string]: AcceptedData
  [p: number]: AcceptedData
}

interface MetaData extends CsvRow {
  name: string
  value: string | number
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

const formatCellValue = (value: string | number | string[]): string => {
  let formattedValue: string
  if (typeof value === 'number') {
    formattedValue = formatNumber(value)
  } else if (typeof value === 'string' && value.includes('_')) {
    formattedValue = snakeCaseToHumanCase(value)
  } else if (value === 'N/A') {
    formattedValue = String(value)
  } else {
    formattedValue = capitalizeFirstLetter(String(value))
  }
  return formattedValue
}

type MetadataValue = ValueWithUnit | string | number | null | undefined | { [key: string]: unknown }

const isValueWithUnit = (value: unknown): value is ValueWithUnit => {
  return value !== null && typeof value === 'object' && 'value' in value && 'unit' in value
}

// @ts-expect-error returning any
const prettifyMetadata = (key: string, value: MetadataValue) => {
  const name = camelCaseToHumanCase(key)

  if (value === null || value === undefined) {
    return {
      name,
      value: 'N/A',
      unit: undefined,
    }
  }

  if (isValueWithUnit(value)) {
    return {
      name,
      value: value.value,
      unit: value.unit,
    }
  }
  if (Array.isArray(value)) {
    return {
      name,
      value: value.join(', '),
      unit: undefined,
    }
  }
  // Handle nested objects (like source, owner, etc.)
  if (typeof value === 'object') {
    return (
      Object.entries(value)
        .filter(([k]) => k !== '__typename')
        // @ts-expect-error returning any
        .map(([key, value]) => prettifyMetadata(`${name} ${key}`, value as MetadataValue))
    )
  }

  return {
    name,
    value: String(value),
    unit: undefined,
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
        .reduce((previousValue, currentValue) => {
          if (Array.isArray(currentValue)) {
            return [...previousValue, ...currentValue]
          }
          return [...previousValue, currentValue]
        }, [])
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
        Cell: ({ cell }) => formatCellValue(cell.getValue<string | number | string[]>()),
      },
      {
        accessorKey: 'unit',
        header: 'Unit',
        Cell: ({ cell }) => formatUnit(cell.getValue<string>()),
      },
    ],
    [],
  )

  const csvConfig = useMemo(
    () =>
      mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        columnHeaders: [
          { key: 'name', displayLabel: 'Name' },
          { key: 'value', displayLabel: 'Value' },
          {
            key: 'unit',
            displayLabel: 'Unit',
          },
        ],
        filename: `${project?.name}_metadata` || 'project_metadata',
      }),
    [project],
  )

  const handleExportAllData = (rows: MetaData[]) => {
    const csv = generateCsv(csvConfig)(rows)
    download(csvConfig)(csv)
  }

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
    renderTopToolbarCustomActions: () => (
      <Button
        onClick={() => handleExportAllData(metaData)}
        leftSection={<IconDownload />}
        variant='filled'
        disabled={metaData.length === 0}
      >
        Export All Metadata
      </Button>
    ),
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
