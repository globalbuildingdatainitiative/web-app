import { useGetContributionsQuery, GetContributionsQuery } from '@queries'
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
  MRT_PaginationState,
  MRT_SortingState,
  MRT_ColumnFiltersState,
} from 'mantine-react-table'
import React, { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Group, Select, Pagination, Text, Tooltip } from '@mantine/core'

interface TruncatedTextWithTooltipProps {
  text: string
  maxLength?: number
}

export const TruncatedTextWithTooltip: React.FC<TruncatedTextWithTooltipProps> = ({ text, maxLength = 25 }) => {
  const isTruncated = text.length > maxLength
  const truncatedText = isTruncated ? `${text.substring(0, maxLength)}...` : text

  if (!text) {
    return <Text>N/A</Text>
  }

  return isTruncated ? (
    <Tooltip
      label={text}
      position='top'
      withArrow
      styles={{
        tooltip: {
          backgroundColor: '#fff',
          color: '#333',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '10px',
        },
      }}
    >
      <Text style={{ cursor: 'pointer' }}>{truncatedText}</Text>
    </Tooltip>
  ) : (
    <Text>{text}</Text>
  )
}

export const ContributionTable: React.FC = () => {
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

    const filters = columnFilters.reduce(
      (acc, filter) => {
        // Strip any nested path indicators
        const fieldName = filter.id.split('.').pop() || filter.id
        return {
          contains: {
            ...acc.contains,
            [fieldName]: filter.value,
          },
        }
      },
      { contains: {} },
    )

    return filters
  }

  const { loading, error, data } = useGetContributionsQuery({
    variables: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      sortBy: getSortingVariables(),
      filterBy: getFilterVariables(),
    },
    fetchPolicy: 'network-only',
  })

  type ContributionItems = NonNullable<GetContributionsQuery['contributions']['items']>[number]

  const columns = useMemo<MRT_ColumnDef<ContributionItems>[]>(
    () => [
      {
        accessorKey: 'project.name',
        header: 'Project Name',
        enableSorting: true,
        enableColumnFilter: true,
        Cell: ({ cell }) => {
          const project_name = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={project_name} />
        },
      },
      {
        accessorKey: 'project.location.countryName',
        header: 'Country',
        enableSorting: true,
        enableColumnFilter: true,
        Cell: ({ cell }) => {
          const country = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={country} />
        },
      },
      {
        accessorKey: 'project.projectInfo.buildingType',
        header: 'Building Type',
        enableSorting: true,
        enableColumnFilter: true,
        Cell: ({ cell }) => {
          const rawValue = cell.getValue<string>() || 'N/A'
          const formattedValue = rawValue.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
          return <Text>{formattedValue}</Text>
        },
      },
      {
        accessorFn: (row) => `${row.user?.firstName ?? 'N/A'} ${row.user?.lastName ?? 'N/A'}`,
        header: 'User',
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
        enableSorting: true,
        enableColumnFilter: true,
        Cell: ({ cell }) => <Text>{dayjs(cell.getValue<string>()).format('DD/MM/YYYY')}</Text>,
      },
      {
        accessorKey: 'public',
        header: 'Public',
        enableSorting: true,
        enableColumnFilter: true,
        Cell: ({ cell }) => <Text>{cell.getValue<boolean>() ? 'Yes' : 'No'}</Text>,
      },
      {
        accessorKey: 'project.lifeCycleStages',
        header: 'Life Cycle Stages',
        Cell: ({ cell }) => {
          const stages = cell.getValue<string[]>() || []
          const displayText = stages.length > 0 ? stages.join(', ') : 'N/A'
          return <TruncatedTextWithTooltip text={displayText.toUpperCase()} />
        },
      },
      {
        accessorKey: 'project.impactCategories',
        header: 'Impact Categories',
        Cell: ({ cell }) => {
          const categories = cell.getValue<string[]>() || []
          const displayText = categories.length > 0 ? categories.join(', ') : 'N/A'
          return <TruncatedTextWithTooltip text={displayText.toUpperCase()} />
        },
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
