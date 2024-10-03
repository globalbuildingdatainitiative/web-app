import { useGetContributionsQuery, GetContributionsQuery } from '@queries'
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable, MRT_PaginationState } from 'mantine-react-table'
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

  const { loading, error, data } = useGetContributionsQuery({
    variables: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
    },
    fetchPolicy: 'network-only',
  })

  type ContributionItems = NonNullable<GetContributionsQuery['contributions']['items']>[number]

  const columns = useMemo<MRT_ColumnDef<ContributionItems>[]>(
    () => [
      {
        accessorKey: 'project.name',
        header: 'Project',
      },
      {
        accessorFn: (row) => `${row.user?.firstName ?? 'N/A'} ${row.user?.lastName ?? 'N/A'}`,
        header: 'User',
        Cell: ({ row }) => {
          const firstName = row.original.user?.firstName ?? 'N/A'
          const lastName = row.original.user?.lastName ?? 'N/A'
          return <Text>{`${firstName} ${lastName}`}</Text>
        },
      },
      {
        accessorKey: 'uploadedAt',
        header: 'Date',
        Cell: ({ cell }) => <Text>{dayjs(cell.getValue<string>()).format('DD/MM/YYYY')}</Text>,
      },
      {
        accessorKey: 'project.location.countryName',
        header: 'Country',
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
