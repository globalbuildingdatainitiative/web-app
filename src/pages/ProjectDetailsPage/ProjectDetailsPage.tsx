import { ErrorBoundary, Loading, ProjectDetailsPaper } from '@components'
import { Stack } from '@mantine/core'
import { useParams } from 'react-router-dom'

export const ProjectDetailsPage = () => {
  const { contributionId } = useParams()

  if (!contributionId) {
    return (
      <Stack>
        <Loading />
      </Stack>
    )
  }

  return (
    <Stack>
      <ErrorBoundary>
        <ProjectDetailsPaper projectId={contributionId} />
      </ErrorBoundary>
    </Stack>
  )
}
