import { Button, Stack, Text } from '@mantine/core'
import { ErrorMessage } from '@components'

interface RejectInvitationFormProps {
  onReject: () => void
  loading: boolean
  error: Error | null
}

export const RejectInvitationForm = ({ onReject, loading, error }: RejectInvitationFormProps) => (
  <Stack align='center'>
    <Text ta='center'>Are you sure you want to reject this invitation?</Text>
    {error && <ErrorMessage error={error} />}
    <Button radius='lg' px={16} size='md' w={500} onClick={onReject} loading={loading} disabled={loading} color='red.9'>
      Reject Invitation
    </Button>
  </Stack>
)
