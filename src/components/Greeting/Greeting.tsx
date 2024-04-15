import { Title } from '@mantine/core'

export const Greeting = () => {
  const name = 'Hassan'
  return (
    <Title order={3} style={{ paddingTop: 16 }}>
      Hello {name} 👋🏼
    </Title>
  )
}
