import { useMemo, useState } from 'react'
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  useMantineReactTable,
} from 'mantine-react-table'
import { GetOrganizationsQuery, useGetOrganizationsQuery } from '@queries'
import { Group, Pagination, ScrollArea, Select } from '@mantine/core'
import { formatEnumValue } from '@lib'

type Organization = NonNullable<GetOrganizationsQuery['organizations']['items']>[number]

export const AdminOrganizationTable = () => {
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

  const { data, loading, error } = useGetOrganizationsQuery({
    variables: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      sortBy: getSortingVariables(),
      filterBy: getFilterVariables(),
    },
    onError: (err) => {
      alert(
        `An error occurred while fetching organizations. Please try again. If the problem persists, contact support at office@gbdi.io. Error: ${err.message}`,
      )
    },
  })

  const columns = useMemo<MRT_ColumnDef<Organization>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'country',
        header: 'Country',
      },
      {
        id: 'metaData.stakeholders',
        accessorFn: (row) => row?.metaData?.stakeholders.map((stakeholder) => formatEnumValue(stakeholder)).join(', '),
        header: 'Stakeholder Type',
      },
    ],
    [],
  )

  const rowData = useMemo(() => data?.organizations.items || [], [data])
  const totalRowCount = useMemo(() => data?.organizations.count || 0, [data])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: totalRowCount,
    enablePagination: false,
    enableGlobalFilter: false,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
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
    <div data-testid='AdminOrganizationTable'>
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
