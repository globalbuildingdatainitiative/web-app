import { useState } from 'react'
import { Paper } from '@components'
import { Button, Stack, Text, Title, Container } from '@mantine/core'
import logo from 'assets/logo.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { useRejectInvitationMutation } from '@queries'

export const RejectInvitation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const user_id = searchParams.get('user_id')
  const [rejected, setRejected] = useState(false)

  const [rejectInvitation, { loading, error }] = useRejectInvitationMutation()

  const handleReject = async () => {
    if (user_id) {
      try {
        const { data } = await rejectInvitation({ variables: { userId: user_id } })
        if (data?.rejectInvitation) {
          setRejected(true)
          setTimeout(() => navigate('/'), 3000)
        }
      } catch (err) {
        console.error('Error rejecting invitation:', err)
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
          <Paper data-testid='RejectInvitation'>
            <Stack gap='xl' align='center'>
              <img src={logo} alt='Company Logo' style={{ maxWidth: '400px' }} />

              <Title order={2} ta='center' mt='md'>
                Accept Invitation to Join GBDI
              </Title>

              {!rejected ? (
                <>
                  <Text ta='center'>Are you sure you want to reject this invitation?</Text>
                  {error && <Text c='red'>Error: {error.message}</Text>}
                  <Button radius='lg' px={16} size='md' w={500} onClick={handleReject} loading={loading} color='red.9'>
                    Reject Invitation
                  </Button>
                </>
              ) : (
                <>
                  <Text ta='center'>Invitation rejected successfully.</Text>
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
