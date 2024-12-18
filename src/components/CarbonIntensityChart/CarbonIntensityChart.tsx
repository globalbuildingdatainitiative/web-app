import type { MRT_VisibilityState } from 'mantine-react-table'
import { Alert, Paper, SimpleGrid, Text, useMatches } from '@mantine/core'
import { ReactNode, useMemo } from 'react'
import { useGetAggregatedProjectDataQuery } from '@queries'
import { BoxPlot, ErrorMessage, Loading } from '@components'
import { snakeCaseToHumanCase } from '@lib'
import { IconExclamationCircle } from '@tabler/icons-react'

const SUPPORTED_COLUMNS = [
  'projectInfo.buildingType',
  'metaData.source.name',
  'softwareInfo.lcaSoftware',
  'projectInfo.buildingTypology',
  'projectInfo.generalEnergyClass',
  'projectInfo.roofType',
  'projectInfo.frameType',
]

interface CarbonIntensityChartProps {
  visibleColumns: MRT_VisibilityState
  filters: object
}

interface Phase {
  name: string
  stages: string[]
}

export const CarbonIntensityChart = (props: CarbonIntensityChartProps) => {
  const { visibleColumns, filters } = props

  // const filters = [{ 'projectInfo.grossFloorArea.value': { $gt: 0 } }]
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
    () => Object.entries(visibleColumns).filter(([key, isVisible]) => isVisible && SUPPORTED_COLUMNS.includes(key)),
    [visibleColumns],
  )
  const showError = useMemo(() => selectedColumns.length !== 1, [selectedColumns])
  const divideAggregation = (stages: string[]) => ({ $sum: stages.map((stage) => `$results.gwp.${stage}`) })
  const phases: Phase[] = [
    { name: 'production', stages: ['a1a3'] },
    { name: 'construction', stages: ['a4', 'a5'] },
    { name: 'use', stages: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'] },
    { name: 'end_of_life', stages: ['c1', 'c2', 'c3', 'c4'] },
    { name: 'other', stages: ['d'] },
  ]

  const phase_stats = (phase: Phase) => ({
    [`${phase.name}_minimum`]: {
      $min: { $divide: [divideAggregation(phase.stages), '$projectInfo.grossFloorArea.value'] },
    },
    [`${phase.name}_percentile`]: {
      $percentile: {
        p: [0.25, 0.75],
        method: 'approximate',
        input: { $divide: [divideAggregation(phase.stages), '$projectInfo.grossFloorArea.value'] },
      },
    },
    [`${phase.name}_median`]: {
      $median: {
        method: 'approximate',
        input: { $divide: [divideAggregation(phase.stages), '$projectInfo.grossFloorArea.value'] },
      },
    },
    [`${phase.name}_maximum`]: {
      $max: { $divide: [divideAggregation(phase.stages), '$projectInfo.grossFloorArea.value'] },
    },
    [`${phase.name}_average`]: {
      $avg: { $divide: [divideAggregation(phase.stages), '$projectInfo.grossFloorArea.value'] },
    },
    [`${phase.name}_count`]: { $sum: 1 },
  })

  const phase_projection = (phase: Phase) => ({
    [phase.name]: {
      minimum: `$${phase.name}_minimum`,
      percentile: `$${phase.name}_percentile`,
      median: `$${phase.name}_median`,
      maximum: `$${phase.name}_maximum`,
      average: `$${phase.name}_average`,
      count: `$${phase.name}_count`,
    },
  })

  const aggregation = [
    {
      $match: {
        $and: transformedFilters,
      },
    },
    {
      $group: {
        _id: `$${selectedColumns[0][0]}`,
        ...phase_stats(phases[0]),
        ...phase_stats(phases[1]),
        ...phase_stats(phases[2]),
        ...phase_stats(phases[3]),
        ...phase_stats(phases[4]),
      },
    },
    {
      $project: {
        _id: null,
        group: '$_id',
        ...phase_projection(phases[0]),
        ...phase_projection(phases[1]),
        ...phase_projection(phases[2]),
        ...phase_projection(phases[3]),
        ...phase_projection(phases[4]),
      },
    },
  ]
  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useGetAggregatedProjectDataQuery({ variables: { aggregation }, skip: showError })

  const gridColumns = useMatches({ base: 3, xl: 4 })

  if (showError) {
    return (
      <Alert icon={<IconExclamationCircle size={16} />} color='red' title='Column Limit Exceeded' mb='md'>
        <div>You have to select 1 of the supported columns.</div>
        <div>Available columns for this chart are:</div>
        <ul>
          <li>Building Type</li>
          <li>Source</li>
          <li>LCA Software</li>
          <li>Building Typology</li>
          <li>Energy Class</li>
          <li>Roof Type</li>
          <li>Frame Type</li>
        </ul>
      </Alert>
    )
  } else if (projectLoading) {
    return <Loading />
  } else if (projectError) {
    return <ErrorMessage error={projectError} />
  }

  return (
    <SimpleGrid cols={gridColumns} spacing='md' style={{ height: '100%' }} verticalSpacing='md'>
      {projectData?.projects.aggregation.map((group: any) => (
        <ChartContainer title={snakeCaseToHumanCase(Array.isArray(group.group) ? group.group.join(', ') : group.group)}>
          <BoxPlot
            orientation={'horizontal'}
            data={phases.map(({ name }) => ({
              name: snakeCaseToHumanCase(name),
              min: group[name].minimum,
              pct25: group[name].percentile[0],
              median: group[name].median,
              pct75: group[name].percentile[1],
              max: group[name].maximum,
              avg: group[name].average,
              count: group[name].count,
            }))}
          />
        </ChartContainer>
      ))}
    </SimpleGrid>
  )
}

interface ChartContainerProps {
  children: ReactNode
  title: string
}

const ChartContainer = ({ children, title }: ChartContainerProps) => (
  <Paper p='xs' shadow='sm' h='100%' style={{ minHeight: '250px' }}>
    <Text size='sm' fw={500} mb='xs' ta='center'>
      {title}
    </Text>
    <div style={{ height: 'calc(100% - 24px)' }}>{children}</div>
  </Paper>
)
