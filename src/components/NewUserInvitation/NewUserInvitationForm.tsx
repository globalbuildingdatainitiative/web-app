import { Button, Stack, PasswordInput, TextInput } from '@mantine/core'
import { ErrorMessage } from '@components'
import { UseFormReturnType } from '@mantine/form'
import { FormValues } from './types.ts'

interface NewUserInvitationFormProps {
  form: UseFormReturnType<FormValues>
  onSubmit: (values: FormValues) => void
  loading: boolean
  error: Error | null
}

export const NewUserInvitationForm = ({ form, onSubmit, loading, error }: NewUserInvitationFormProps) => (
  <form onSubmit={form.onSubmit(onSubmit)} style={{ width: '100%', maxWidth: '500px' }}>
    {error && <ErrorMessage error={error} />}
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
)
