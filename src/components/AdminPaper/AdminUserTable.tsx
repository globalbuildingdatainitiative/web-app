import { GetUsersQuery, useGetUsersQuery, useImpersonateUserMutation, useMakeUserAdminMutation } from '@queries'
import { useMemo } from 'react'
import Session from 'supertokens-auth-react/recipe/session'
import { MantineReactTable, MRT_ColumnDef, MRT_Row, useMantineReactTable } from 'mantine-react-table'
import { ActionIcon, Group, Tooltip } from '@mantine/core'
import { IconUserBolt, IconUserStar } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { TruncatedTextWithTooltip } from '@components'
import { capitalizeFirstLetter } from '@lib'

type User = NonNullable<GetUsersQuery['users']>[number]

export const AdminUserTable = () => {
  const navigate = useNavigate()
  const { data, loading, error } = useGetUsersQuery()
  const [impersonate, { loading: impersonateLoading, error: impersonateError }] = useImpersonateUserMutation()
  const [makeAdmin, { loading: makeAdminLoading, error: makeAdminError }] = useMakeUserAdminMutation({
    refetchQueries: ['getUsers'],
  })

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        Cell: ({ cell }) => <TruncatedTextWithTooltip size='sm' text={cell.getValue<string>()} maxLength={8} />,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        Cell: ({ row }) => (
          <TruncatedTextWithTooltip text={`${row.original.firstName} ${row.original.lastName}`} size='sm' />
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
        accessorKey: 'roles',
        header: 'Roles',
        Cell: ({ cell }) => (
          <TruncatedTextWithTooltip
            text={
              cell
                .getValue<string[]>()
                ?.map((role) => capitalizeFirstLetter(role.toLowerCase()))
                .join(', ') || ''
            }
            size='sm'
          />
        ),
      },
      {
        accessorKey: 'organization.name',
        header: 'Organization',
      },
    ],
    [],
  )

  const handleUserImpersonation = async (row: MRT_Row<User>) => {
    const { data } = await impersonate({ variables: { userId: row.original.id } })
    if (data?.impersonate === true) {
      const userId = await Session.getUserId()
      localStorage.setItem('userId', userId)
      navigate('/')
    }
  }

  const handleUserAdmin = async (row: MRT_Row<User>) => {
    await makeAdmin({ variables: { userId: row.original.id } })
  }

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
            <ActionIcon
              onClick={() => handleUserImpersonation(row)}
              variant='transparent'
              color='black'
              loading={impersonateLoading}
            >
              <IconUserBolt />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={'Make User Admin'} position='left'>
            <ActionIcon
              onClick={() => handleUserAdmin(row)}
              variant='transparent'
              color='black'
              loading={makeAdminLoading}
            >
              <IconUserStar />
            </ActionIcon>
          </Tooltip>
        </Group>
      )
    },
    mantineToolbarAlertBannerProps:
      error || impersonateError || makeAdminError
        ? {
            color: 'red',
            children: (error || impersonateError || makeAdminError)?.message,
          }
        : undefined,
    state: {
      isLoading: loading,
      showAlertBanner: !!error || !!impersonateError || !!makeAdminError,
      showSkeletons: loading,
    },
  })

  return (
    <div data-testid='AdminUserTable'>
      <MantineReactTable table={table} />
    </div>
  )
}
