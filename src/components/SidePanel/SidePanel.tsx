import { AppShell, Button, Group, Stack, Title } from '@mantine/core'
import { IconAffiliate, IconChevronRight, IconDashboard, IconUpload, IconUser } from '@tabler/icons-react'
import { useLocation, useNavigate } from 'react-router-dom'

interface ButtonProps {
  name: string
  Logo: typeof IconAffiliate
  link: string
}

export const SidePanel = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const buttons: ButtonProps[] = [
    { name: 'Dashboard', Logo: IconDashboard, link: '/' },
    { name: 'Contributions', Logo: IconUpload, link: '/contributions' },
    { name: 'Organization', Logo: IconAffiliate, link: '/organization' },
    { name: 'Profile', Logo: IconUser, link: '/profile' },
  ]

  const currentPage = buttons.find(({ link }) => link === location.pathname) || buttons[0]

  return (
    <>
      <AppShell.Section>
        <Group>
          <currentPage.Logo stroke={2} size={38} />
          <Title order={2}>{currentPage.name}</Title>
        </Group>
      </AppShell.Section>
      <AppShell.Section grow mt={30}>
        <Stack style={{ marginTop: 5 }}>
          {buttons.map(({ name, Logo, link }, index) => (
            <Button
              key={index}
              variant={location.pathname === link ? 'filled' : 'transparent'}
              color={location.pathname === link ? 'violet' : 'gray'}
              leftSection={<Logo stroke={2} />}
              rightSection={<IconChevronRight size={16} />}
              onClick={() => navigate(link)}
              justify='space-between'
            >
              {name}
            </Button>
          ))}
        </Stack>
      </AppShell.Section>
      <AppShell.Section>Hassan from EPFL</AppShell.Section>
    </>
  )
}
