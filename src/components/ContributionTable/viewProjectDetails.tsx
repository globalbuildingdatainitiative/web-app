import { ActionIcon } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'

interface ViewProjectDetailsProps {
  contributionId: string
}

export const ViewProjectDetails = ({ contributionId }: ViewProjectDetailsProps) => {
  const location = useLocation()

  // If we're on the details/benchmarking page, use the details URL pattern
  const isDetailsPage = location.pathname.startsWith('/details')
  const linkPath = isDetailsPage
    ? `/details/${contributionId}/project`
    : `/contributions/${contributionId}/project`
  return (
    <ActionIcon c='black' variant='transparent' component={Link} to={linkPath}>
      <IconExternalLink />
    </ActionIcon>
  )
}
