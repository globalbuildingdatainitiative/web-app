import { useMemo } from 'react'
import { useGetAggregatedProjectDataQuery } from '@queries'
import { Alert, SimpleGrid, useMantineTheme } from '@mantine/core'
import type { MRT_VisibilityState } from 'mantine-react-table'
import { ChartContainer, ErrorMessage, Loading, SubBarChart } from '@components'
import { IconExclamationCircle } from '@tabler/icons-react'
import { alpha3ToCountryName, camelCaseToHumanCase, snakeCaseToHumanCase } from '@lib'
import { makeErrorFromOptionalString } from 'lib/uiUtils/errors'

interface BucketResult {
  _id: number | string | { min: number; max: number } | null
  count: number
}

interface AggregationFacets {
  [key: string]: BucketResult[]
}

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
  'projectInfo.grossFloorArea.value': 'predefinedBucket',
  'projectInfo.buildingFootprint.value': 'predefinedBucket',
  'projectInfo.buildingCompletionYear': 'predefinedBucket',
  'projectInfo.buildingUsers': 'predefinedBucket',
  'projectInfo.floorsAboveGround': 'predefinedBucket',
  'projectInfo.floorsBelowGround': 'predefinedBucket',
  'projectInfo.buildingHeight.value': 'bucketAuto',
  'projectInfo.buildingMass.value': 'bucketAuto',
  'projectInfo.buildingPermitYear': 'bucketAuto',
  'projectInfo.buildingTypology': 'group',
  'projectInfo.generalEnergyClass': 'group',
  'projectInfo.heatedFloorArea.value': 'bucketAuto',
  'projectInfo.roofType': 'group',
  'projectInfo.frameType': 'group',
}

// Helper to get bucket settings for each field
const getBucketSettings = (fieldName: string) => {
  switch (fieldName) {
    case 'projectInfo.buildingCompletionYear':
      return {
        boundaries: [1850, 1919, 1945, 1970, 1980, 1990, 2000, 2010, 2020, 2030],
        defaultLabel: '2020-2029',
      }
    case 'projectInfo.grossFloorArea.value':
    case 'projectInfo.buildingFootprint.value':
      return {
        boundaries: [0, 500, 1000, 5000],
        defaultLabel: '>5000',
      }
    case 'projectInfo.buildingUsers':
      return {
        boundaries: [0, 6, 11, 51, 101, 501],
        defaultLabel: '>500',
      }
    case 'projectInfo.floorsAboveGround':
    case 'projectInfo.floorsBelowGround':
      return {
        boundaries: [1, 3, 7, 15, 25],
        defaultLabel: '>25',
      }
    default:
      return { boundaries: [], defaultLabel: 'Other' }
  }
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

const getSortValue = (label: string): number => {
  if (label === 'null') {
    return Infinity // Ensuring null goes last
  }

  // Handle ranges like "1850-1918"
  const matchRange = label.match(/^(\d+)-(\d+)/)
  if (matchRange) {
    return parseInt(matchRange[1], 10)
  }

  // Handle something like ">5000"
  if (label.startsWith('>')) {
    const num = parseInt(label.slice(1), 10)
    return isNaN(num) ? Number.MAX_SAFE_INTEGER : num + 1
  }

  // If no pattern recognized, try to parse the entire label as a number
  const n = parseInt(label, 10)
  return isNaN(n) ? Number.MAX_SAFE_INTEGER : n
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
    return Object.entries(filters).filter(([key, value]) => value !== undefined && Object.keys(value).length > 0).map(([key, value]) => {
      const filterKey = Object.keys(value)[0]
      if (key === 'gt') key = 'gte'
      if (key === 'notEqual') key = 'ne'
      if (key === 'contains') key = 'regex'
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

    const predefinedBucketColumns = selectedColumns
      .filter((column) => columnTypeMap[column[0]] === 'predefinedBucket')
      .map((column) => {
        const fieldName = column[0]
        const { boundaries, defaultLabel } = getBucketSettings(fieldName)
        const cleanFieldName = fixAggregationNames(fieldName)

        return {
          [cleanFieldName]: [
            {
              $addFields: {
                [fieldName]: {
                  $cond: {
                    if: {
                      $or: [
                        { $eq: [`$${fieldName}`, null] },
                        { $eq: [`$${fieldName}`, ''] },
                        { $eq: [`$${fieldName}`, 'N/A'] },
                        { $eq: [{ $type: `$${fieldName}` }, 'missing'] },
                      ],
                    },
                    then: 'null',
                    else: { $ifNull: [`$${fieldName}`, 'null'] },
                  },
                },
              },
            },
            {
              $group: {
                _id: {
                  $switch: {
                    branches: [
                      ...boundaries.slice(0, -1).map((boundary, index) => ({
                        case: {
                          $and: [
                            { $gte: [`$${fieldName}`, boundary] },
                            { $lt: [`$${fieldName}`, boundaries[index + 1]] },
                          ],
                        },
                        then: `${boundary}-${boundaries[index + 1] - 1}`,
                      })),
                      {
                        case: { $gte: [`$${fieldName}`, boundaries[boundaries.length - 1]] },
                        then: defaultLabel,
                      },
                      {
                        case: { $eq: [`$${fieldName}`, 'null'] },
                        then: 'null',
                      },
                    ],
                    default: 'null',
                  },
                },
                count: { $sum: 1 },
              },
            },
          ],
        }
      })
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

    return { $facet: { ...bucketColumns, ...predefinedBucketColumns, ...groupColumns } }
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

    const facets = projectData.projects.aggregation[0] as AggregationFacets
    const data = Object.entries(facets) as [string, BucketResult[]][]

    return data.map(([name, values]) => {
      // For each facet, transform each BucketResult
      const transformedValues = values.map((item) => {
        if (item._id === 'null' || item._id === null) {
          return { name: 'null', count: item.count || 0 }
        }

        if (name === 'countryName' && typeof item._id === 'string') {
          const fallback = snakeCaseToHumanCase(normalizeValue(item._id))
          const alphaCountry = alpha3ToCountryName[item._id] ?? fallback
          return { name: alphaCountry, count: item.count || 0 }
        }

        const stringLabel = snakeCaseToHumanCase(normalizeValue(item._id))
        return { name: stringLabel, count: item.count || 0 }
      })

      // Sort them in ascending order, with "null" last
      transformedValues.sort((a, b) => getSortValue(a.name) - getSortValue(b.name))

      return { name, values: transformedValues }
    })
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
    return <ErrorMessage error={makeErrorFromOptionalString(projectError.message)} />
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
