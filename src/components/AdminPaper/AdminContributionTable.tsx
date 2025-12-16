import { GetContributionsQuery, useGetContributionsQuery, useGetContributionsLazyQuery } from '@queries'
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  useMantineReactTable,
} from 'mantine-react-table'
import 'mantine-react-table/styles.css'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Button, Center, Group, Loader, Pagination, ScrollArea, Select, Text } from '@mantine/core'
import { Loading, TruncatedTextWithTooltip } from '@components'
import { downloadCSV } from 'lib/uiUtils/csvExport'
import { StatsCard } from '../StatsCard/StatsCard'

export const AdminContributionTable = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [downloadLoading, setDownloadLoading] = useState(false)

  // Add the lazy query hook at the top level
  const [fetchContributionsForCSV] = useGetContributionsLazyQuery()

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

        if (fieldName === 'public') {
          return {
            ...acc,
            equal: {
              ...acc.equal,
              [fieldName]: filter.value === 'true',
            },
            contains: acc.contains, // Maintain the contains object
          }
        }

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

  const { loading, error, data } = useGetContributionsQuery({
    variables: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      sortBy: getSortingVariables(),
      filterBy: getFilterVariables(),
    },
    fetchPolicy: 'network-only',
    onError: (err) => {
      alert(
        `An error occurred while fetching contributions. Please try again. If the problem persists, contact support at office@gbdi.io. Error: ${err.message}`,
      )
    },
  })

  type ContributionItems = NonNullable<GetContributionsQuery['contributions']['items']>[number]

  const handleDownloadContributionsCSV = () =>
    downloadCSV<ContributionItems>(
      setDownloadLoading,
      () =>
        fetchContributionsForCSV({
          variables: {
            limit: 2500,
            offset: 0,
            sortBy: getSortingVariables(),
            filterBy: getFilterVariables(),
          },
        }).then((result) => ({
          data: result.data?.contributions
            ? { items: result.data.contributions.items ?? [], count: result.data.contributions.count }
            : null,
          error: result.error,
        })),
      (items) =>
        items.map((item) => ({
          id: item.id,
          projectName: item.project?.name || 'N/A',
          user: `${item.user?.firstName ?? 'N/A'} ${item.user?.lastName ?? 'N/A'}`,
          uploadedAt: dayjs(item.uploadedAt).format('DD/MM/YYYY'),
          public: item.public ? 'Yes' : 'No',
          organization: item.user?.organization?.name || '',
        })),
      'contributions_export.csv',
      'contributions',
    )

  const columns = useMemo<MRT_ColumnDef<ContributionItems>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
      },
      {
        accessorKey: 'project.name',
        header: 'Project Name',
        enableEditing: false,
        Cell: ({ cell }) => {
          const project_name = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={project_name} />
        },
      },
      {
        accessorFn: (row) => `${row.user?.firstName ?? 'N/A'} ${row.user?.lastName ?? 'N/A'}`,
        header: 'User',
        enableEditing: false,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          const firstName = row.original.user?.firstName ?? 'N/A'
          const lastName = row.original.user?.lastName ?? 'N/A'
          return <TruncatedTextWithTooltip text={`${firstName} ${lastName}`} />
        },
      },
      {
        accessorKey: 'uploadedAt',
        header: 'Date',
        enableEditing: false,
        Cell: ({ cell }) => <Text>{dayjs(cell.getValue<string>()).format('DD/MM/YYYY')}</Text>,
      },
      {
        accessorKey: 'public',
        header: 'Public',
        filterVariant: 'select',
        mantineFilterSelectProps: {
          data: [
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' },
          ],
        },
        Cell: ({ cell }) => <Text>{cell.getValue<boolean>() ? 'Yes' : 'No'}</Text>,
      },
      {
        accessorKey: 'user.organization.name',
        header: 'Organization',
      },
    ],
    [],
  )

  const rowData = useMemo(() => data?.contributions.items || [], [data])
  const totalRowCount = useMemo(() => data?.contributions.count || 0, [data])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: totalRowCount,
    pageCount: Math.ceil(totalRowCount / pagination.pageSize),
    enablePagination: false,
    enableGlobalFilter: false,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    enableColumnActions: true,
    renderTopToolbarCustomActions: ({ table }) => {
      return (
        <div style={{ gap: '8px', display: 'flex', alignItems: 'center' }}>
          <Button loading={downloadLoading} onClick={handleDownloadContributionsCSV}>
            Download CSV
          </Button>
        </div>
      )
    },
    mantineToolbarAlertBannerProps: error
      ? {
          color: 'red',
          children: error?.message,
        }
      : undefined,
    initialState: { columnVisibility: { id: false } },
    state: {
      isLoading: loading,
      showAlertBanner: !!error,
      showSkeletons: false,
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
    <div data-testid='ContributionTable'>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        {loading ? (
          <Center style={{ flex: 1, marginBlock: '8px' }}>
            <Loading />
          </Center>
        ) : (
          <>
            <StatsCard title="Total Contributions" value={data?.contributions.count || 0} />
            <StatsCard title="Public" value={data?.contributions.publicCount || 0} />
            <StatsCard title="Private" value={data?.contributions.privateCount || 0} />
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
