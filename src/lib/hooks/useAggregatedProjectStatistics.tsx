import { QueryHookOptions } from '@apollo/client'
import {
  GetAggregatedProjectDataQuery,
  GetAggregatedProjectDataQueryVariables,
  useGetAggregatedProjectDataQuery,
} from '@queries'

interface useAggregatedProjectStatisticsProps {
  options?: QueryHookOptions<GetAggregatedProjectDataQuery, GetAggregatedProjectDataQueryVariables> & { skip?: boolean }
  baseFilters: Record<string, object>[]
  groupName: string | null
}

interface Phase {
  name: string
  stages: string[]
}

export const phases: Phase[] = [
  { name: 'production', stages: ['a1a3'] },
  { name: 'construction', stages: ['a4', 'a5'] },
  { name: 'use', stages: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'] },
  { name: 'end_of_life', stages: ['c1', 'c2', 'c3', 'c4'] },
  { name: 'other', stages: ['d'] },
]

export const useAggregatedProjectStatistics = (props: useAggregatedProjectStatisticsProps) => {
  const { baseFilters, options, groupName } = props

  const aggregation = [
    {
      $match: {
        $and: baseFilters,
      },
    },
    {
      $group: {
        _id: groupName === null ? null : `$${groupName}`,
        ...phaseStats(phases[0]),
        ...phaseStats(phases[1]),
        ...phaseStats(phases[2]),
        ...phaseStats(phases[3]),
        ...phaseStats(phases[4]),
      },
    },
    {
      $project: {
        _id: null,
        group: '$_id',
        ...phaseProjection(phases[0]),
        ...phaseProjection(phases[1]),
        ...phaseProjection(phases[2]),
        ...phaseProjection(phases[3]),
        ...phaseProjection(phases[4]),
      },
    },
  ]

  return useGetAggregatedProjectDataQuery({ variables: { aggregation }, ...options })
}

const divideAggregation = (stages: string[]) => ({ $sum: stages.map((stage) => `$results.gwp.${stage}`) })

const phaseStats = (phase: Phase) => ({
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

const phaseProjection = (phase: Phase) => ({
  [phase.name]: {
    minimum: `$${phase.name}_minimum`,
    percentile: `$${phase.name}_percentile`,
    median: `$${phase.name}_median`,
    maximum: `$${phase.name}_maximum`,
    average: `$${phase.name}_average`,
    count: `$${phase.name}_count`,
  },
})
