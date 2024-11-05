import { GetProjectDetailsQuery } from '@queries'
import { useMemo, useState } from 'react'
import { MantineReactTable, MRT_ColumnDef, MRT_PaginationState, useMantineReactTable } from 'mantine-react-table'
import { Group, Pagination, Select } from '@mantine/core'
import { camelCaseToHumanCase } from '@lib'

type Project = NonNullable<GetProjectDetailsQuery['contributions']['items']>[number]['project']

interface ProjectMetadataTableProps {
  project: Project
}

interface MetaData {
  name: string
  value: string | number | string[]
  unit?: string
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
      },
      {
        accessorKey: 'unit',
        header: 'Unit',
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
      <MantineReactTable table={table} />
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
