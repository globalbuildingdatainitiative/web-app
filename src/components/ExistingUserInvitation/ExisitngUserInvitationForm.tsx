import { Button, Stack, Text } from '@mantine/core'
import { ErrorMessage } from '@components'
import { makeErrorFromOptionalString } from 'lib/uiUtils/errors'

interface ExistingUserInvitationFormProps {
  onAccept: () => void
  loading: boolean
  error: Error | null
}

export const ExistingUserInvitationForm = ({ onAccept, loading, error }: ExistingUserInvitationFormProps) => (
  <Stack align='center'>
    <Text ta='center'>Click the button below to accept the invitation and sign in:</Text>

    {error && <ErrorMessage error={makeErrorFromOptionalString(error.message)} />}
    
    <Button radius='lg' px={16} size='md' w={500} onClick={onAccept} loading={loading} disabled={loading}>
      Accept Invitation and Sign In
    </Button>
  </Stack>
)
