import { useMemo } from 'react'
import { useGetAggregatedProjectDataQuery } from '@queries'
import { Alert, SimpleGrid, useMantineTheme } from '@mantine/core'
import type { MRT_VisibilityState } from 'mantine-react-table'
import { ChartContainer, ErrorMessage, Loading, SubBarChart } from '@components'
import { IconExclamationCircle } from '@tabler/icons-react'
import { alpha3ToCountryName, camelCaseToHumanCase, snakeCaseToHumanCase } from '@lib'

const MAX_VISIBLE_COLUMNS = 9

const EXCLUDED_COLUMNS = ['name', 'breakdown', 'results']

interface AttributeChartProps {
  visibleColumns: MRT_VisibilityState
  filters: object
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
  return splitNames.length >= 2 ? splitNames[1] : splitNames[0]
}

const normalizeValue = (value: unknown): string => {
  if (value === null || value === undefined || value === '' || value === 'N/A') {
    return 'null'
  }
  return String(value)
}

export const AttributeChart = (props: AttributeChartProps) => {
  const { visibleColumns, filters } = props
  const theme = useMantineTheme()

  const getColor = (colorName: string, shade: number, fallback: string): string => {
    return theme.colors?.[colorName]?.[shade] || fallback
  }

  const chartColorMap: Record<string, string> = {
    countryName: getColor('green', 1, '#A6DBC9'),
    buildingType: getColor('blue', 1, '#9DD2F3'),
    lcaSoftware: getColor('purple', 1, '#BAAEF6'),
    buildingTypology: getColor('orange', 1, '#FBCA94'),
    source: getColor('red', 1, '#fbdbd6'),
    generalEnergyClass: getColor('yellow', 1, '#fff3d0'),
    frameType: getColor('green', 3, '#76CCAF'),
    roofType: getColor('blue', 3, '#75BCEB'),
    grossFloorArea: getColor('purple', 3, '#9E92F2'),
    buildingCompletionYear: getColor('orange', 3, '#F8B670'),
    buildingFootprint: getColor('red', 3, '#e68e7d'),
    buildingHeight: getColor('yellow', 3, '#fed869'),
    buildingMass: getColor('green', 5, '#1B9D7E'),
    buildingPermitYear: getColor('blue', 5, '#3592E3'),
    buildingUsers: getColor('purple', 5, '#8671EF'),
    floorsAboveGround: getColor('orange', 5, '#F59B3A'),
    floorsBelowGround: getColor('red', 5, '#da573d'),
    heatedFloorArea: getColor('yellow', 5, '#fec426'),
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
            $addFields: {
              [column[0]]: {
                $cond: {
                  if: {
                    $or: [
                      { $eq: [`$${column[0]}`, null] },
                      { $eq: [`$${column[0]}`, ''] },
                      { $eq: [`$${column[0]}`, 'N/A'] },
                      { $eq: [{ $type: `$${column[0]}` }, 'missing'] },
                    ],
                  },
                  then: 'null',
                  else: { $ifNull: [`$${column[0]}`, 'null'] },
                },
              },
            },
          },
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

    // Define the type for the aggregation results
    type AggregationResult = {
      _id: { min: number; max: number } | string | null
      count: number
    }

    const data = Object.entries(projectData.projects.aggregation[0]) as [string, AggregationResult[]][]

    return data.map(([name, values]) => ({
      name,
      values: values.map((item) => ({
        name: item._id
          ? typeof item._id === 'object' && 'min' in item._id && 'max' in item._id
            ? `${item._id.min}-${item._id.max}`
            : name === 'countryName'
              ? alpha3ToCountryName()[item._id] || snakeCaseToHumanCase(normalizeValue(item._id))
              : snakeCaseToHumanCase(normalizeValue(item._id))
          : 'null',
        count: item.count || 0,
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
