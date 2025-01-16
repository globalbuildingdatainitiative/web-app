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
  IconUserStar,
} from '@tabler/icons-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SignOut } from '../SignOut'
import { theme } from '@components'
import { hasRole } from '../../lib/permissions.ts'
import { Role, useUserContext } from '@context'

interface ButtonProps {
  name: string
  Logo: typeof IconAffiliate
  link: string
  roles: Role[]
}

interface SidePanelProps {
  collapsed: boolean
  toggleCollapsed: () => void
}

export const SidePanel = ({ collapsed, toggleCollapsed }: SidePanelProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useUserContext()

  const buttons: ButtonProps[] = [
    { name: 'Dashboard', Logo: IconDashboard, link: '/', roles: [] },
    { name: 'Portfolio', Logo: IconChartHistogram, link: '/portfolio', roles: [] },
    { name: 'Contributions', Logo: IconUpload, link: '/contributions', roles: [] },
    { name: 'Organization', Logo: IconAffiliate, link: '/organization', roles: [] },
    { name: 'Profile', Logo: IconUser, link: '/profile', roles: [] },
    { name: 'Admin', Logo: IconUserStar, link: '/admin', roles: ['admin'] },
  ]

  const currentPage = buttons.find(({ link }) => link === location.pathname) || buttons[0]
  const onCurrentPage = (link: string) =>
    (location.pathname.startsWith(link) && link !== '/') || location.pathname === link

  return (
    <div
      style={{
        width: collapsed ? '80px' : '250px',
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
          {buttons
            .filter(({ roles }) => roles.length === 0 || roles.some((role) => hasRole(user!, role)))
            .map(({ name, Logo, link }, index) => (
              <Button
                key={index}
                variant={onCurrentPage(link) ? 'filled' : 'transparent'}
                color={onCurrentPage(link) ? theme?.primaryColor : 'gray'}
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
