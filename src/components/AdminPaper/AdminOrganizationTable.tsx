import { useMemo } from 'react'
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table'
import { GetOrganizationsQuery, useGetOrganizationsQuery } from '@queries'

type Organization = NonNullable<GetOrganizationsQuery['organizations']>[number]

export const AdminOrganizationTable = () => {
  const { data, loading, error } = useGetOrganizationsQuery()

  const columns = useMemo<MRT_ColumnDef<Organization>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
    ],
    [],
  )

  const rowData = useMemo(() => data?.organizations || [], [data])
  const totalRowCount = useMemo(() => data?.organizations.length || 0, [data])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: totalRowCount,
    enablePagination: true,
    mantineToolbarAlertBannerProps: error
      ? {
          color: 'red',
          children: error?.message,
        }
      : undefined,
    state: {
      isLoading: loading,
      showAlertBanner: !!error,
      showSkeletons: false,
    },
  })

  return (
    <div data-testid='AdminOrganizationTable'>
      <MantineReactTable table={table} />
    </div>
  )
}
