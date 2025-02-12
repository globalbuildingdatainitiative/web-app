import { Button, Stack, Text } from '@mantine/core'
import { ErrorMessage } from '@components'

interface ExistingUserInvitationFormProps {
  onAccept: () => void
  loading: boolean
  error: Error | null
}

export const ExistingUserInvitationForm = ({ onAccept, loading, error }: ExistingUserInvitationFormProps) => (
  <Stack align='center'>
    <Text ta='center'>Click the button below to accept the invitation and sign in:</Text>
    {error && (
      <ErrorMessage
        error={{ message: `${error.message}. If the problem persists, contact support at office@gbdi.io.` }}
      />
    )}
    <Button radius='lg' px={16} size='md' w={500} onClick={onAccept} loading={loading} disabled={loading}>
      Accept Invitation and Sign In
    </Button>
  </Stack>
)
