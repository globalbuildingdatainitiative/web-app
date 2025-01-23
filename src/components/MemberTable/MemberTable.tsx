import { GetUsersDocument, Permission, useGetUsersQuery, useUpdateUserMutation } from '@queries'
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_Row,
  MRT_SortingState,
  useMantineReactTable,
} from 'mantine-react-table'
import { useMemo, useState } from 'react'
import { ActionIcon, Group, Pagination, ScrollArea, Select, Tooltip } from '@mantine/core'
import { IconDoorExit, IconUserX } from '@tabler/icons-react'
import { useHasPermission } from '@lib'

interface MemberTableProps {
  organizationId: string
}

interface Row {
  id: string
  firstName: string
  lastName: string
  email: string
  timeJoined: string
  role: string
}

interface Filters {
  [key: string]: { contains?: string; equal?: string; is_true?: boolean }
}

interface SortBy {
  [key: string]: string
}

export const MemberTable = ({ organizationId }: MemberTableProps) => {
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])

  const sortBy: SortBy | undefined = useMemo(() => {
    if (!sorting.length) return undefined
    const [sort] = sorting

    const fieldMapping: Record<string, string> = {
      name: 'name',
      email: 'email',
      timeJoined: 'timeJoined',
      role: 'role',
      firstName: 'firstName',
      lastName: 'lastName',
    }

    const sortField = fieldMapping[sort.id] || sort.id

    return {
      [sort.desc ? 'dsc' : 'asc']: sortField,
    }
  }, [sorting])

  const filters = useMemo(() => {
    const filters: Filters = {
      organizationId: { equal: organizationId },
    }

    if (!columnFilters.length) return filters

    columnFilters.forEach((filter) => {
      const fieldName = filter.id === 'name' ? 'firstName' : filter.id

      if (typeof filter.value === 'string') {
        if (filter.id === 'role') {
          // Send the role value in lowercase to match the backend enum
          filters[fieldName] = { equal: filter.value.toLowerCase() }
        } else {
          filters[fieldName] = { contains: filter.value }
        }
      } else if (typeof filter.value === 'boolean') {
        filters[fieldName] = { is_true: filter.value }
      }
    })

    return filters
  }, [columnFilters, organizationId])

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const {
    loading: loadingUsers,
    error: errorUsers,
    data: usersData,
  } = useGetUsersQuery({
    variables: {
      filters,
      sortBy,
    },
  })

  const formatRoles = (roles: string[] | null | undefined): string => {
    if (!roles) return 'N/A'
    return roles.map((role) => role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()).join(', ')
  }

  const rowData = useMemo(() => {
    if (!usersData) return []

    return usersData.users
      .filter((user) => {
        const status = user.inviteStatus?.toLowerCase()
        return !user.invited || status === 'accepted'
      })
      .map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        timeJoined: user.timeJoined,
        role: formatRoles(user.roles),
      })) as Row[]
  }, [usersData])

  const totalRowCount = rowData.length

  const columns = useMemo<MRT_ColumnDef<Row>[]>(() => {
    return [
      {
        accessorKey: 'name',
        header: 'Name',
        Cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
        size: 150,
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'email',
        header: 'Email Address',
        size: 200,
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'timeJoined',
        header: 'Joined On',
        Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
        size: 100,
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 100,
        enableSorting: true,
        enableColumnFilter: true,
        filterVariant: 'select',
        mantineFilterSelectProps: {
          data: [
            { value: 'owner', label: 'Owner' },
            { value: 'member', label: 'Member' },
          ],
        },
      },
    ]
  }, [])

  const slicedData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize
    return rowData.slice(start, start + pagination.pageSize)
  }, [rowData, pagination.pageIndex, pagination.pageSize])

  const table = useMantineReactTable({
    columns,
    data: slicedData,
    rowCount: rowData.length,
    enableGlobalFilter: false,
    enablePagination: false,
    manualFiltering: true,
    manualSorting: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => <RowActions row={row} sortBy={sortBy} filters={filters} />,
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
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
  })

  return (
    <div data-testid='MemberTable'>
      <ScrollArea scrollbars='x'>
        <MantineReactTable table={table} />
      </ScrollArea>
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

interface RowActionsProps {
  row: MRT_Row<Row>
  filters: Filters
  sortBy: SortBy | undefined
}

const RowActions = (props: RowActionsProps) => {
  const { row, filters, sortBy } = props

  const { hasPermission, user } = useHasPermission({ permission: Permission.MEMBERS_DELETE })
  const [updateUser, { loading }] = useUpdateUserMutation({
    refetchQueries: [
      {
        query: GetUsersDocument,
        variables: { filters, sortBy },
      },
    ],
  })

  const handleRemoveFromOrganization = async (userId: string) => {
    await updateUser({
      variables: {
        userInput: {
          id: userId,
          organizationId: null,
        },
      },
    })
  }

  if (hasPermission && user?.id !== row.original.id) {
    return (
      <Tooltip label={'Remove from organization'} position='left'>
        <ActionIcon
          onClick={() => handleRemoveFromOrganization(row.original.id)}
          variant='transparent'
          color='black'
          loading={loading}
        >
          <IconUserX />
        </ActionIcon>
      </Tooltip>
    )
  } else if (user?.id === row.original.id) {
    return (
      <Tooltip label={'Leave organization'} position='left'>
        <ActionIcon
          onClick={() => handleRemoveFromOrganization(row.original.id)}
          variant='transparent'
          color='black'
          loading={loading}
        >
          <IconDoorExit />
        </ActionIcon>
      </Tooltip>
    )
  } else {
    return null
  }
}
