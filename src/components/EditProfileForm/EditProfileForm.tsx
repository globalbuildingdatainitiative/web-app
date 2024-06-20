import { Paper } from '@components'
import { Button, Group, PasswordInput, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useGetUsersQuery, useUpdateUserMutation } from '@queries'
import { useNavigate } from 'react-router-dom'

interface UserInputValues {
  firstName: string
  lastName: string
  email: string
  currentPassword: string
  newPassword: string
}

export const EditProfileForm = () => {
  const { data: usersData } = useGetUsersQuery()
  const [updateUser] = useUpdateUserMutation()
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      firstName: usersData?.users[0]?.firstName || '',
      lastName: usersData?.users[0]?.lastName || '',
      email: usersData?.users[0]?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },

    validate: {
      firstName: (value) => (value ? null : 'First name is required'),
      lastName: (value) => (value ? null : 'Last name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      newPassword: (value, values) => (value !== values.confirmPassword ? 'Passwords did not match' : null),
      confirmPassword: (value, values) => (value !== values.newPassword ? 'Passwords did not match' : null),
    },
  })

  const handleSubmit = async (values: UserInputValues) => {
    try {
      console.log('values', values)
      console.log('usersData', usersData?.users[0]?.id)
      await updateUser({
        variables: {
          userInput: {
            id: usersData?.users[0]?.id,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        },
      })
      console.log('About to be redirected')
      navigate('/')
      console.log('Navigated to /')
    } catch (error) {
      console.log('Error Caught')
      console.error(error)
    }
  }

  return (
    <Paper data-testid='EditProfileForm'>
      <Title order={3} mb='md'>
        Edit Profile
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label='First Name' placeholder='Your first name' {...form.getInputProps('firstName')} mb='sm' />
        <TextInput label='Last Name' placeholder='Your last name' {...form.getInputProps('lastName')} mb='sm' />
        <TextInput
          label='Email Address'
          placeholder='Your email'
          {...form.getInputProps('email')}
          mb='sm'
          //disabled
        />
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
          <Button color='green' radius='sm' px={16} type='submit'>
            Save Changes
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
