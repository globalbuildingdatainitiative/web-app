import { Contribution, useGetContributionsQuery } from '@queries'
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable, MRT_PaginationState } from 'mantine-react-table'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Group, Select, Pagination } from '@mantine/core'

export const ContributionTable = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 })

  const { loading, error, data } = useGetContributionsQuery({
    variables: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
    },
    fetchPolicy: 'network-only',
  })
  const columns = useMemo<MRT_ColumnDef<Pick<Contribution, 'id'>>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'project.name',
        header: 'Project',
        size: 300,
      },
      {
        accessorKey: 'uploadedAt',
        header: 'Date',
        Cell: ({ cell }) => <>{dayjs(cell.getValue() as string).format('DD/MM/YYYY')}</>,
        size: 50,
      },
      {
        accessorKey: 'project.location.countryName',
        header: 'Country',
        size: 100,
      },
    ],
    [],
  )

  const rowData = useMemo(() => data?.contributions.items || [], [data])
  const totalRowCount = useMemo(() => data?.contributions.count || 0, [data])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: totalRowCount,
    pageCount: Math.ceil(totalRowCount / pagination.pageSize),
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineToolbarAlertBannerProps: error
      ? {
          color: 'red',
          children: error.message,
        }
      : undefined,
    state: {
      isLoading: loading,
      showAlertBanner: !!error,
      showSkeletons: false,
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
    <div data-testid='ContributionTable'>
      <MantineReactTable table={table} />
      <Group align='flex-end' mt='md'>
        <Pagination
          total={Math.ceil(totalRowCount / pagination.pageSize)}
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
