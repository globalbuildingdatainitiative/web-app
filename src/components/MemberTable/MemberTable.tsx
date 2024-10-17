import { useGetUsersQuery, useUpdateUserMutation } from '@queries'
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table'
import React, { useMemo } from 'react'
import { useUserContext } from '@context'
import { Button } from '@mantine/core'
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

  const {
    loading: loadingUsers,
    error: errorUsers,
    data: usersData,
    refetch: refetchUsers,
  } = useGetUsersQuery({
    variables: {
      filters: {
        organizationId: {
          equal: organizationId,
        },
      },
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
        accessorKey: 'role',
        header: 'Role',
        size: 100,
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
      },
    ]
  }, [currentUserId, currentUserRole, updateUser, navigate, refetchUsers])

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
