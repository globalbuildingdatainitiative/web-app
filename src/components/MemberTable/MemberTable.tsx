import { useGetUsersQuery } from '@queries'
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table'
import React, { useMemo } from 'react'

interface MemberTableProps {
  organizationId: string
}

interface Row {
  firstName: string
  lastName: string
  email: string
  timeJoined: string
}

export const MemberTable: React.FC<MemberTableProps> = ({ organizationId }) => {
  const {
    loading: loadingUsers,
    error: errorUsers,
    data: usersData,
  } = useGetUsersQuery({
    variables: {
      filters: {
        organizationId: {
          equal: organizationId,
        },
      },
    },
  })

  const columns = useMemo<MRT_ColumnDef<Row>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        Cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email Address',
        size: 200,
      },
      {
        accessorKey: 'timeJoined',
        header: 'Joined On',
        Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
        size: 100,
      },
    ],
    [],
  )

  const rowData = useMemo(() => {
    if (!usersData) return []

    return usersData.users as Row[]
  }, [usersData])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: rowData.length,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineToolbarAlertBannerProps: errorUsers
      ? {
          color: 'red',
          children: errorUsers?.message,
        }
      : undefined,
    state: {
      isLoading: loadingUsers,
      showAlertBanner: !!errorUsers,
      showSkeletons: false,
    },
  })

  return (
    <div data-testid='MemberTable'>
      <MantineReactTable table={table} />
    </div>
  )
}
