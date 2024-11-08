import { Stack, Text } from '@mantine/core'

interface InvitationSuccessProps {
  message: string
}

export const InvitationSuccess = ({ message }: InvitationSuccessProps) => (
  <Stack align='center'>
    <Text ta='center'>{message}</Text>
    <Text ta='center'>Redirecting to home page...</Text>
  </Stack>
)
