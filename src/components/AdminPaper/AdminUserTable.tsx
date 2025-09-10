import { GetUsersQuery, useGetUsersQuery, useImpersonateUserMutation, useMakeUserAdminMutation } from '@queries'
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
import { ActionIcon, Group, Pagination, ScrollArea, Select, Tooltip } from '@mantine/core'
import { IconUserBolt, IconUserStar } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { TruncatedTextWithTooltip } from '@components'
import { capitalizeFirstLetter } from '@lib'

type User = NonNullable<GetUsersQuery['users']['items']>[number]

export const AdminUserTable = () => {
  const navigate = useNavigate()
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])

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
        // const fieldName = filter.id.split('.').pop() || filter.id
        return {
          ...acc,
          equal: acc.equal, // Maintain the equal object
          contains: {
            ...acc.contains,
            data: filter.value,
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

  const { data, loading, error } = useGetUsersQuery({
    variables: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      sortBy: getSortingVariables(),
      filterBy: getFilterVariables(),
    },
  })

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
            children: `An error occurred. Please try again. If the problem persists, contact support at office@gbdi.io. Error: ${(error || impersonateError || makeAdminError)?.message}`,
          }
        : undefined,
    state: {
      isLoading: loading,
      showAlertBanner: !!error || !!impersonateError || !!makeAdminError,
      showSkeletons: loading,
      pagination,
      sorting,
      columnFilters,
    },
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
