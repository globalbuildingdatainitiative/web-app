import { Group, Title, Text, Stack } from '@mantine/core'
import { useUserContext } from '@context'
import gbdi_logo from 'assets/logo.png'
import globe_logo from 'assets/globe_logo.png'

export const Greeting = () => {
  const { user } = useUserContext()

  return (
    <header>
      <Group justify='space-between' align='flex-start' w='100%'>
        <Group pt='md'>
          <Title order={3} style={{ paddingLeft: '10px', marginTop: '10px' }}>
            Hello {user?.firstName} 👋🏼
          </Title>
          {user?.isImpersonation && (
            <Title order={3} c='red'>
              {' '}
              (Impersonating as Admin)
            </Title>
          )}
        </Group>

        <Stack align='flex-end' pr='30px' gap='xs' style={{ marginRight: '10px', marginTop: '5px' }}>
          <Text size='sm' c='dimmed'>
            Open-source, Open Data, Powered by
          </Text>
          <Group gap='md'>
            <img src={gbdi_logo} alt='Global Building Data Initiative' height={30} />
            <img src={globe_logo} alt='GLOBE' height={30} />
          </Group>
        </Stack>
      </Group>
    </header>
  )
}
