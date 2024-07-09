import { Contribution, useGetContributionsQuery } from '@queries'
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table'
import { useEffect, useMemo } from 'react'
import dayjs from 'dayjs'

export const ContributionTable = () => {
  const { loading, error, data } = useGetContributionsQuery()

  useEffect(() => {
    if (data && data.contributions) {
      data.contributions.forEach((contribution) => {
        console.log('Country:', contribution.project?.location?.countryName)
      })
    }
  }, [data])

  const columns = useMemo<MRT_ColumnDef<Pick<Contribution, 'id'>>[]>(
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
        Cell: ({ cell }) => <>{dayjs(cell.getValue() as string).format('DD/MM/YYYY')}</>,
        size: 50,
      },
      {
        accessorKey: 'project.location.countryName',
        header: 'Country',
        size: 100,
      },
    ],
    [],
  )

  const rowData = useMemo(() => data?.contributions || [], [data])
  const totalRowCount = useMemo(() => data?.contributions.length || 0, [data])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: totalRowCount,
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
    },
  })
  return (
    <div data-testid='ContributionTable'>
      <MantineReactTable table={table} />
    </div>
  )
}
