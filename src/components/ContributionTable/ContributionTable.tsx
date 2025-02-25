import {
  GetContributionsForHeaderDocument,
  GetContributionsQuery,
  useDeleteContributionsMutation,
  useGetContributionsQuery,
  useUpdateContributionsMutation,
} from '@queries'
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_Row,
  MRT_RowSelectionState,
  MRT_SortingState,
  MRT_TableOptions,
  useMantineReactTable,
} from 'mantine-react-table'
import 'mantine-react-table/styles.css'
import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { ActionIcon, Button, Group, MantineSize, Pagination, ScrollArea, Select, Text, Tooltip } from '@mantine/core'
import { ViewProjectDetails } from './viewProjectDetails.tsx'
import { useViewportSize } from '@mantine/hooks'
import { IconCircleCheck, IconCircleX, IconEdit, IconTrash } from '@tabler/icons-react'
import { useUserContext } from '@context'

interface TruncatedTextWithTooltipProps {
  text: string
  maxLength?: number
  size?: MantineSize
}

export const TruncatedTextWithTooltip = ({ text, maxLength = 25, size = 'md' }: TruncatedTextWithTooltipProps) => {
  const isTruncated = text.length > maxLength
  const truncatedText = isTruncated ? `${text.substring(0, maxLength)}...` : text

  if (!text) {
    return <Text size={size}>N/A</Text>
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
      <Text style={{ cursor: 'pointer' }} size={size}>
        {truncatedText}
      </Text>
    </Tooltip>
  ) : (
    <Text size={size}>{text}</Text>
  )
}

export const ContributionTable = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 20 })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const { width: viewportWidth } = useViewportSize()
  const [columnVisibility, setColumnVisibility] = useState({})
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const shouldHideColumns = viewportWidth < window.screen.width
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({})
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false)
  const { user } = useUserContext()

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

  const { loading, error, data, refetch } = useGetContributionsQuery({
    variables: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      sortBy: getSortingVariables(),
      filterBy: getFilterVariables(),
    },
    fetchPolicy: 'network-only',
  })
  const [deleteContributions, { error: deleteError }] = useDeleteContributionsMutation({
    refetchQueries: [{ query: GetContributionsForHeaderDocument }],
  })
  const [updateContributions, { error: updateError }] = useUpdateContributionsMutation()

  type ContributionItems = NonNullable<GetContributionsQuery['contributions']['items']>[number]

  const handleRowDelete = (row: MRT_Row<ContributionItems>) => {
    setConfirmDelete(row.id)
  }

  const handleConfirmDelete = async (row: MRT_Row<ContributionItems>, action: 'cancel' | 'accept') => {
    if (action === 'accept') {
      await deleteContributions({ variables: { contributions: [row.original.id] } })
      await refetch()
    }
    setConfirmDelete(null)
  }

  const handleRowSave: MRT_TableOptions<ContributionItems>['onEditingRowSave'] = async ({ values, table, row }) => {
    await updateContributions({
      variables: { contributions: [{ id: row.original.id, public: values.public === 'true' }] },
    })
    table.setEditingRow(null)
  }

  const handleBulkDelete = async () => {
    const selectedIds = Object.keys(rowSelection).map((index) => rowData[parseInt(index)].id)
    await deleteContributions({ variables: { contributions: selectedIds } })
    setRowSelection({})
    setShowBulkDeleteConfirm(false)
    await refetch()
  }

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
        accessorKey: 'project.location.countryName',
        header: 'Country',
        enableEditing: false,
        Cell: ({ cell }) => {
          const country = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={country} />
        },
      },
      {
        accessorKey: 'project.projectInfo.buildingType',
        header: 'Building Type',
        enableEditing: false,
        Cell: ({ cell }) => {
          const rawValue = cell.getValue<string>() || 'N/A'
          const formattedValue = rawValue.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
          return <Text>{formattedValue}</Text>
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
        editVariant: 'select',
        mantineEditSelectProps: {
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
        enableEditing: false,
        Cell: ({ cell }) => {
          const stages = cell.getValue<string[]>() || []
          const displayText = stages.length > 0 ? stages.join(', ') : 'N/A'
          return <TruncatedTextWithTooltip text={displayText.toUpperCase()} />
        },
      },
      {
        accessorKey: 'project.impactCategories',
        header: 'Impact Categories',
        enableEditing: false,
        Cell: ({ cell }) => {
          const categories = cell.getValue<string[]>() || []
          const displayText = categories.length > 0 ? categories.join(', ') : 'N/A'
          return <TruncatedTextWithTooltip text={displayText.toUpperCase()} />
        },
      },
      {
        id: 'projectDetails',
        header: 'View Details',
        enableEditing: false,
        Cell: ({ row }) => <ViewProjectDetails contributionId={row.original.id} />,
      },
    ],
    [],
  )

  const handleRowSelection = (row: MRT_Row<ContributionItems>) => {
    return row.original.user?.organization?.id === user?.organization?.id
  }

  useEffect(() => {
    if (shouldHideColumns) {
      setColumnVisibility({
        id: false,
        'project.projectInfo.buildingType': false,
        public: false,
        'project.lifeCycleStages': false,
        'project.impactCategories': false,
      })
    } else {
      setColumnVisibility({ id: false })
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
    editDisplayMode: 'row',
    enableEditing: true,
    onEditingRowSave: handleRowSave,
    enableColumnActions: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    enableRowSelection: handleRowSelection,
    enableMultiRowSelection: true,
    enableSelectAll: true,
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => {
      const selectedRows = table.getSelectedRowModel().rows

      if (selectedRows.length === 0) return null

      if (showBulkDeleteConfirm) {
        return (
          <Group>
            <Text>Delete {selectedRows.length} selected contributions?</Text>
            <ActionIcon onClick={() => setShowBulkDeleteConfirm(false)} variant='transparent' color='red'>
              <IconCircleX />
            </ActionIcon>
            <ActionIcon onClick={handleBulkDelete} variant='transparent' color='green'>
              <IconCircleCheck />
            </ActionIcon>
          </Group>
        )
      }

      return (
        <Button color='red' onClick={() => setShowBulkDeleteConfirm(true)} leftSection={<IconTrash size={16} />}>
          Delete {selectedRows.length} Selected
        </Button>
      )
    },
    renderRowActions: ({ row, table }) => {
      if (confirmDelete === row.id) {
        return (
          <Group>
            <ActionIcon onClick={() => handleConfirmDelete(row, 'cancel')} variant='transparent' color='red'>
              <IconCircleX />
            </ActionIcon>
            <ActionIcon onClick={() => handleConfirmDelete(row, 'accept')} variant='transparent' color='green'>
              <IconCircleCheck />
            </ActionIcon>
          </Group>
        )
      }
      return (
        <Group>
          <ActionIcon onClick={() => table.setEditingRow(row)} variant='transparent' color='black'>
            <IconEdit />
          </ActionIcon>
          <ActionIcon onClick={() => handleRowDelete(row)} variant='transparent' color='black'>
            <IconTrash />
          </ActionIcon>
        </Group>
      )
    },
    mantineToolbarAlertBannerProps:
      error || deleteError || updateError
        ? {
            color: 'red',
            children: `An error occurred. Please try again. If the problem persists, contact support at office@gbdi.io. Error: ${error?.message || deleteError?.message || updateError?.message}`,
          }
        : undefined,
    state: {
      isLoading: loading,
      showAlertBanner: !(!error || !deleteError || !updateError),
      showSkeletons: false,
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
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
    onRowSelectionChange: setRowSelection,
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
