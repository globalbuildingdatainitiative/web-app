import { useGetUsersQuery, useGetOrganizationsQuery, User } from '@queries'
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table'
import React, { useMemo } from 'react'

interface MemberTableProps {
  organizationId: string
}

export const MemberTable: React.FC<MemberTableProps> = ({ organizationId }) => {
  const { loading: loadingUsers, error: errorUsers, data: usersData } = useGetUsersQuery()
  const {
    loading: loadingOrganizations,
    error: errorOrganizations,
    data: organizationsData,
  } = useGetOrganizationsQuery()

  const columns = useMemo<MRT_ColumnDef<User>[]>(
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
      {
        accessorKey: 'organizationName',
        header: 'Organization',
        size: 200,
      },
    ],
    [],
  )

  const rowData = useMemo(() => {
    if (!usersData || !organizationsData) return []
    const organizationsMap: Record<string, string> = organizationsData.organizations.reduce(
      (acc: Record<string, string>, org) => {
        acc[org.id] = org.name
        return acc
      },
      {},
    )

    return usersData.users
      .filter((user) => String(user.organizationId) === String(organizationId))
      .map((user) => ({
        ...user,
        organizationName: organizationsMap[user.organizationId] || '<Unknown>',
        timeJoined: user.timeJoined, // Assuming this is the actual joined date field
      }))
  }, [usersData, organizationsData, organizationId])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: rowData.length,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineToolbarAlertBannerProps:
      errorUsers || errorOrganizations
        ? {
            color: 'red',
            children: errorUsers?.message || errorOrganizations?.message,
          }
        : undefined,
    state: {
      isLoading: loadingUsers || loadingOrganizations,
      showAlertBanner: !!errorUsers || !!errorOrganizations,
      showSkeletons: false,
    },
  })

  return (
    <div data-testid='MemberTable'>
      <MantineReactTable table={table} />
    </div>
  )
}
