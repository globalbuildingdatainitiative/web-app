import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAcceptInvitationMutation } from '@queries'
import { InvitationLayout } from '../InvitationLayout'
import { InvitationSuccess } from '../InvitationSuccess'
import { ExistingUserInvitationForm } from './ExisitngUserInvitationForm.tsx'

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
      setInvitationError(null)
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

  return (
    <InvitationLayout title='Accept Invitation to Join GBDI' testId='ExistingUserInvitation'>
      {accepted ? (
        <InvitationSuccess message='Invitation accepted successfully.' />
      ) : (
        <ExistingUserInvitationForm onAccept={handleAccept} loading={loading} error={invitationError} />
      )}
    </InvitationLayout>
  )
}
