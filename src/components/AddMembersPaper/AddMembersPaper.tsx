import { Paper } from '@components'
import { Button, Group, Stack, TextInput, Title } from '@mantine/core'
import logo from 'assets/logo.png'

export const AddMembersPaper = () => {
  return (
    <Paper data-testid='AddMembersPaper'>
      <Group>
        <img src={logo} alt='Company Logo' style={{ maxWidth: '400px' }} />
        <Stack align='center' gap='xl'>
          <Title order={2}>Add Members</Title>
          <TextInput
            size='md'
            radius='md'
            label='Member Email'
            placeholder='Enter Email Address'
            style={{ width: '500px' }}
            required
          />
          <Button color='green' radius='lg' px={16} size='md' style={{ width: '500px' }} type='submit'>
            Send Invitation
          </Button>
        </Stack>
      </Group>
    </Paper>
  )
}
