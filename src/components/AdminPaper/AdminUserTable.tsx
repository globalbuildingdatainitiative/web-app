import { GetUsersQuery, useGetUsersQuery } from '@queries'
import { useMemo } from 'react'
import { MantineReactTable, MRT_ColumnDef, MRT_Row, useMantineReactTable } from 'mantine-react-table'
import { ActionIcon, Group, Tooltip, Text } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'

type User = NonNullable<GetUsersQuery['users']>[number]

export const AdminUserTable = () => {
  const { data, loading, error } = useGetUsersQuery()

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
  const handleUserImpersonation = (row: MRT_Row<User>) => {}

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
            <ActionIcon onClick={() => handleUserImpersonation(row)} variant='transparent' color='black'>
              <IconUser />
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
