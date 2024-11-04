import { ErrorBoundary, Loading, ProjectDetailsPaper } from '@components'
import { Center, Stack } from '@mantine/core'
import { useParams } from 'react-router-dom'

export const ProjectDetailsPage = () => {
  const { contributionId } = useParams()

  return (
    <Stack>
      <ErrorBoundary>
        {contributionId ? (
          <ProjectDetailsPaper projectId={contributionId} />
        ) : (
          <Center style={{ height: '90vh' }}>
            <Loading />
          </Center>
        )}
      </ErrorBoundary>
    </Stack>
  )
}
