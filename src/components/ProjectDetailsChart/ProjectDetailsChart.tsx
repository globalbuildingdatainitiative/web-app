import { GetProjectDetailsQuery, LifeCycleStage, useGetAggregatedProjectDataQuery } from '@queries'
import { ErrorMessage, Loading } from '@components'
import { Center, Stack, Text, useMantineTheme } from '@mantine/core'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { useViewportSize } from '@mantine/hooks'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

type Project = NonNullable<GetProjectDetailsQuery['contributions']['items']>[number]['project']

interface ProjectDetailsChartProps {
  project: Project | null
  loading: boolean
}

export const ProjectDetailsChart = (props: ProjectDetailsChartProps) => {
  const { project, loading } = props
  const { height } = useViewportSize()
  const theme = useMantineTheme()

  const baseFilters = [{ 'projectInfo.grossFloorArea.value': { $gt: 0 } }, { results: { $ne: null } }]
  const aggregation = [
    {
      $match: {
        $and: baseFilters,
      },
    },
    {
      $project: {
        results: {
          $divide: [
            { $sum: Object.values(LifeCycleStage).map((stage) => `$results.gwp.${stage.toLowerCase()}`) },
            '$projectInfo.grossFloorArea.value',
          ],
        },
      },
    },
    { $sort: { results: 1 } },
  ]

  const { data, loading: dataLoading, error } = useGetAggregatedProjectDataQuery({ variables: { aggregation } })

  return (
    <Stack id='chart'>
      <Center style={{ height: height * 0.4 }}>
        {loading || dataLoading ? (
          <Loading />
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={data?.projects.aggregation}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey={'_id'} hide={true} />
              <YAxis label={{ value: 'kgCO₂eq/m²', angle: -90, offset: -10, position: 'insideLeft' }} />
              <Tooltip content={(props) => <TooltipContent {...props} projectId={project?.id || ''} />} />
              <Bar dataKey='results'>
                <LabelList
                  dataKey='_id'
                  content={(props) => renderProjectLabel(props as LabelProps, project?.id, theme.colors.red[6])}
                />
                {data?.projects.aggregation.map(({ _id }: { _id: string }) => (
                  <Cell key={`cell-${_id}`} fill={_id === project?.id ? theme.colors.red[6] : theme.colors.green[1]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Center>
      <ErrorMessage error={error} />
    </Stack>
  )
}

interface LabelProps {
  x: number
  y: number
  width: number
  height: number
  value: string
}

const renderProjectLabel = (props: LabelProps, projectId: string, color: string) => {
  const { x, y, width, value, height } = props
  const radius = 8

  if (value !== projectId) {
    return null
  }

  const cy = height < 0 ? y + 2 * radius : y - 2 * radius

  return (
    <g>
      <circle cx={x + width / 2} cy={cy} r={radius} fill={color} />
    </g>
  )
}

interface TooltipContentProps extends TooltipProps<ValueType, NameType> {
  projectId: string
}

const TooltipContent = (props: TooltipContentProps) => {
  const { active, payload, label, projectId } = props

  if (!(active && payload && payload.length)) {
    return null
  }

  return (
    <Stack bg={'white'} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
      <Text>
        Project ID: {label.slice(0, 8)}... {label === projectId ? '(This Project)' : ''}
      </Text>
      <Text>GWP: {Number(payload?.[0].value).toFixed(2)} kgCO₂eq/m²</Text>
    </Stack>
  )
}
