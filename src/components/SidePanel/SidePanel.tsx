import { ActionIcon, AppShell, Button, Group, Stack, Title } from '@mantine/core'
import {
  IconAffiliate,
  IconChevronRight,
  IconDashboard,
  IconUpload,
  IconUser,
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarLeftCollapse,
  IconChartHistogram,
} from '@tabler/icons-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SignOut } from '../SignOut'

interface ButtonProps {
  name: string
  Logo: typeof IconAffiliate
  link: string
}

interface SidePanelProps {
  collapsed: boolean
  toggleCollapsed: () => void
}

export const SidePanel = ({ collapsed, toggleCollapsed }: SidePanelProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  const buttons: ButtonProps[] = [
    { name: 'Dashboard', Logo: IconDashboard, link: '/' },
    { name: 'Contributions', Logo: IconUpload, link: '/contributions' },
    { name: 'Organization', Logo: IconAffiliate, link: '/organization' },
    { name: 'Portfolio', Logo: IconChartHistogram, link: '/portfolio' },
    { name: 'Profile', Logo: IconUser, link: '/profile' },
  ]

  const currentPage = buttons.find(({ link }) => link === location.pathname) || buttons[0]
  const onCurrentPage = (link: string) =>
    (location.pathname.startsWith(link) && link !== '/') || location.pathname === link

  return (
    <div
      style={{
        width: collapsed ? '80px' : '250px',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#fff',
      }}
    >
      <AppShell.Section>
        {!collapsed ? (
          <Group style={{ justifyContent: 'center' }}>
            <currentPage.Logo stroke={2} size={30} />
            <Title order={2}>{currentPage.name}</Title>
            <ActionIcon onClick={toggleCollapsed} variant='transparent' color='gray'>
              <IconLayoutSidebarLeftCollapse size={29} />
            </ActionIcon>
          </Group>
        ) : (
          <Button onClick={toggleCollapsed} variant='transparent' color='gray' style={{ alignSelf: 'flex-start' }}>
            <IconLayoutSidebarLeftExpand size={29} />
          </Button>
        )}
      </AppShell.Section>

      <AppShell.Section grow mt={30}>
        <Stack style={{ marginTop: 5 }}>
          {buttons.map(({ name, Logo, link }, index) => (
            <Button
              key={index}
              variant={onCurrentPage(link) ? 'filled' : 'transparent'}
              color={onCurrentPage(link) ? 'violet' : 'gray'}
              leftSection={<Logo stroke={2} size={collapsed ? 28 : 24} />}
              rightSection={!collapsed && <IconChevronRight size={16} />}
              onClick={() => navigate(link)}
              justify={collapsed ? 'center' : 'space-between'}
              style={{ paddingLeft: collapsed ? '15px' : '20px' }}
            >
              {!collapsed && name}
            </Button>
          ))}
        </Stack>
      </AppShell.Section>

      <AppShell.Section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 'auto',
          marginBottom: '20px',
        }}
      >
        <SignOut collapsed={collapsed} />
      </AppShell.Section>
    </div>
  )
}
