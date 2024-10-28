import { ActionIcon } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

interface ViewProjectDetailsProps {
  contributionId: string
}

export const ViewProjectDetails = ({ contributionId }: ViewProjectDetailsProps) => {
  return (
    <ActionIcon c='black' variant='transparent' component={Link} to={`/contributions/${contributionId}/project`}>
      <IconExternalLink />
    </ActionIcon>
  )
}
