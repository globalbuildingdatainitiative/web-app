import { Paper } from '@components'
import { Button, Group, PasswordInput, TextInput, Title, Alert } from '@mantine/core'
import { isEmail, useForm } from '@mantine/form'
import { GetCurrentUserDocument, useUpdateUserMutation } from '@queries'
import { useUserContext } from '@context'
import { useState } from 'react'

interface UserInputValues {
  firstName: string
  lastName: string
  email: string
  currentPassword: string
  newPassword: string
}

export const EditProfileForm = () => {
  const { user } = useUserContext()
  const [updateUser] = useUpdateUserMutation({
    refetchQueries: [{ query: GetCurrentUserDocument, variables: { id: user?.id } }],
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },

    validate: {
      firstName: (value) => (value ? null : 'First name is required'),
      lastName: (value) => (value ? null : 'Last name is required'),
      email: isEmail('Invalid email'),
      newPassword: (value, values) => (value !== values.confirmPassword ? 'Passwords did not match' : null),
      confirmPassword: (value, values) => (value !== values.newPassword ? 'Passwords did not match' : null),
    },
  })

  const handleSubmit = async (values: UserInputValues) => {
    try {
      await updateUser({
        variables: {
          userInput: {
            id: user?.id,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        },
      })
      form.resetDirty()
      setErrorMessage(null)
    } catch (error) {
      console.error(error)
      setErrorMessage(
        'An error occurred while updating your profile. Please try again. If the problem persists, contact support at office@gbdi.io.',
      )
    }
  }

  return (
    <Paper data-testid='EditProfileForm'>
      <Title order={3} mb='md'>
        Edit Profile
      </Title>
      {errorMessage && (
        <Alert color='red' mb='md'>
          {errorMessage}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label='First Name' placeholder='Your first name' {...form.getInputProps('firstName')} mb='sm' />
        <TextInput label='Last Name' placeholder='Your last name' {...form.getInputProps('lastName')} mb='sm' />
        <TextInput label='Email Address' placeholder='Your email' {...form.getInputProps('email')} mb='sm' />
        <PasswordInput
          label='Current Password'
          placeholder='Current password'
          {...form.getInputProps('currentPassword')}
          mb='sm'
        />
        <PasswordInput label='New Password' placeholder='New password' {...form.getInputProps('newPassword')} mb='sm' />
        <PasswordInput
          label='Confirm New Password'
          placeholder='Confirm new password'
          {...form.getInputProps('confirmPassword')}
          mb='md'
        />
        <Group mt='md'>
          <Button variant='default'>Cancel</Button>
          <Button color='green' radius='sm' px={16} type='submit' disabled={!form.isDirty()}>
            Save Changes
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
