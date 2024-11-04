import { useState } from 'react'
import { Paper, ErrorMessage, theme } from '@components'
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
  const [invitationError, setInvitationError] = useState<Error | null>(null)

  const [acceptInvitation, { loading }] = useAcceptInvitationMutation({
    onError: (error) => {
      setInvitationError(error)
    },
  })

  const handleAccept = async () => {
    if (!userId) {
      setInvitationError(new Error('Invalid invitation link. Missing user ID.'))
      return
    }

    try {
      setInvitationError(null) // Clear any previous errors
      const { data } = await acceptInvitation({ variables: { user: { id: userId } } })

      if (data?.acceptInvitation) {
        setAccepted(true)
        setTimeout(() => navigate('/'), 3000)
      } else {
        setInvitationError(new Error('Failed to accept invitation. Please try again or contact support.'))
      }
    } catch (err) {
      setInvitationError(err instanceof Error ? err : new Error('An unexpected error occurred'))
    }
  }

  const renderContent = () => {
    if (accepted) {
      return (
        <>
          <Text ta='center'>Invitation accepted successfully.</Text>
          <Text ta='center'>Redirecting to home page...</Text>
        </>
      )
    }

    return (
      <>
        <Text ta='center'>Click the button below to accept the invitation and sign in:</Text>
        {invitationError && <ErrorMessage error={invitationError} />}
        <Button radius='lg' px={16} size='md' w={500} onClick={handleAccept} loading={loading} disabled={loading}>
          Accept Invitation and Sign In
        </Button>
      </>
    )
  }

  return (
    <MantineProvider theme={theme}>
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

              {renderContent()}
            </Stack>
          </Paper>
        </Container>
      </div>
    </MantineProvider>
  )
}
