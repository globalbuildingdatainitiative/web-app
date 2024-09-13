import { useState } from 'react'
import { Paper } from '@components'
import { Button, Group, Stack, Text } from '@mantine/core'
import logo from 'assets/logo.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { useRejectInvitationMutation } from '@queries'


export const RejectInvitePaper = () => {
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
          setTimeout(() => navigate('/'), 3000) // Redirect to home after 3 seconds
        }
        else {
          console.error('Failed to reject invitation')
        }
      } catch (err) {
        console.error('Error rejecting invitation:', err)
      }
    }
  }

  return (
    <MantineProvider>
      <Paper data-testid='RejectInvitePaper'>
        <Group>
          <img src={logo} alt='Company Logo' style={{ maxWidth: '400px' }} />
          <Stack align='center' gap='xl'>
            {!rejected ? (
              <>
                <Text>Are you sure you want to reject this invitation?</Text>
                {error && <Text c="red">Error: {error.message}</Text>}
                <Button
                  color='red'
                  radius='lg'
                  px={16}
                  size='md'
                  style={{ width: '500px' }}
                  onClick={handleReject}
                  loading={loading}
                >
                  Reject Invitation
                </Button>
              </>
            ) : (
              <>
                <Text>Invitation rejected successfully.</Text>
                <Text>Redirecting to home page...</Text>
              </>
            )}
          </Stack>
        </Group>
      </Paper>
    </MantineProvider>
  )
}