import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRejectInvitationMutation } from '@queries'
import { InvitationLayout } from '../InvitationLayout'
import { InvitationSuccess } from '../InvitationSuccess'
import { RejectInvitationForm } from './RejectInvitationForm'

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
      setInvitationError(null)
      const { data } = await rejectInvitation({ variables: { userId } })

      if (data?.rejectInvitation) {
        setRejected(true)
        setTimeout(() => navigate('/'), 3000)
      } else {
        setInvitationError(new Error('Failed to reject invitation. Please try again or contact support.'))
      }
    } catch (err) {
      setInvitationError(err instanceof Error ? err : new Error('An unexpected error occurred'))
    }
  }

  return (
    <InvitationLayout title='Reject Invitation to Join GBDI' testId='RejectInvitation'>
      {rejected ? (
        <InvitationSuccess message='Invitation rejected successfully.' />
      ) : (
        <RejectInvitationForm onReject={handleReject} loading={loading} error={invitationError} />
      )}
    </InvitationLayout>
  )
}
