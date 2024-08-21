import { useGetContributionsQuery, useGetCurrentUserLazyQuery } from '@queries'
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable, MRT_PaginationState } from 'mantine-react-table'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Group, Select, Pagination, Text } from '@mantine/core'

type ContributionItem = {
  __typename?: 'Contribution'
  id: string
  uploadedAt: string
  userId: string
  project: {
    __typename?: 'Project'
    name: string
    location: {
      __typename?: 'Location'
      countryName: string
    }
  }
}

export const ContributionTable: React.FC = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [userNames, setUserNames] = useState<Record<string, string>>({})
  const [fetchingUsers, setFetchingUsers] = useState<Set<string>>(new Set())

  const { loading, error, data } = useGetContributionsQuery({
    variables: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
    },
    fetchPolicy: 'network-only',
  })

  const [getUserDetails] = useGetCurrentUserLazyQuery()

  const fetchUserName = useCallback(
    async (userId: string) => {
      if (!userNames[userId] && !fetchingUsers.has(userId)) {
        setFetchingUsers((prev) => new Set(prev).add(userId))
        try {
          const result = await getUserDetails({ variables: { id: userId } })
          if (result.data?.users[0]) {
            const userName = `${result.data.users[0].firstName} ${result.data.users[0].lastName}`
            setUserNames((prev) => ({
              ...prev,
              [userId]: userName,
            }))
          } else {
            setUserNames((prev) => ({
              ...prev,
              [userId]: 'User not found',
            }))
          }
        } catch (error) {
          setUserNames((prev) => ({
            ...prev,
            [userId]: 'Error fetching user',
          }))
        } finally {
          setFetchingUsers((prev) => {
            const newSet = new Set(prev)
            newSet.delete(userId)
            return newSet
          })
        }
      }
    },
    [getUserDetails, userNames, fetchingUsers],
  )

  useEffect(() => {
    if (data?.contributions.items) {
      data.contributions.items.forEach((contribution) => {
        fetchUserName(contribution.userId)
      })
    }
  }, [data, fetchUserName])

  const columns = useMemo<MRT_ColumnDef<ContributionItem>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'project.name',
        header: 'Project',
        size: 300,
      },
      {
        accessorKey: 'uploadedAt',
        header: 'Date',
        Cell: ({ cell }) => <Text>{dayjs(cell.getValue<string>()).format('DD/MM/YYYY')}</Text>,
        size: 50,
      },
      {
        accessorFn: (row) => userNames[row.userId] || 'Loading...',
        header: 'User',
        size: 150,
        Cell: ({ row }) => {
          const userName = userNames[row.original.userId]
          return <Text>{userName || (fetchingUsers.has(row.original.userId) ? 'Loading...' : 'N/A')}</Text>
        },
      },
      {
        accessorKey: 'project.location.countryName',
        header: 'Country',
        size: 100,
      },
    ],
    [userNames, fetchingUsers],
  )

  const rowData = useMemo(() => data?.contributions.items || [], [data])
  const totalRowCount = useMemo(() => data?.contributions.count || 0, [data])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: totalRowCount,
    pageCount: Math.ceil(totalRowCount / pagination.pageSize),
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineToolbarAlertBannerProps: error
      ? {
          color: 'red',
          children: error.message,
        }
      : undefined,
    state: {
      isLoading: loading,
      showAlertBanner: !!error,
      showSkeletons: false,
      pagination,
    },
    onPaginationChange: (newPagination) => {
      if (typeof newPagination === 'function') {
        setPagination((prevPagination) => newPagination(prevPagination))
      } else {
        setPagination(newPagination)
      }
    },
  })

  return (
    <div data-testid='ContributionTable'>
      <MantineReactTable table={table} />
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
