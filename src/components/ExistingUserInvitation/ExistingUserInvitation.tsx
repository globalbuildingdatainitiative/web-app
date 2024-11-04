import { useState } from 'react'
import { Paper } from '@components'
import { Button, Stack, Text, Title, Container } from '@mantine/core'
import logo from 'assets/logo.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { useAcceptInvitationMutation } from '@queries'

export const ExistingUserInvitation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const userId = searchParams.get('user_id')
  const [accepted, setAccepted] = useState(false)

  const [acceptInvitation, { loading, error }] = useAcceptInvitationMutation()

  const handleAccept = async () => {
    if (userId) {
      try {
        const { data } = await acceptInvitation({ variables: { user: { id: userId } } })
        if (data?.acceptInvitation) {
          setAccepted(true)
          setTimeout(() => navigate('/'), 3000)
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
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafbff',
          margin: 0,
          padding: 0,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Container size='md' style={{ margin: '0 auto' }}>
          <Paper data-testid='ExistingUserInvitation'>
            <Stack gap='xl' align='center'>
              <img src={logo} alt='Company Logo' style={{ maxWidth: '400px' }} />

              <Title order={2} ta='center' mt='md'>
                Accept Invitation to Join GBDI
              </Title>

              {!accepted ? (
                <>
                  <Text ta='center'>Click the button below to accept the invitation and sign in:</Text>
                  {error && <Text c='red'>Error: {error.message}</Text>}
                  <Button
                    radius='lg'
                    px={16}
                    size='md'
                    w={500}
                    onClick={handleAccept}
                    loading={loading}
                    color='green.9'
                  >
                    Accept Invitation and Sign In
                  </Button>
                </>
              ) : (
                <>
                  <Text ta='center'>Invitation accepted successfully.</Text>
                  <Text ta='center'>Redirecting to home page...</Text>
                </>
              )}
            </Stack>
          </Paper>
        </Container>
      </div>
    </MantineProvider>
  )
}
