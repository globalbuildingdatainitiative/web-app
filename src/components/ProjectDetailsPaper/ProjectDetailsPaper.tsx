import { ErrorBoundary, ErrorMessage, Paper, ProjectMetadataTable } from '@components'
import { Divider, Title } from '@mantine/core'
import { useGetProjectDetailsQuery } from '@queries'
import { useMemo } from 'react'

interface ProjectDetailsPaperProps {
  projectId: string
}

export const ProjectDetailsPaper = (props: ProjectDetailsPaperProps) => {
  const { projectId } = props

  const { data, loading, error } = useGetProjectDetailsQuery({ variables: { id: projectId } })

  const project = useMemo(() => data?.contributions.items?.[0].project || null, [data])

  return (
    <Paper data-testid='ProjectDetailsPaper'>
      <Title order={3} style={{ marginBottom: 8 }}>
        Details for {project?.name}
      </Title>
      <Divider />
      <Title order={4} style={{ marginBottom: 2 }}>
        Metadata
      </Title>
      <ErrorBoundary>
        <ProjectMetadataTable project={project} loading={loading} />
        {error ? <ErrorMessage error={error} /> : null}
      </ErrorBoundary>
    </Paper>
  )
}
