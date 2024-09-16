import React, { useState } from 'react'
import { Paper } from '@components'
import { Button, Group, Stack, Textarea, Title, Text } from '@mantine/core'
import logo from 'assets/logo.png'
import { useInviteUsersMutation } from '@queries'

interface InviteResult {
  email: string
  status: string
  message: string
}

export const AddMembersPaper = () => {
  const [emails, setEmails] = useState<string>('')
  const [inviteResults, setInviteResults] = useState<InviteResult[]>([])
  const [inviteUsers, { loading, error }] = useInviteUsersMutation()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const emailList = emails
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email !== '')

    if (emailList.length === 0) {
      alert('Please enter at least one email address')
      return
    }

    try {
      const { data } = await inviteUsers({
        variables: { input: { emails: emailList } },
      })
      if (data) {
        setInviteResults(data.inviteUsers)
        setEmails('')
      }
    } catch (err) {
      alert('An error occurred while inviting users. Please try again.')
    }
  }

  return (
    <Paper data-testid='AddMembersPaper'>
      <form onSubmit={handleSubmit}>
        <Group>
          <img src={logo} alt='Company Logo' style={{ maxWidth: '400px' }} />
          <Stack align='center' gap='xl'>
            <Title order={2}>Add Members</Title>
            <Textarea
              value={emails}
              onChange={(event) => setEmails(event.currentTarget.value)}
              size='md'
              radius='md'
              label='Member Emails'
              placeholder='Enter Email Addresses (comma-separated)'
              style={{ width: '500px' }}
              required
              autosize
              minRows={3}
              maxRows={5}
            />
            <Button
              color='green'
              radius='lg'
              px={16}
              size='md'
              style={{ width: '500px' }}
              type='submit'
              loading={loading}
            >
              Send Invitations
            </Button>
          </Stack>
        </Group>
      </form>
      {inviteResults.length > 0 && (
        <Stack mt='md'>
          <Title order={3}>Invitation Results:</Title>
          {inviteResults.map((result, index) => (
            <Text key={index}>
              {result.email}:{' '}
              {result.status === 'invited'
                ? 'Invited successfully'
                : result.status === 'added'
                  ? 'Added to organization'
                  : result.message}
            </Text>
          ))}
        </Stack>
      )}
      {error && <Text c='red'>Error: {error.message}</Text>}
    </Paper>
  )
}
