import { useMemo } from 'react'
import { useGetAggregatedProjectDataQuery } from '@queries'
import { Alert, SimpleGrid } from '@mantine/core'
import type { MRT_VisibilityState } from 'mantine-react-table'
import { ChartContainer, ErrorMessage, Loading, SubBarChart, ChartTab } from '@components'
import { IconExclamationCircle } from '@tabler/icons-react'
import { camelCaseToHumanCase, snakeCaseToHumanCase } from '@lib'
import { alpha3ToCountryName } from './countryCodesMapping.ts'
import { useTheme } from '@emotion/react'

const MAX_VISIBLE_COLUMNS = 9

const EXCLUDED_COLUMNS = ['name', 'breakdown', 'results']

interface AttributeChartProps {
  visibleColumns: MRT_VisibilityState
  filters: object
  activeTab: ChartTab
}

const columnTypeMap: Record<string, string> = {
  'location.countryName': 'group',
  'projectInfo.buildingType': 'group',
  'softwareInfo.lcaSoftware': 'group',
  'metaData.source.name': 'group',
  'projectInfo.grossFloorArea.value': 'bucketAuto',
  'projectInfo.buildingCompletionYear': 'bucketAuto',
  'projectInfo.buildingFootprint.value': 'bucketAuto',
  'projectInfo.buildingHeight.value': 'bucketAuto',
  'projectInfo.buildingMass.value': 'bucketAuto',
  'projectInfo.buildingPermitYear': 'bucketAuto',
  'projectInfo.buildingTypology': 'group',
  'projectInfo.buildingUsers': 'bucketAuto',
  'projectInfo.floorsAboveGround': 'bucketAuto',
  'projectInfo.floorsBelowGround': 'bucketAuto',
  'projectInfo.generalEnergyClass': 'group',
  'projectInfo.heatedFloorArea.value': 'bucketAuto',
  'projectInfo.roofType': 'group',
  'projectInfo.frameType': 'group',
}

const fixAggregationNames = (name: string) => {
  const splitNames = name.split('.')
  if (splitNames.length >= 2) {
    return splitNames[1]
  } else {
    return splitNames[0]
  }
}

export const AttributeChart = (props: AttributeChartProps) => {
  const { visibleColumns, filters } = props
  const theme = useTheme()

  const getColor = (colorName: string, shade: number, fallback: string): string => {
    // @ts-expect-error colors are there
    return theme.colors?.[colorName]?.[shade] || fallback
  }

  const chartColorMap: Record<string, string> = {
    countryName: getColor('green', 6, '#40C057'),
    buildingType: getColor('blue', 6, '#228BE6'),
    lcaSoftware: getColor('light_green', 6, '#7950F2'),
    buildingTypology: getColor('orange', 6, '#FF6B6B'),
    source: getColor('light_orange', 6, '#20C997'),
    generalEnergyClass: getColor('yellow', 6, '#FCC419'),
    frameType: getColor('green', 4, '#BE4BDB'),
    roofType: getColor('red', 6, '#FA5252'),
    grossFloorArea: getColor('blue', 4, '#FA5252'),
    buildingCompletionYear: getColor('light_green', 4, '#FD7E14'),
    buildingFootprint: getColor('orange', 4, '#FF9F1C'),
    buildingHeight: getColor('light_orange', 4, '#E63946'),
    buildingMass: getColor('yellow', 4, '#2D3A8C'),
    buildingPermitYear: getColor('green', 7, '#6C757D'),
    buildingUsers: getColor('blue', 7, '#5C940D'),
    floorsAboveGround: getColor('orange', 7, '#364FC7'),
    floorsBelowGround: getColor('light_orange', 7, '#C92A2A'),
    heatedFloorArea: getColor('yellow', 7, '#868E96'),
  }

  const transformedFilters = useMemo(() => {
    return Object.entries(filters).map(([key, value]) => {
      const filterKey = Object.keys(value)[0]
      if (key === 'notEqual') {
        key = 'ne'
      } else if (key === 'contains') {
        key = 'regex'
      }
      return { [filterKey]: { [`$${key}`]: value[filterKey] } }
    })
  }, [filters])

  const selectedColumns = useMemo(
    () => Object.entries(visibleColumns).filter(([key, isVisible]) => isVisible && !EXCLUDED_COLUMNS.includes(key)),
    [visibleColumns],
  )
  const showError = useMemo(() => selectedColumns.length > MAX_VISIBLE_COLUMNS, [selectedColumns])

  const aggregationGroups = useMemo(() => {
    const bucketColumns = selectedColumns
      .filter((column) => columnTypeMap[column[0]] === 'bucketAuto')
      .map((column) => ({
        [fixAggregationNames(column[0])]: [
          {
            $bucketAuto: {
              groupBy: `$${column[0]}`,
              buckets: 10,
            },
          },
        ],
      }))
      .reduce((prev, next) => ({ ...prev, ...next }), {})

    const groupColumns = selectedColumns
      .filter((column) => columnTypeMap[column[0]] === 'group')
      .map((column) => ({
        [fixAggregationNames(column[0])]: [
          {
            $group: {
              _id: `$${column[0] === 'location.countryName' ? 'location.country' : column[0]}`,
              count: { $sum: 1 },
            },
          },
        ],
      }))
      .reduce((prev, next) => ({ ...prev, ...next }), {})

    return { $facet: { ...bucketColumns, ...groupColumns } }
  }, [selectedColumns])

  const aggregation = [
    {
      $match: {
        $and: transformedFilters,
      },
    },
    aggregationGroups,
  ]

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useGetAggregatedProjectDataQuery({ variables: { aggregation }, skip: showError || !transformedFilters.length })

  const transformedProjectData = useMemo(() => {
    if (!projectData) return []
    const data = Object.entries(projectData.projects.aggregation[0])
    if (!data) return []

    return data.map(([name, values]) => ({
      name,
      // @ts-expect-error complicated types
      values: values.map((item) => ({
        name: snakeCaseToHumanCase(
          typeof item._id === 'object'
            ? `${item._id.min}-${item._id.max}`
            : name === 'countryName'
              ? alpha3ToCountryName()[item._id]
              : item._id,
        ),
        count: item.count,
      })),
    }))
  }, [projectData])

  if (showError) {
    return (
      <Alert icon={<IconExclamationCircle size={16} />} color='red' title='Column Limit Exceeded' mb='md'>
        You can only select up to {MAX_VISIBLE_COLUMNS} columns at a time. Please deselect some columns before adding
        new ones.
      </Alert>
    )
  } else if (projectLoading) {
    return <Loading />
  } else if (projectError) {
    return <ErrorMessage error={projectError} />
  }

  const gridColumns = transformedProjectData.length > 4 ? 3 : 2

  return (
    <SimpleGrid cols={gridColumns} spacing='md' style={{ height: '100%' }} verticalSpacing='md'>
      {transformedProjectData.map(({ name, values }) => (
        <ChartContainer title={camelCaseToHumanCase(name)} key={name}>
          <SubBarChart data={values} dataKey={'name'} fill={chartColorMap[name]} />
        </ChartContainer>
      ))}
    </SimpleGrid>
  )
}
