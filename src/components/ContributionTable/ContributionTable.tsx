import { Contribution, useGetContributionsQuery } from '@queries'
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table'
import { useMemo } from 'react'
import dayjs from 'dayjs'

export const ContributionTable = () => {
  const { loading, error, data } = useGetContributionsQuery()

  const columns = useMemo<MRT_ColumnDef<Pick<Contribution, 'id'>>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'uploadedAt',
        header: 'Date',
        Cell: ({ cell }) => <div>{dayjs(cell.getValue() as string).format('DD/MM/YYYY')}</div>,
      },
      {
        accessorKey: 'organization.name',
        header: 'Organization',
      },
      {
        accessorKey: 'project.name',
        header: 'Project',
      },
    ],
    [],
  )

  const rowData = useMemo(() => data?.contributions || [], [data])
  const totalRowCount = useMemo(() => data?.contributions.length || 0, [data])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: totalRowCount,
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
      showSkeletons: loading,
    },
  })
  return <MantineReactTable table={table} />
}
