import { useState } from 'react'
import { useForm } from '@mantine/form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAcceptInvitationMutation } from '@queries'
import { InvitationLayout } from '../InvitationLayout'
import { InvitationSuccess } from '../InvitationSuccess'
import { NewUserInvitationForm } from './NewUserInvitationForm'
import { FormValues } from './types.ts'

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

  const form = useForm<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      firstName: (value: string) => (value.trim() ? null : 'First name is required'),
      lastName: (value: string) => (value.trim() ? null : 'Last name is required'),
      newPassword: (value: string) => (value ? null : 'Password is required'),
      confirmPassword: (value: string, values: FormValues) =>
        value !== values.newPassword ? 'Passwords do not match' : null,
    },
  })

  const handleAccept = async (values: FormValues) => {
    if (!userId) {
      setInvitationError(new Error('Invalid invitation link. Missing user ID.'))
      return
    }

    try {
      setInvitationError(null)
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
        setInvitationError(
          new Error('Failed to accept invitation. Please try again or contact support at office@gbdi.io.'),
        )
      }
    } catch (err) {
      setInvitationError(
        err instanceof Error
          ? err
          : new Error('An unexpected error occurred. Please try again or contact support at office@gbdi.io.'),
      )
    }
  }

  return (
    <InvitationLayout title='Accept Invitation to Join GBDI' testId='NewUserInvitation'>
      {accepted ? (
        <InvitationSuccess message='Invitation accepted successfully.' />
      ) : (
        <NewUserInvitationForm form={form} onSubmit={handleAccept} loading={loading} error={invitationError} />
      )}
    </InvitationLayout>
  )
}
