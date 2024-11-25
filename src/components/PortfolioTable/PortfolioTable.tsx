import { Contribution, useGetProjectPortfolioQuery, Results, ImpactCategoryResults } from '@queries'
import {
  MantineReactTable,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  useMantineReactTable,
  type MRT_VisibilityState,
} from 'mantine-react-table'
import { useMemo, useState } from 'react'
import { Group, Pagination, Progress, Select, Text, Tooltip } from '@mantine/core'
import { TruncatedTextWithTooltip } from '@components'

export const PortfolioTable = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 20 })

  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>({
    name: true,
    'location.countryName': true,
    'projectInfo.buildingType': true,
    'softwareInfo.lcaSoftware': true,
    'metaData.source.name': true,
    'projectInfo.grossFloorArea.value': true,
    results: true,
    breakdown: true,

    'projectInfo.buildingCompletionYear': false,
    'projectInfo.buildingFootprint.value': false,
    'projectInfo.buildingHeight.value': false,
    'projectInfo.buildingMass.value': false,
    'projectInfo.buildingPermitYear': false,
    'projectInfo.buildingTypology': false,
    'projectInfo.buildingUsers': false,
    'projectInfo.floorsAboveGround': false,
    'projectInfo.floorsBelowGround': false,
    'projectInfo.generalEnergyClass': false,
    'projectInfo.heatedFloorArea.value': false,
    'projectInfo.roofType': false,
    'projectInfo.frameType': false,
  })

  const { loading, error, data } = useGetProjectPortfolioQuery({
    variables: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      filters: { gt: { 'projectInfo.grossFloorArea.value': 0 }, notEqual: { results: null } },
    },
    fetchPolicy: 'network-only',
  })
  const columns = useMemo<MRT_ColumnDef<Pick<Contribution, 'id'>>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Project Name',
        Cell: ({ cell }) => {
          const project_name = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={project_name} />
        },
        size: 100,
      },
      {
        accessorKey: 'location.countryName',
        header: 'Country',
        Cell: ({ cell }) => {
          const country = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={country} />
        },
        size: 150,
      },
      {
        accessorKey: 'projectInfo.buildingType',
        header: 'Building Type',
        Cell: ({ cell }) => {
          const rawValue = cell.getValue<string>() || 'N/A'
          const formattedValue = rawValue.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
          return <Text>{formattedValue}</Text>
        },
        size: 50,
      },
      {
        accessorKey: 'softwareInfo.lcaSoftware',
        header: 'LCA Software',
        Cell: ({ cell }) => {
          const software = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={software} />
        },
        size: 100,
      },
      {
        accessorKey: 'metaData.source.name',
        header: 'Source',
        Cell: ({ cell }) => {
          const source = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={source} />
        },
        size: 100,
      },
      {
        accessorKey: 'projectInfo.buildingCompletionYear',
        header: 'Completion Year',
        size: 50,
      },
      {
        accessorKey: 'projectInfo.buildingFootprint.value',
        header: 'Building Footprint (m²)',
        size: 50,
      },
      {
        accessorKey: 'projectInfo.buildingHeight.value',
        header: 'Building Height (m)',
        size: 50,
      },
      {
        accessorKey: 'projectInfo.buildingMass.value',
        header: 'Building Mass (kg)',
        size: 50,
      },
      {
        accessorKey: 'projectInfo.buildingPermitYear',
        header: 'Permit Year',
        size: 50,
      },
      {
        accessorKey: 'projectInfo.buildingTypology',
        header: 'Building Typology',
        size: 100,
      },
      {
        accessorKey: 'projectInfo.buildingUsers',
        header: 'Building Users',
        size: 50,
      },
      {
        accessorKey: 'projectInfo.floorsAboveGround',
        header: 'Floors Above Ground',
        size: 50,
      },
      {
        accessorKey: 'projectInfo.floorsBelowGround',
        header: 'Floors Below Ground',
        size: 50,
      },
      {
        accessorKey: 'projectInfo.generalEnergyClass',
        header: 'Energy Class',
        size: 50,
      },
      {
        accessorKey: 'projectInfo.heatedFloorArea.value',
        header: 'Heated Floor Area (m²)',
        Cell: ({ cell }) => {
          const value = cell.getValue<number>()
          return value ? value.toFixed(2) : 'N/A'
        },
        size: 50,
      },
      {
        accessorKey: 'projectInfo.roofType',
        header: 'Roof Type',
        Cell: ({ cell }) => {
          const roofType = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={roofType} />
        },
        size: 50,
      },
      {
        accessorKey: 'projectInfo.frameType',
        header: 'Frame Type',
        Cell: ({ cell }) => {
          const frameType = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={frameType} />
        },
        size: 50,
      },
      {
        accessorKey: 'projectInfo.grossFloorArea.value',
        header: 'Gross Floor Area (m²)',
        size: 50,
      },
      {
        accessorKey: 'results',
        Cell: getGWPIntensity,
        header: 'GWP Intensity (kgCO₂eq/m²)',
        size: 50,
      },
      {
        accessorKey: 'breakdown',
        Cell: getGWPBreakdown,
        header: 'GWP by Life Cycle Stage',
        grow: true,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnActions: false,
      },
    ],
    [],
  )

  const rowData = useMemo(() => data?.projects.items || [], [data])
  const totalRowCount = useMemo(() => data?.projects.count || 0, [data])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: totalRowCount,
    pageCount: Math.ceil(totalRowCount / pagination.pageSize),
    enablePagination: false,
    enableGlobalFilter: false,
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
      columnVisibility,
    },
    onPaginationChange: (newPagination) => {
      if (typeof newPagination === 'function') {
        setPagination((prevPagination) => newPagination(prevPagination))
      } else {
        setPagination(newPagination)
      }
    },
    enableStickyHeader: true,
    onColumnVisibilityChange: setColumnVisibility,
    mantineTableContainerProps: {
      style: {
        maxWidth: '100%',
        overflowX: 'auto',
      },
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

interface GWPIntensity {
  cell: MRT_Cell<Pick<Contribution, 'id'>, unknown>
  row: MRT_Row<Pick<Contribution, 'id'>>
}

const getGWPIntensity = ({ cell, row }: GWPIntensity) => {
  const gwp = cell.getValue<Results | null>()?.gwp || ({} as ImpactCategoryResults)
  const footprint = row.getValue('projectInfo.grossFloorArea.value') as number
  if (!gwp) return null
  const total = gwp.total!

  return <>{Number(total / footprint).toFixed(2)}</>
}

const getGWPBreakdown = ({ row }: GWPIntensity) => {
  const gwp = row.getValue<Results | null>('results')?.gwp
  if (!gwp) return null
  const total = gwp.total!

  return (
    <Progress.Root size={40}>
      {Object.entries(gwp)
        .filter(([key, value]) => value && ['__typename', 'total'].indexOf(key) < 0)
        .map(([key, value]) => (
          <Tooltip label={`${key.toUpperCase()}: ${Number(((value as number) / total) * 100).toFixed(2)}%`}>
            <Progress.Section value={((value as number) / total) * 100} color={lifeCycleStageMap[key]}>
              <Progress.Label>{key.toUpperCase()}</Progress.Label>
            </Progress.Section>
          </Tooltip>
        ))}
    </Progress.Root>
  )
}

const lifeCycleStageMap: { [key: string]: string } = {
  a0: 'green.2',
  a1a3: 'blue.2',
  a4: 'yellow.2',
  a5: 'grape.2',
  b1: 'green.4',
  b2: 'blue.4',
  b3: 'yellow.4',
  b4: 'grape.4',
  b5: 'green.6',
  b6: 'blue.6',
  b7: 'yellow.6',
  b8: 'grape.6',
  c1: 'green.8',
  c2: 'blue.8',
  c3: 'yellow.8',
  c4: 'grape.8',
  d: 'green.9',
}
