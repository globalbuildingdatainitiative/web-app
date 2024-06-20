import { Paper } from '../Paper'
import { Title, Button, Group, Divider } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@context'

export const OrganizationHeader = () => {
  const navigate = useNavigate()
  const { user } = useUserContext()

  return (
    <Paper data-testid='OrganizationHeader'>
      <Group justify='space-between'>
        <Title order={2}>Organization Header</Title>
        <Divider orientation='vertical' />
        <Title order={2}>Organization Header</Title>
        <Divider orientation='vertical' />
        <Button
          color='green'
          radius='sm'
          px={16}
          onClick={() => navigate('/organization/new')}
          disabled={user?.organization?.id}
        >
          Create Organization
        </Button>
      </Group>
    </Paper>
  )
}
