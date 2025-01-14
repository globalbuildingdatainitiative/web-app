import { Alert, Center, CenterProps } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'

interface ErrorMessageProps extends CenterProps {
  error?: { message: string } | null
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  const { error } = props

  if (!error) {
    return null
  }
  return (
    <Center {...props}>
      <Alert icon={<IconAlertCircle size='1rem' />} title='Bummer!' color='red'>
        {error.message}
      </Alert>
    </Center>
  )
}
