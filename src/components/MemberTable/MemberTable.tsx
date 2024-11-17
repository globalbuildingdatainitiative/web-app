import { useGetUsersQuery, useUpdateUserMutation } from '@queries'
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
  MRT_ColumnFiltersState,
  MRT_SortingState,
} from 'mantine-react-table'
import React, { useMemo, useState } from 'react'
import { useUserContext } from '@context'
import { Button, Group, Pagination, ScrollArea, Select } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { theme } from '@components'

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

export const MemberTable: React.FC<MemberTableProps> = ({ organizationId }) => {
  const { user: currentUser } = useUserContext()
  const currentUserId = currentUser?.id
  const navigate = useNavigate()

  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])

  const getSortingVariables = () => {
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
  }

  const getFilterVariables = () => {
    if (!columnFilters.length) return undefined

    const filters: Record<string, { contains?: string; equal?: string; is_true?: boolean }> = {
      organizationId: { equal: organizationId },
    }

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
  }

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const {
    loading: loadingUsers,
    error: errorUsers,
    data: usersData,
    refetch: refetchUsers,
  } = useGetUsersQuery({
    variables: {
      filters: getFilterVariables(),
      sortBy: getSortingVariables(),
    },
  })

  const [updateUser] = useUpdateUserMutation()

  const getUserRole = (userId: string): string => {
    const user = rowData.find((row) => row.id === userId)
    return user ? user.role : 'Member'
  }

  const formatRole = (role: string | null | undefined): string => {
    if (!role) return 'N/A'
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
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
        role: formatRole(user.role),
      })) as Row[]
  }, [usersData])

  const currentUserRole = getUserRole(currentUserId)
  const totalRowCount = rowData.length

  const columns = useMemo<MRT_ColumnDef<Row>[]>(() => {
    const handleRemoveFromOrganization = async (userId: string) => {
      try {
        await updateUser({
          variables: {
            userInput: {
              id: userId,
              organizationId: null,
            },
          },
        })
        if (userId === currentUserId) {
          navigate('/organization/new')
        } else {
          refetchUsers()
          navigate('/organization')
        }
      } catch (error) {
        console.error('Error removing user from organization:', error)
      }
    }

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
      {
        accessorKey: 'action',
        header: '',
        Cell: ({ row }) => (
          <Button
            onClick={() => handleRemoveFromOrganization(row.original.id)}
            disabled={currentUserRole !== 'Owner' && row.original.id !== currentUserId}
            color={theme?.colors?.red?.[6]}
          >
            {row.original.id === currentUserId ? 'Leave Organization' : 'Remove from Organization'}
          </Button>
        ),
        size: 200,
        enableSorting: false,
        enableColumnFilter: false,
      },
    ]
  }, [currentUserId, currentUserRole, updateUser, navigate, refetchUsers])

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
