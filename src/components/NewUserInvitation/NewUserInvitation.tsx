import { useState } from 'react'
import { Paper, ErrorMessage, theme } from '@components'
import { Button, MantineProvider, PasswordInput, Stack, Text, TextInput, Title, Container } from '@mantine/core'
import { isNotEmpty, matchesField, useForm } from '@mantine/form'
import logo from 'assets/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAcceptInvitationMutation } from '@queries'

export const NewUserInvitation = () => {
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

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      firstName: isNotEmpty('First name is required'),
      lastName: isNotEmpty('Last name is required'),
      newPassword: isNotEmpty('Password is required'),
      confirmPassword: matchesField('newPassword', 'Passwords do not match'),
    },
  })

  const handleAccept = async (values: typeof form.values) => {
    if (!userId) {
      setInvitationError(new Error('Invalid invitation link. Missing user ID.'))
      return
    }

    try {
      setInvitationError(null) // Clear any previous errors

      const { data } = await acceptInvitation({
        variables: {
          user: {
            id: userId,
            firstName: values.firstName,
            lastName: values.lastName,
            newPassword: values.newPassword,
          },
        },
      })

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
        {invitationError && <ErrorMessage error={invitationError} />}
        <form onSubmit={form.onSubmit(handleAccept)} style={{ width: '100%', maxWidth: '500px' }}>
          <Stack gap='md'>
            <TextInput
              label='First Name'
              placeholder='Enter your first name'
              {...form.getInputProps('firstName')}
              disabled={loading}
            />
            <TextInput
              label='Last Name'
              placeholder='Enter your last name'
              {...form.getInputProps('lastName')}
              disabled={loading}
            />
            <PasswordInput
              label='New Password'
              placeholder='Enter your new password'
              {...form.getInputProps('newPassword')}
              disabled={loading}
            />
            <PasswordInput
              label='Confirm New Password'
              placeholder='Confirm your new password'
              {...form.getInputProps('confirmPassword')}
              disabled={loading}
            />
            <Button type='submit' radius='lg' px={16} size='md' w={500} loading={loading} disabled={loading}>
              Accept Invitation and Sign Up
            </Button>
          </Stack>
        </form>
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
          <Paper data-testid='NewUserInvitation'>
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
