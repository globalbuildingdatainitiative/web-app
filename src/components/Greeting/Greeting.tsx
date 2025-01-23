import { Group, Title } from '@mantine/core'
import { useUserContext } from '@context'

export const Greeting = () => {
  const { user } = useUserContext()

  return (
    <Group pt='md'>
      <Title order={3}>Hello {user?.firstName} 👋🏼</Title>
      {user?.isImpersonation && (
        <Title order={3} c='red'>
          {' '}
          (Impersonating as Admin)
        </Title>
      )}
    </Group>
  )
}
