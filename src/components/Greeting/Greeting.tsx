import { Title } from '@mantine/core'
import { useUserContext } from '@context'

export const Greeting = () => {
  const { user } = useUserContext()

  return (
    <Title order={3} style={{ paddingTop: 16 }}>
      Hello {user?.firstName} 👋🏼
    </Title>
  )
}
