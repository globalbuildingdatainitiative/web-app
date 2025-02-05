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
  displayName?: string
}

export const phases: Phase[] = [
  { name: 'production', stages: ['a1a3'], displayName: 'Production (A1-A3)' },
  { name: 'construction', stages: ['a4', 'a5'], displayName: 'Construction (A4-A5)' },
  { name: 'use_embodied', stages: ['b1', 'b2', 'b3', 'b4', 'b5'], displayName: 'Use Embodied (B1-B5)' },
  { name: 'use_operational', stages: ['b6', 'b7'], displayName: 'Use Operational (B6-B7)' },
  { name: 'end_of_life', stages: ['c1', 'c2', 'c3', 'c4'], displayName: 'End of Life (C1-C4)' },
  { name: 'other', stages: ['d'], displayName: 'Other (D)' },
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
        ...phases.reduce((acc, phase) => ({ ...acc, ...phaseStats(phase) }), {}),
      },
    },
    {
      $project: {
        _id: null,
        group: '$_id',
        ...phases.reduce((acc, phase) => ({ ...acc, ...phaseProjection(phase) }), {}),
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
