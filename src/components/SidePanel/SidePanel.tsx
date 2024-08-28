import { AppShell, Button, Group, Stack, Title } from '@mantine/core'
import { IconAffiliate, IconChevronRight, IconDashboard, IconUpload, IconUser } from '@tabler/icons-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SignOut } from '../SignOut'

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
  const onCurrentPage = (link: string) =>
    (location.pathname.startsWith(link) && link !== '/') || location.pathname === link

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
              variant={onCurrentPage(link) ? 'filled' : 'transparent'}
              color={onCurrentPage(link) ? 'violet' : 'gray'}
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
      <AppShell.Section style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
        <SignOut />
      </AppShell.Section>
    </>
  )
}
