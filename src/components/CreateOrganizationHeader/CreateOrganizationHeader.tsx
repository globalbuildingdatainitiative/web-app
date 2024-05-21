import { Paper } from '@components'
import { Button, Divider, Group, Title } from '@mantine/core'

export const CreateOrganizationHeader = () => {
  return (
    <Paper data-testid='CreateOrganizationHeader'>
      <Group justify='space-between'>
        <Title order={6}>Total Members</Title>
        <Divider orientation='vertical' />
        <Title order={6}>Organization Name</Title>
        <Divider orientation='vertical' />
        <Button variant='light' color='gray' size='md' radius='sm' px={20}>
          View Members
        </Button>
        <Divider orientation='vertical' />
        <Button variant='light' color='gray' size='md' radius='sm' px={20}>
          Add Member
        </Button>
      </Group>
    </Paper>
  )
}
