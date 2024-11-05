import { useState } from 'react'
import { Paper } from '@components'
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

  const [acceptInvitation] = useAcceptInvitationMutation()

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
    if (userId) {
      try {
        // Accept invitation
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
          setTimeout(() => navigate('/'), 3000) // Redirect to home after 3 seconds
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
          <Paper data-testid='NewUserInvitation'>
            <Stack gap='xl' align='center'>
              <img src={logo} alt='Company Logo' style={{ maxWidth: '400px' }} />

              <Title order={2} ta='center' mt='md'>
                Accept Invitation to Join GBDI
              </Title>

              {!accepted ? (
                <form onSubmit={form.onSubmit(handleAccept)} style={{ width: '100%', maxWidth: '500px' }}>
                  <Stack gap='md'>
                    <TextInput
                      label='First Name'
                      placeholder='Enter your first name'
                      {...form.getInputProps('firstName')}
                    />
                    <TextInput
                      label='Last Name'
                      placeholder='Enter your last name'
                      {...form.getInputProps('lastName')}
                    />
                    <PasswordInput
                      label='New Password'
                      placeholder='Enter your new password'
                      {...form.getInputProps('newPassword')}
                    />
                    <PasswordInput
                      label='Confirm New Password'
                      placeholder='Confirm your new password'
                      {...form.getInputProps('confirmPassword')}
                    />
                    <Button type='submit' radius='lg' px={16} size='md' w={500} color='green.9'>
                      Accept Invitation and Sign Up
                    </Button>
                  </Stack>
                </form>
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
