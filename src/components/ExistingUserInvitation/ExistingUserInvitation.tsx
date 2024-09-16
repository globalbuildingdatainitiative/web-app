import { useState } from 'react'
import { Paper } from '@components'
import { Button, Group, Stack, Text } from '@mantine/core'
import logo from 'assets/logo.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { useAcceptInvitationMutation } from '@queries'

export const ExistingUserInvitation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const user_id = searchParams.get('user_id')
  const [accepted, setAccepted] = useState(false)

  const [acceptInvitation, { loading, error }] = useAcceptInvitationMutation()

  const handleAccept = async () => {
    if (user_id) {
      try {
        const { data } = await acceptInvitation({ variables: { userId: user_id } })
        if (data?.acceptInvitation) {
          setAccepted(true)
          setTimeout(() => navigate('/'), 3000) // Redirect to home after 3 seconds
        } else {
          console.error('Failed to accept invitation')
        }
      } catch (err) {
        console.error('Error accepting invitation:', err)
      }
    }
  }

  return (
    <MantineProvider>
      <Paper data-testid='ExistingUserInvitation'>
        <Group>
          <img src={logo} alt='Company Logo' style={{ maxWidth: '400px' }} />
          <Stack align='center' gap='xl'>
            {!accepted ? (
              <>
                <Text>Click the button below to accept the invitation and sign in:</Text>
                {error && <Text c='red'>Error: {error.message}</Text>}
                <Button
                  color='green'
                  radius='lg'
                  px={16}
                  size='md'
                  style={{ width: '500px' }}
                  onClick={handleAccept}
                  loading={loading}
                >
                  Accept Invitation and Sign In
                </Button>
              </>
            ) : (
              <>
                <Text>Invitation accepted successfully.</Text>
                <Text>Redirecting to home page...</Text>
              </>
            )}
          </Stack>
        </Group>
      </Paper>
    </MantineProvider>
  )
}
