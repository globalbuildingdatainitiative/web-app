import type { MRT_VisibilityState } from 'mantine-react-table'
import { SimpleGrid, useMatches } from '@mantine/core'
import { useMemo } from 'react'
import { BoxPlot, ChartContainer, ErrorMessage, Loading } from '@components'
import { phases, snakeCaseToHumanCase, useAggregatedProjectStatistics } from '@lib'

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

  const selectedColumn = useMemo(() => {
    const entry = Object.entries(visibleColumns).find(
      ([key, isVisible]) => isVisible && SUPPORTED_COLUMNS.includes(key),
    )
    return entry ? entry[0] : SUPPORTED_COLUMNS[0]
  }, [visibleColumns])

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useAggregatedProjectStatistics({
    baseFilters: transformedFilters,
    options: { skip: false },
    groupName: selectedColumn,
  })
  const gridColumns = useMatches({ base: 3, xl: 4 })

  if (projectLoading) {
    return <Loading />
  } else if (projectError) {
    return <ErrorMessage error={projectError} />
  }

  return (
    <SimpleGrid cols={gridColumns} spacing='lg' style={{ height: '100%' }} verticalSpacing='md'>
      {/* @ts-expect-error not inferred types */}
      {projectData?.projects.aggregation.map((group) => (
        <ChartContainer
          key={group.group}
          title={snakeCaseToHumanCase(Array.isArray(group.group) ? group.group.join(', ') : group.group)}
        >
          <BoxPlot
            orientation={'horizontal'}
            data={phases.map((phase) => ({
              name: phase.displayName || snakeCaseToHumanCase(phase.name),
              min: group[phase.name].minimum,
              pct25: group[phase.name].percentile[0],
              median: group[phase.name].median,
              pct75: group[phase.name].percentile[1],
              max: group[phase.name].maximum,
              avg: group[phase.name].average,
              count: group[phase.name].count,
            }))}
          />
        </ChartContainer>
      ))}
    </SimpleGrid>
  )
}
