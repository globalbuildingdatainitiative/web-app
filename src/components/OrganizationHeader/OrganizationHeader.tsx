import { Paper } from '../Paper'
import { Title, Button, Group, Divider } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export const OrganizationHeader = () => {
  const navigate = useNavigate()

  return (
    <Paper data-testid='OrganizationHeader'>
      <Group justify='space-between'>
        <Title order={2}>Organization Header</Title>
        <Divider orientation='vertical' />
        <Title order={2}>Organization Header</Title>
        <Divider orientation='vertical' />
        <Button color='green' radius='sm' px={16} onClick={() => navigate('/organization/new')}>
          Create Organization
        </Button>
      </Group>
    </Paper>
  )
}
