import { Paper } from '@components'
import { Button, Divider, Group, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export const ProfileHeader = () => {
  const navigate = useNavigate()

  return (
    <Paper data-testid='ProfileHeader'>
      <Group justify='space-between'>
        <Title order={2}>Profile Header</Title>
        <Divider orientation='vertical' />
        <Title order={2}>Profile Header</Title>
        <Divider orientation='vertical' />
        <Button color='green' radius='sm' px={16} onClick={() => navigate('/contributions/new')}>
          Contribute Now
        </Button>
      </Group>
    </Paper>
  )
}
