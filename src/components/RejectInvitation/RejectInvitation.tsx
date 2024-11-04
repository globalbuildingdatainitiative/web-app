import { useState } from 'react'
import { Paper, ErrorMessage, theme } from '@components'
import { Button, Stack, Text, Title, Container } from '@mantine/core'
import logo from 'assets/logo.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { useRejectInvitationMutation } from '@queries'

export const RejectInvitation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const userId = searchParams.get('user_id')
  const [rejected, setRejected] = useState(false)
  const [invitationError, setInvitationError] = useState<Error | null>(null)

  const [rejectInvitation, { loading }] = useRejectInvitationMutation({
    onError: (error) => {
      setInvitationError(error)
    },
  })

  const handleReject = async () => {
    if (!userId) {
      setInvitationError(new Error('Invalid invitation link. Missing user ID.'))
      return
    }

    try {
      setInvitationError(null) // Clear any previous errors

      const { data } = await rejectInvitation({ variables: { userId } })

      if (data?.rejectInvitation) {
        setRejected(true)
        setTimeout(() => navigate('/'), 3000)
      } else {
        setInvitationError(new Error('Failed to reject invitation. Please try again or contact support.'))
      }
    } catch (err) {
      setInvitationError(err instanceof Error ? err : new Error('An unexpected error occurred'))
      console.error('Error rejecting invitation:', err)
    }
  }

  const renderContent = () => {
    if (rejected) {
      return (
        <>
          <Text ta='center'>Invitation rejected successfully.</Text>
          <Text ta='center'>Redirecting to home page...</Text>
        </>
      )
    }

    return (
      <>
        <Text ta='center'>Are you sure you want to reject this invitation?</Text>
        {invitationError && <ErrorMessage error={invitationError} />}
        <Button
          radius='lg'
          px={16}
          size='md'
          w={500}
          onClick={handleReject}
          loading={loading}
          disabled={loading}
          color='red.9'
        >
          Reject Invitation
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
          <Paper data-testid='RejectInvitation'>
            <Stack gap='xl' align='center'>
              <img src={logo} alt='Company Logo' style={{ maxWidth: '400px' }} />

              <Title order={2} ta='center' mt='md'>
                Reject Invitation to Join GBDI
              </Title>

              {renderContent()}
            </Stack>
          </Paper>
        </Container>
      </div>
    </MantineProvider>
  )
}
