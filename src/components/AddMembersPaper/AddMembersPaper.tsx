import React, { useState } from 'react'
import { Paper } from '@components'
import { Button, Group, Stack, Textarea, Title, Text, Pill } from '@mantine/core'
import logo from 'assets/logo.png'
import { useInviteUsersMutation } from '@queries'

interface InviteResult {
  email: string
  status: string
  message: string
}

export const AddMembersPaper = () => {
  const [emailInput, setEmailInput] = useState<string>('')
  const [parsedEmails, setParsedEmails] = useState<string[]>([])
  const [inviteResults, setInviteResults] = useState<InviteResult[]>([])
  const [inviteUsers, { loading, error }] = useInviteUsersMutation()

  const parseEmails = (input: string): string[] => {
    const normalizedInput = input
      .replace(/[;:]/g, ',')
      .replace(/[\n\t]/g, ',')
      .replace(/\s+/g, ',')
      .replace(/,+/g, ',')

    return normalizedInput
      .split(',')
      .map((email) => email.trim())
      .filter((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return email !== '' && emailRegex.test(email)
      })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = event.currentTarget.value
    setEmailInput(newInput)
    setParsedEmails(parseEmails(newInput))
  }

  const handleRemoveEmail = (emailToRemove: string) => {
    const updatedEmails = parsedEmails.filter((email) => email !== emailToRemove)
    setParsedEmails(updatedEmails)
    setEmailInput(updatedEmails.join(', '))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (parsedEmails.length === 0) {
      alert('Please enter at least one valid email address')
      return
    }

    try {
      const { data } = await inviteUsers({
        variables: { input: { emails: parsedEmails } },
      })
      if (data) {
        setInviteResults(data.inviteUsers)
        setEmailInput('')
        setParsedEmails([])
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
            <Stack gap='xs' style={{ width: '500px' }}>
              <Textarea
                value={emailInput}
                onChange={handleInputChange}
                size='md'
                radius='md'
                label='Member Emails'
                description='Enter email addresses separated by comma, semicolon, colon, new line, tab, or spaces'
                placeholder='e.g., user@example.com, another@example.com'
                required
                autosize
                minRows={3}
                maxRows={5}
              />
              {parsedEmails.length > 0 && (
                <Group gap='xs' wrap='wrap'>
                  {parsedEmails.map((email, index) => (
                    <Pill key={index} withRemoveButton onRemove={() => handleRemoveEmail(email)} size='lg'>
                      {email}
                    </Pill>
                  ))}
                </Group>
              )}
            </Stack>
            <Button
              radius='lg'
              px={16}
              size='md'
              style={{ width: '500px' }}
              type='submit'
              loading={loading}
              disabled={parsedEmails.length === 0}
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
