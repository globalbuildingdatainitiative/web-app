import { Title, Group, Text } from '@mantine/core'
import { useUserContext } from '@context'
import gbdi_logo from 'assets/logo.png'
import globe_logo from 'assets/globe_logo.png'

export const Greeting = () => {
  const { user } = useUserContext()

  return (
    <header>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title order={3} style={{ paddingLeft: '10px' }}>
          Hello {user?.firstName} 👋🏼
        </Title>

        <div style={{ textAlign: 'right', paddingRight: '30px' }}>
          <Text size='sm' c='dimmed' style={{ marginBottom: 1 }}>
            Open-source, open data. Powered by
          </Text>
          <Group gap='md' align='right'>
            <img src={gbdi_logo} alt='...' height={40} />
            <img src={globe_logo} alt='...' height={40} />
          </Group>
        </div>
      </div>
    </header>
  )
}
