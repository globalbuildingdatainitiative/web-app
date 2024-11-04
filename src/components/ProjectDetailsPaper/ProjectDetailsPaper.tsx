import { Loading, Paper, ProjectMetadataTable } from '@components'
import { Center, Divider, Title } from '@mantine/core'
import { useGetProjectDetailsQuery } from '@queries'
import { useMemo } from 'react'

interface ProjectDetailsPaperProps {
  projectId: string
}

export const ProjectDetailsPaper = (props: ProjectDetailsPaperProps) => {
  const { projectId } = props

  const { data, loading, error } = useGetProjectDetailsQuery({ variables: { id: projectId } })

  const project = useMemo(() => data?.contributions.items?.[0].project, [data])

  if (loading || !project)
    return (
      <Center style={{ height: '90vh' }}>
        <Loading />
      </Center>
    )
  if (error) return <p>Error: {error.message}</p>

  return (
    <Paper data-testid='ProjectDetailsPaper'>
      <Title order={3} style={{ marginBottom: 8 }}>
        Details for {project.name}
      </Title>
      <Divider />
      <Title order={4} style={{ marginBottom: 2 }}>
        Metadata
      </Title>
      <ProjectMetadataTable project={project} />
    </Paper>
  )
}
