import { GetUsersQuery, useGetUsersQuery, useImpersonateUserMutation } from '@queries'
import { useMemo } from 'react'
import { MantineReactTable, MRT_ColumnDef, MRT_Row, useMantineReactTable } from 'mantine-react-table'
import { ActionIcon, Group, Tooltip, Text } from '@mantine/core'
import { IconUserBolt, IconUserStar } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
type User = NonNullable<GetUsersQuery['users']>[number]

export const AdminUserTable = () => {
  const navigate = useNavigate()
  const { data, loading, error } = useGetUsersQuery()
  const [impersonate, { loading: impersonateLoading }] = useImpersonateUserMutation()

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        Cell: ({ cell }) => (
          <Text size='sm' truncate='end'>
            {cell.getValue<string>()}
          </Text>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Name',
        Cell: ({ row }) => (
          <Text size='sm' truncate='end'>
            {row.original.firstName} {row.original.lastName}
          </Text>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'timeJoined',
        header: 'Joined On',
        Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
      },
      {
        accessorKey: 'organization.name',
        header: 'Organization',
      },
    ],
    [],
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUserImpersonation = async (row: MRT_Row<User>) => {
    console.log('before', await Session.getUserId())
    const { data } = await impersonate({ variables: { userId: row.original.id } })
    if (data?.impersonate === true) {
      console.log('after', await Session.getUserId())
      debugger
      navigate('/')
    }
  }

  const handleUserAdmin = (row: MRT_Row<User>) => {}

  const rowData = useMemo(() => data?.users || [], [data])
  const totalRowCount = useMemo(() => data?.users.length || 0, [data])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: totalRowCount,
    enablePagination: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      return (
        <Group>
          <Tooltip label={'Impersonate User'} position='left'>
            <ActionIcon onClick={() => handleUserImpersonation(row)} variant='transparent' color='black' loading={impersonateLoading}>
              <IconUserBolt />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={'Make User Admin'} position='left'>
            <ActionIcon onClick={() => handleUserAdmin(row)} variant='transparent' color='black'>
              <IconUserStar />
            </ActionIcon>
          </Tooltip>
        </Group>
      )
    },
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
    <div data-testid='AdminUserTable'>
      <MantineReactTable table={table} />
    </div>
  )
}
