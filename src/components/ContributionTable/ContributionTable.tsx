import { GetContributionsQuery, useGetContributionsQuery } from '@queries'
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  useMantineReactTable,
} from 'mantine-react-table'
import 'mantine-react-table/styles.css'
import React, { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Group, Pagination, ScrollArea, Select, Text, Tooltip } from '@mantine/core'
import { ViewProjectDetails } from './viewProjectDetails.tsx'
import { useViewportSize } from '@mantine/hooks'

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
  const { width: viewportWidth } = useViewportSize()
  const [columnVisibility, setColumnVisibility] = useState({})
  const shouldHideColumns = viewportWidth < window.screen.width

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
  })

  type ContributionItems = NonNullable<GetContributionsQuery['contributions']['items']>[number]

  const columns = useMemo<MRT_ColumnDef<ContributionItems>[]>(
    () => [
      {
        accessorKey: 'project.name',
        header: 'Project Name',
        Cell: ({ cell }) => {
          const project_name = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={project_name} />
        },
      },
      {
        accessorKey: 'project.location.countryName',
        header: 'Country',
        Cell: ({ cell }) => {
          const country = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={country} />
        },
      },
      {
        accessorKey: 'project.projectInfo.buildingType',
        header: 'Building Type',
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
      {
        id: 'projectDetails',
        header: 'View Details',
        Cell: ({ row }) => <ViewProjectDetails contributionId={row.original.id} />,
      },
    ],
    [],
  )

  useEffect(() => {
    if (shouldHideColumns) {
      setColumnVisibility({
        'project.projectInfo.buildingType': false,
        public: false,
        'project.lifeCycleStages': false,
        'project.impactCategories': false,
      })
    } else {
      setColumnVisibility({})
    }
  }, [shouldHideColumns])

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
      columnVisibility,
    },
    onPaginationChange: (newPagination) => {
      if (typeof newPagination === 'function') {
        setPagination((prevPagination) => newPagination(prevPagination))
      } else {
        setPagination(newPagination)
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  })

  return (
    <div data-testid='ContributionTable'>
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
