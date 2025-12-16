import {
  GetUsersQuery,
  Role,
  useGetUsersQuery,
  useGetUsersLazyQuery,
  useImpersonateUserMutation,
  useMakeUserAdminMutation,
  useUnmakeUserAdminMutation,
} from '@queries'
import { useMemo, useState } from 'react'
import Session from 'supertokens-auth-react/recipe/session'
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_Row,
  MRT_SortingState,
  useMantineReactTable,
} from 'mantine-react-table'
import { ActionIcon, Button, Card, Group, Pagination, ScrollArea, Select, Tooltip, Text, Center } from '@mantine/core'
import { IconUserBolt, IconUserStar, IconUserCancel } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { Loading, TruncatedTextWithTooltip } from '@components'
import { capitalizeFirstLetter } from '@lib'
import { downloadCSV } from 'lib/uiUtils/csvExport'
import { StatsCard } from '../StatsCard/StatsCard'

type User = NonNullable<GetUsersQuery['users']['items']>[number]

export const AdminUserTable = () => {
  const navigate = useNavigate()
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [downloadLoading, setDownloadLoading] = useState(false)

  // Add the lazy query hook at the top level
  const [fetchUsersForCSV] = useGetUsersLazyQuery()

  const getSortingVariables = () => {
    if (!sorting.length) return undefined
    const [sort] = sorting

    // Don't modify the field path, send it as is to match the backend mapping
    return {
      [sort.desc ? 'dsc' : 'asc']: sort.id,
    }
  }

  const getFilterVariables = () => {
    if (!columnFilters.length) return undefined

    interface FilterAccumulator {
      contains: Record<string, unknown>
      equal: Record<string, unknown>
    }

    const filters = columnFilters.reduce<FilterAccumulator>(
      (acc, filter) => {
        const fieldName = filter.id.split('.').pop() || filter.id
        return {
          ...acc,
          equal: acc.equal, // Maintain the equal object
          contains: {
            ...acc.contains,
            [fieldName]: filter.value,
          },
        }
      },
      { contains: {}, equal: {} },
    )

    // Only return non-empty filter objects
    const result: Record<string, Record<string, unknown>> = {}
    if (Object.keys(filters.contains).length > 0) {
      result.contains = filters.contains
    }
    if (Object.keys(filters.equal).length > 0) {
      result.equal = filters.equal
    }

    return Object.keys(result).length > 0 ? result : undefined
  }

  const { data, loading, error, refetch } = useGetUsersQuery({
    variables: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      sortBy: getSortingVariables(),
      filterBy: getFilterVariables(),
    }
  })

  const [impersonate, { loading: impersonateLoading, error: impersonateError }] = useImpersonateUserMutation()
  const [makeAdmin, { loading: makeAdminLoading, error: makeAdminError }] = useMakeUserAdminMutation()

  const [unmakeAdmin, { loading: unmakeAdminLoading, error: unmakeAdminError }] = useUnmakeUserAdminMutation()

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        visibleInShowHideMenu: true,
        enableHiding: true,
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
        accessorKey: 'lastLogin',
        header: 'Last Login',
        Cell: ({ cell }) => {
          const v = cell.getValue<string | null>()
          if (!v) return 'Never'
          const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' })
          return formatter.format(new Date(v))
        },
      },
      {
        accessorKey: 'roles',
        header: 'Roles',
        filterVariant: 'select',
        mantineFilterSelectProps: {
          data: Object.values(Role).map((role) => ({
            value: role,
            label: capitalizeFirstLetter(role.toLowerCase()),
          })),
        },
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
    await refetch()
  }

  const handleDownloadUsersCSV = () =>
    downloadCSV<User>(
      setDownloadLoading,
      () =>
        fetchUsersForCSV({
          variables: {
            limit: 2000,
            offset: 0,
            sortBy: getSortingVariables(),
            filterBy: getFilterVariables(),
          },
        }).then((result) => ({
          data: result.data?.users ? { items: result.data.users.items ?? [], count: result.data.users.count } : null,
          error: result.error,
        })),
      (items) =>
        items.map((item) => ({
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          timeJoined: new Date(item.timeJoined).toLocaleDateString(),
          roles: item.roles?.map((role) => capitalizeFirstLetter(role.toLowerCase())).join(', ') || '',
          organization: item.organization?.name || '',
        })),
      'users_export.csv',
      'users',
    )

  const rowData = useMemo(() => data?.users.items || [], [data])
  const totalRowCount = useMemo(() => data?.users.count || 0, [data])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: totalRowCount,
    enablePagination: false,
    enableGlobalFilter: false,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderTopToolbarCustomActions: ({ table }) => {
      return (
        <div style={{ gap: '8px', display: 'flex', alignItems: 'center' }}>
          <Button loading={downloadLoading} onClick={handleDownloadUsersCSV}>
            Download CSV
          </Button>
        </div>
      )
    },
    renderRowActions: ({ row }) => {
      const isAdmin = row.original.roles?.includes(Role.ADMIN)
      let adminButton
      if (isAdmin) {
        adminButton = (
          <Tooltip label={'Revoke Admin Rights'} position='left'>
            <ActionIcon
              onClick={async () => {
                await unmakeAdmin({ variables: { userId: row.original.id } })
                await refetch()
              }}
              variant='transparent'
              color='black'
              loading={unmakeAdminLoading}
            >
              <IconUserCancel />
            </ActionIcon>
          </Tooltip>
        )
      } else {
        adminButton = (
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
        )
      }
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
          {adminButton}
        </Group>
      )
    },
    mantineToolbarAlertBannerProps:
      error || impersonateError || makeAdminError || unmakeAdminError
        ? {
          color: 'red',
          children: `An error occurred. Please try again. If the problem persists, contact support at office@gbdi.io. Error: ${(error || impersonateError || makeAdminError)?.message}`,
        }
        : undefined,
    state: {
      isLoading: loading,
      showAlertBanner: !!error || !!impersonateError || !!makeAdminError || !!unmakeAdminError,
      showSkeletons: loading,
      pagination,
      sorting,
      columnFilters,
    },
    initialState: { columnVisibility: { id: false, timeJoined: false } },
    onPaginationChange: (newPagination) => {
      if (typeof newPagination === 'function') {
        setPagination((prevPagination) => newPagination(prevPagination))
      } else {
        setPagination(newPagination)
      }
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  })

  return (
    <div data-testid='AdminUserTable'>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        {loading ? (
          <Center style={{ flex: 1, marginBlock: '8px' }}>
            <Loading />
          </Center>
        ) : (
          <>
            <StatsCard title="Total Users" value={data?.users.count || 0} />
            <StatsCard title="Active Last 30 Days" value={data?.users.statistics.activeLast30Days || 0} />
            <StatsCard title="Active Last 60 Days" value={data?.users.statistics.activeLast60Days || 0} />
            <StatsCard title="Active Last 90 Days" value={data?.users.statistics.activeLast90Days || 0} />
          </>
        )}
      </div>

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
        <div>
          Total: {totalRowCount} {totalRowCount === 1 ? 'item' : 'items'}
        </div>
      </Group>
    </div>
  )
}
