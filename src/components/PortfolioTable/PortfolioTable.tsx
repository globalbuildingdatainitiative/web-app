import {
  BuildingType,
  BuildingTypology,
  Contribution,
  Country,
  GeneralEnergyClass,
  ImpactCategoryResults,
  Results,
  RoofType,
  useGetProjectPortfolioQuery,
  useGetProjectPortfolioLazyQuery,
} from '@queries'
import {
  MantineReactTable,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_Row,
  MRT_SortingState,
  type MRT_VisibilityState,
  useMantineReactTable,
} from 'mantine-react-table'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { Group, Pagination, Progress, Select, Text, Tooltip, Button, Box } from '@mantine/core'
import { TruncatedTextWithTooltip } from '@components'
import { useViewportSize } from '@mantine/hooks'
import { IconDownload } from '@tabler/icons-react'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import { alpha3ToCountryName, snakeCaseToHumanCase } from '@lib'

interface PortfolioTableProps {
  columnVisibility: MRT_VisibilityState
  onColumnVisibilityChange: (visibility: MRT_VisibilityState) => void
  filters: object
  setFilters: Dispatch<SetStateAction<object>>
}

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
})

export const PortfolioTable = (props: PortfolioTableProps) => {
  const { columnVisibility, onColumnVisibilityChange, filters, setFilters } = props

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [fetchAllData, { loading: loadingExportingAll }] = useGetProjectPortfolioLazyQuery()

  const { width: viewportWidth } = useViewportSize()
  const shouldHideColumns = viewportWidth < window.screen.width

  const exportCsv = ({
    rows,
    onlyVisibleColumns = false,
  }: {
    rows: MRT_Row<Pick<Contribution, 'id'>>[]
    onlyVisibleColumns?: boolean
  }) => {
    // 1. Determine which columns to export (exclude 'breakdown' from CSV)
    let exportColumns = columns.filter((col) => col.accessorKey !== 'breakdown')
    if (onlyVisibleColumns) {
      exportColumns = exportColumns.filter((col) => columnVisibility[col.accessorKey as string])
    }

    // 2. Extract headers
    const headers = exportColumns.map((col) => col.header as string)

    // 3. Build row data with headers as object keys
    const rowData = rows.map((row) => {
      const rowObj: { [key: string]: string | number } = {}
      exportColumns.forEach((column, index) => {
        const header = headers[index]
        const value = row.getValue(column.accessorKey as string)

        if (column.accessorKey === 'results') {
          const results = value as Results | null
          const gwp = results?.gwp || {}
          const footprint = row.getValue('projectInfo.grossFloorArea.value') as number
          const total = gwp.total || 0
          rowObj[header] = footprint ? Number(total / footprint).toFixed(2) : 'N/A'
          return
        }

        if (value === null || value === undefined) {
          rowObj[header] = 'N/A'
          return
        }

        // Join building typology elements with commas and wrap in quotes
        if (column.accessorKey === 'projectInfo.buildingTypology' && Array.isArray(value)) {
          rowObj[header] = `"${value.join(', ')}"`
          return
        }

        if (typeof value === 'object') {
          // handle numeric sub-fields like "value"
          if ('value' in value) {
            rowObj[header] = (value as { value: number }).value
          } else {
            rowObj[header] = JSON.stringify(value)
          }
          return
        }

        rowObj[header] = typeof value === 'number' ? value : String(value)
      })
      return rowObj
    })

    const csvConfigWithHeader = {
      ...csvConfig,
      useKeysAsHeaders: true, // Enable automatic header generation
      filename: 'project_portfolio',
    }

    const csv = generateCsv(csvConfigWithHeader)(rowData)
    download(csvConfigWithHeader)(csv)
  }

  const handleExportAllData = async () => {
    try {
      const { data } = await fetchAllData({
        variables: {
          limit: null,
          offset: 0,
          filters,
          sortBy,
        },
        fetchPolicy: 'network-only',
      })

      // If the items array is missing or null, just return or handle it gracefully
      if (!data?.projects?.items) {
        console.warn('No items found to export')
        return
      }

      const allRows = data.projects.items.map((item) => ({
        id: item.id,
        getValue: (accessorKey: string) => {
          return accessorKey.split('.').reduce((acc: unknown, key: string) => {
            if (acc && typeof acc === 'object' && key in acc) {
              return (acc as Record<string, unknown>)[key]
            }
            return undefined
          }, item)
        },
      })) as unknown as MRT_Row<Pick<Contribution, 'id'>>[]

      exportCsv({
        rows: allRows,
        onlyVisibleColumns: false,
      })
    } catch (error) {
      console.error('Error exporting all data:', error)
    }
  }

  const handleExportVisibleData = (rows: MRT_Row<Pick<Contribution, 'id'>>[]) =>
    exportCsv({ rows, onlyVisibleColumns: true })

  const sortBy = useMemo(() => {
    if (!sorting.length) return undefined
    const [sort] = sorting

    // Don't modify the field path, send it as is to match the backend mapping
    return {
      [sort.desc ? 'dsc' : 'asc']: sort.id,
    }
  }, [sorting])

  const columns = useMemo<MRT_ColumnDef<Pick<Contribution, 'id'>>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
      },
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
        filterVariant: 'multi-select',
        mantineFilterMultiSelectProps: {
          data: Object.values(Country) as string[],
          renderOption: (item) => alpha3ToCountryName()[item.option.value],
        },
      },
      {
        accessorKey: 'projectInfo.buildingType',
        header: 'Building Type',
        Cell: ({ cell }) => {
          const rawValue = cell.getValue<string>() || 'N/A'
          return <Text>{snakeCaseToHumanCase(rawValue)}</Text>
        },
        size: 50,
        filterVariant: 'multi-select',
        mantineFilterMultiSelectProps: {
          data: Object.values(BuildingType) as string[],
          renderOption: (item) => snakeCaseToHumanCase(item.option.value),
        },
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
        Cell: ({ cell }) => {
          const completion_year = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={completion_year} />
        },
        size: 50,
        filterVariant: 'range-slider',
        filterFn: 'between',
        mantineFilterRangeSliderProps: {
          max: 2040, //custom max (as opposed to faceted max)
          min: 1900, //custom min (as opposed to faceted min)
          step: 5,
        },
      },
      {
        accessorKey: 'projectInfo.buildingFootprint.value',
        header: 'Building Footprint (m²)',
        Cell: ({ cell }) => {
          const building_footprint = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={building_footprint} />
        },
        size: 50,
        filterVariant: 'range-slider',
        filterFn: 'between',
        mantineFilterRangeSliderProps: {
          max: 30_000, //custom max (as opposed to faceted max)
          min: 0, //custom min (as opposed to faceted min)
          step: 500,
        },
      },
      {
        accessorKey: 'projectInfo.buildingHeight.value',
        header: 'Building Height (m)',
        Cell: ({ cell }) => {
          const building_height = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={building_height} />
        },
        size: 50,
        filterVariant: 'range-slider',
        filterFn: 'between',
        mantineFilterRangeSliderProps: {
          max: 500, //custom max (as opposed to faceted max)
          min: 0, //custom min (as opposed to faceted min)
          step: 25,
        },
      },
      {
        accessorKey: 'projectInfo.buildingMass.value',
        header: 'Building Mass (kg)',
        Cell: ({ cell }) => {
          const building_mass = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={building_mass} />
        },
        size: 50,
        filterVariant: 'range-slider',
        filterFn: 'between',
        mantineFilterRangeSliderProps: {
          max: 30_000, //custom max (as opposed to faceted max)
          min: 0, //custom min (as opposed to faceted min)
          step: 500,
        },
      },
      {
        accessorKey: 'projectInfo.buildingPermitYear',
        header: 'Permit Year',
        Cell: ({ cell }) => {
          const permit_year = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={permit_year} />
        },
        size: 50,
        filterVariant: 'range-slider',
        filterFn: 'between',
        mantineFilterRangeSliderProps: {
          max: 2030, //custom max (as opposed to faceted max)
          min: 1900, //custom min (as opposed to faceted min)
          step: 5,
        },
      },
      {
        accessorKey: 'projectInfo.buildingTypology',
        header: 'Building Typology',
        Cell: ({ cell }) => {
          const building_typology = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={building_typology} />
        },
        size: 100,
        filterVariant: 'multi-select',
        mantineFilterMultiSelectProps: {
          data: Object.values(BuildingTypology) as string[],
        },
      },
      {
        accessorKey: 'projectInfo.buildingUsers',
        header: 'Building Users',
        Cell: ({ cell }) => {
          const building_users = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={building_users} />
        },
        size: 50,
        filterVariant: 'range-slider',
        filterFn: 'between',
        mantineFilterRangeSliderProps: {
          max: 5000, //custom max (as opposed to faceted max)
          min: 0, //custom min (as opposed to faceted min)
          step: 50,
        },
      },
      {
        accessorKey: 'projectInfo.floorsAboveGround',
        header: 'Floors Above Ground',
        Cell: ({ cell }) => {
          const floors_above_ground = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={floors_above_ground} />
        },
        size: 50,
        filterVariant: 'range-slider',
        filterFn: 'between',
        mantineFilterRangeSliderProps: {
          max: 150, //custom max (as opposed to faceted max)
          min: 0, //custom min (as opposed to faceted min)
          step: 1,
        },
      },
      {
        accessorKey: 'projectInfo.floorsBelowGround',
        header: 'Floors Below Ground',
        Cell: ({ cell }) => {
          const floors_below_ground = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={floors_below_ground} />
        },
        size: 50,
        filterVariant: 'range-slider',
        filterFn: 'between',
        mantineFilterRangeSliderProps: {
          max: 20, //custom max (as opposed to faceted max)
          min: 0, //custom min (as opposed to faceted min)
          step: 1,
        },
      },
      {
        accessorKey: 'projectInfo.generalEnergyClass',
        header: 'Energy Class',
        Cell: ({ cell }) => {
          const energy_class = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={energy_class} />
        },
        size: 50,
        filterVariant: 'multi-select',
        mantineFilterMultiSelectProps: {
          data: Object.values(GeneralEnergyClass) as string[],
        },
      },
      {
        accessorKey: 'projectInfo.heatedFloorArea.value',
        header: 'Heated Floor Area (m²)',
        Cell: ({ cell }) => {
          const value = cell.getValue<number>()
          return value ? value.toFixed(2) : 'N/A'
        },
        size: 50,
        filterVariant: 'range-slider',
        filterFn: 'between',
        mantineFilterRangeSliderProps: {
          max: 30_000, //custom max (as opposed to faceted max)
          min: 0, //custom min (as opposed to faceted min)
          step: 500,
        },
      },
      {
        accessorKey: 'projectInfo.roofType',
        header: 'Roof Type',
        Cell: ({ cell }) => {
          const roofType = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={roofType} />
        },
        size: 50,
        filterVariant: 'multi-select',
        mantineFilterMultiSelectProps: {
          data: Object.values(RoofType) as string[],
        },
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
        Cell: ({ cell }) => {
          const gross_floor_area = cell.getValue<string>() || 'N/A'
          return <TruncatedTextWithTooltip text={gross_floor_area} />
        },
        size: 50,
        filterVariant: 'range-slider',
        filterFn: 'between',
        mantineFilterRangeSliderProps: {
          max: 30_000, //custom max (as opposed to faceted max)
          min: 0, //custom min (as opposed to faceted min)
          step: 500,
        },
      },
      {
        accessorKey: 'results',
        Cell: getGWPIntensity,
        header: 'GWP Intensity (kgCO₂eq/m²)',
        size: 50,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnActions: false,
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

  useEffect(() => {
    const baseFilters = { gt: { 'projectInfo.grossFloorArea.value': 0 }, notEqual: { results: null } }
    if (!columnFilters.length) {
      setFilters(baseFilters)
      return
    }

    interface FilterAccumulator {
      contains: Record<string, unknown>
      equal: Record<string, unknown>
      notEqual: Record<string, unknown>
      in: Record<string, unknown>
      gt: Record<string, unknown>
      lt: Record<string, unknown>
    }

    const filters = columnFilters.reduce<FilterAccumulator>(
      (acc, filter) => {
        let fieldName = filter.id

        const fieldColumn = columns.find((column) => column.accessorKey === fieldName)
        if (fieldName == 'location.countryName') {
          fieldName = 'location.country'
        }

        if (fieldColumn?.filterVariant === 'multi-select') {
          return {
            ...acc,
            equal: acc.equal,
            gt: acc.gt,
            lt: acc.lt,
            in: {
              ...acc.in,
              [fieldName]: filter.value,
            },
          }
        } else if (fieldColumn?.filterVariant === 'range-slider') {
          return {
            ...acc,
            equal: acc.equal,
            gt: {
              ...acc.gt,
              // @ts-expect-error filter.value is unknown
              [fieldName]: filter.value[0],
            },
            lt: {
              ...acc.lt,
              // @ts-expect-error filter.value is unknown
              [fieldName]: filter.value[1],
            },
            in: acc.in,
          }
        }
        return {
          ...acc,
          equal: acc.equal,
          in: acc.in,
          gt: acc.gt,
          lt: acc.lt,
          contains: {
            ...acc.contains,
            [fieldName]: filter.value,
          },
        }
      },
      { contains: {}, equal: {}, in: {}, lt: {}, ...baseFilters },
    )

    // Only return non-empty filter objects
    const result: Record<string, Record<string, unknown>> = {}
    if (Object.keys(filters.contains).length > 0) {
      result.contains = filters.contains
    }
    if (Object.keys(filters.equal).length > 0) {
      result.equal = filters.equal
    }
    if (Object.keys(filters.notEqual).length > 0) {
      result.notEqual = filters.notEqual
    }
    if (Object.keys(filters.in).length > 0) {
      result.in = filters.in
    }
    if (Object.keys(filters.gt).length > 0) {
      result.gt = filters.gt
    }
    if (Object.keys(filters.lt).length > 0) {
      result.lt = filters.lt
    }

    setFilters(result)
  }, [columnFilters, setFilters, columns])

  const { loading, error, data } = useGetProjectPortfolioQuery({
    variables: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      filters: filters,
      sortBy: sortBy,
    },
    skip: !filters,
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (shouldHideColumns) {
      // Show only essential columns on small screens
      onColumnVisibilityChange({
        id: false,
        name: true,
        'location.countryName': true,
        'projectInfo.buildingType': true,
        'projectInfo.grossFloorArea.value': true,
        results: true,
        breakdown: true,
        'softwareInfo.lcaSoftware': false,
        'metaData.source.name': false,
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
    }
  }, [shouldHideColumns, onColumnVisibilityChange])

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
    manualFiltering: true,
    manualSorting: true,
    enableRowSelection: true,
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
    enableStickyHeader: true,
    onColumnVisibilityChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        onColumnVisibilityChange(updaterOrValue(columnVisibility))
      } else {
        onColumnVisibilityChange(updaterOrValue)
      }
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    mantineTableContainerProps: {
      style: {
        maxWidth: '100%',
        overflowX: 'auto',
      },
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        style={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          onClick={handleExportAllData}
          leftSection={<IconDownload />}
          variant='filled'
          disabled={rowData.length === 0}
          loading={loadingExportingAll}
        >
          Export All Data
        </Button>
        <Button
          onClick={() => handleExportVisibleData(table.getRowModel().rows)}
          leftSection={<IconDownload />}
          variant='filled'
          disabled={table.getRowModel().rows.length === 0}
        >
          Export Page Rows
        </Button>
        <Button
          onClick={() => handleExportVisibleData(table.getSelectedRowModel().rows)}
          leftSection={<IconDownload />}
          variant='filled'
          disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
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
