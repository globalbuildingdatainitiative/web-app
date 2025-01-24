import { GetProjectDetailsQuery } from '@queries'
import { Center, Group, Image, Stack } from '@mantine/core'
import logoImage from '../../assets/logo.png'
import { BoxPlot, ErrorBoundary, ErrorMessage, Loading, SpiderChart } from '@components'
import { useMemo } from 'react'
import { formatStages, phases, snakeCaseToHumanCase, useAggregatedProjectStatistics } from '@lib'
import { useViewportSize } from '@mantine/hooks'

type Project = NonNullable<GetProjectDetailsQuery['contributions']['items']>[number]['project']

interface ProjectDetailsReferenceProps {
  project: Project | null
  loading: boolean
}

const phaseMap: Record<string, string> = {
  a1a3: 'production',
  a4: 'construction',
  a5: 'construction',
  b1: 'use',
  b2: 'use',
  b3: 'use',
  b4: 'use',
  b5: 'use',
  b6: 'use',
  b7: 'use',
  c1: 'end_of_life',
  c2: 'end_of_life',
  c3: 'end_of_life',
  c4: 'end_of_life',
  d: 'other',
}

export const ProjectDetailsReference = (props: ProjectDetailsReferenceProps) => {
  const { project, loading } = props
  const { height } = useViewportSize()

  const baseFilters = [{ 'projectInfo.grossFloorArea.value': { $gt: 0 } }, { results: { $ne: null } }] as Record<
    string,
    object
  >[]
  const {
    data: aggData,
    loading: aggLoading,
    error: aggError,
  } = useAggregatedProjectStatistics({
    baseFilters,
    options: { skip: !project },
    groupName: null,
  })

  const projectGFA = useMemo(() => project?.projectInfo?.grossFloorArea?.value || 1, [project])
  const projectResults = useMemo(() => project?.results?.gwp || {}, [project])
  const aggregatedData: Record<string, AggregationGroup> = useMemo(
    () => aggData?.projects?.aggregation?.[0] || {},
    [aggData],
  )

  const spiderData = useMemo(() => {
    const spiderPhases = [
      { name: 'production', value: 0, refValue: aggregatedData.production?.median || 0 },
      { name: 'construction', value: 0, refValue: aggregatedData.construction?.median || 0 },
      { name: 'use', value: 0, refValue: aggregatedData.use?.median || 0 },
      { name: 'end_of_life', value: 0, refValue: aggregatedData.end_of_life?.median || 0 },
      { name: 'other', value: 0, refValue: aggregatedData.other?.median || 0 },
    ]

    if (!projectResults) return spiderPhases

    Object.entries(projectResults).forEach(([key, value]) => {
      if (value === null) return
      const phase = phaseMap[key]
      const phaseIndex = spiderPhases.findIndex((p) => p.name === phase)
      if (phaseIndex === -1) return
      spiderPhases[phaseIndex].value += (value as number) / projectGFA
    })
    return spiderPhases
  }, [projectResults, aggregatedData, projectGFA])

  const projectData: Record<string, number> = useMemo(() => {
    return {
      production: (projectResults?.a1a3 || 0) / projectGFA,
      construction: ((projectResults?.a4 || 0) + (projectResults?.a5 || 0)) / projectGFA,
      use:
        ((projectResults?.b1 || 0) +
          (projectResults?.b2 || 0) +
          (projectResults?.b3 || 0) +
          (projectResults?.b4 || 0) +
          (projectResults?.b5 || 0) +
          (projectResults?.b6 || 0) +
          (projectResults?.b7 || 0)) /
        projectGFA,
      end_of_life:
        ((projectResults?.c1 || 0) +
          (projectResults?.c2 || 0) +
          (projectResults?.c3 || 0) +
          (projectResults?.c4 || 0)) /
        projectGFA,
      other: (projectResults?.d || 0) / projectGFA,
    }
  }, [projectResults, projectGFA])

  const isLoading = useMemo(() => loading || aggLoading, [loading, aggLoading])

  return (
    <Stack id='reference'>
      <Group justify='center' grow>
        <Center style={{ height: height * 0.4 }}>
          <Image
            src={project?.metaData?.image}
            fallbackSrc={logoImage}
            alt={'Project Image'}
            style={{
              maxWidth: height * 0.3,
              maxHeight: height * 0.3,
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Center>
        <ErrorBoundary>
          <Center style={{ height: height * 0.4 }}>
            {isLoading ? <Loading /> : <SpiderChart data={spiderData} />}
          </Center>
        </ErrorBoundary>
        <ErrorBoundary>
          <Center style={{ height: height * 0.4 }}>
            {isLoading ? (
              <Loading />
            ) : (
              <BoxPlot
                data={Object.entries(aggregatedData || {})
                  .filter((value) => ['_id', 'group'].indexOf(value[0]) < 0)
                  .map(([name, group]) => ({
                    name: `${snakeCaseToHumanCase(name)} ${formatStages(phases.find((p) => p.name === name)!.stages)}`,
                    min: group?.minimum,
                    pct25: group?.percentile[0],
                    median: group?.median,
                    pct75: group?.percentile[1],
                    max: group?.maximum,
                    avg: group?.average,
                    count: group?.count,
                    extra: projectData[name],
                  }))}
              />
            )}
          </Center>
        </ErrorBoundary>
      </Group>
      <ErrorMessage error={aggError} />
    </Stack>
  )
}

interface AggregationGroup {
  minimum: number
  percentile: [number, number]
  median: number
  maximum: number
  average: number
  count: number
}
