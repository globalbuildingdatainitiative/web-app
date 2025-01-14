import type { MRT_VisibilityState } from 'mantine-react-table'
import { Alert, SimpleGrid, useMatches } from '@mantine/core'
import { useMemo } from 'react'
import { BoxPlot, ChartContainer, ErrorMessage, Loading } from '@components'
import { phases, snakeCaseToHumanCase, useAggregatedProjectStatistics } from '@lib'
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

export const CarbonIntensityChart = (props: CarbonIntensityChartProps) => {
  const { visibleColumns, filters } = props

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

  const formatStages = (stages: string[]) => {
    // if there's only one stage (like "a1a3"), handle that edge case
    if (stages.length === 1) {
      if (stages[0].toLowerCase() === 'a1a3') {
        return '(A1A3)'
      }
      return `(${stages[0].toUpperCase()})`
    }

    // if multiple stages, assume they’re consecutive and do something like B1-B7
    const first = stages[0].toUpperCase()
    const last = stages[stages.length - 1].toUpperCase()
    return `(${first}-${last})`
  }

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useAggregatedProjectStatistics({
    baseFilters: transformedFilters,
    options: { skip: showError },
    groupName: selectedColumns[0][0],
  })
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
      {/* @ts-expect-error not inferred types */}
      {projectData?.projects.aggregation.map((group) => (
        <ChartContainer title={snakeCaseToHumanCase(Array.isArray(group.group) ? group.group.join(', ') : group.group)}>
          <BoxPlot
            orientation={'horizontal'}
            data={phases.map(({ name, stages }) => ({
              name: `${snakeCaseToHumanCase(name)} ${formatStages(stages)}`,
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
