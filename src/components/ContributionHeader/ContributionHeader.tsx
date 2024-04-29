import { Paper } from '../Paper'
import { Button, Divider, Group, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export const ContributionHeader = () => {
  const navigate = useNavigate()

  return (
    <Paper>
      <Group justify='space-between'>
        <Title order={2}>Contribution Header</Title>
        <Divider orientation='vertical' />
        <Title order={2}>Contribution Header</Title>
        <Divider orientation='vertical' />
        <Button color='green' radius='sm' px={16} onClick={() => navigate('/contributions/new')}>
          Contribute Now
        </Button>
      </Group>
    </Paper>
  )
}
