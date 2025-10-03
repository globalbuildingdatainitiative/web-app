import { ActionIcon, AppShell, Button, Group, Stack, Title } from '@mantine/core'
import {
  IconAffiliate,
  IconChevronRight,
  IconDashboard,
  IconUpload,
  IconUser,
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarLeftCollapse,
  IconChartBar,
  IconChartHistogram,
  IconUserStar,
  IconListDetails,
  type Icon,
  IconTableOptions,
} from '@tabler/icons-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { theme, SignOut } from '@components'
import { hasRole } from '@lib'
import { useUserContext } from '@context'
import { Role } from '@queries'

interface MenuItem {
  name: string
  Logo: Icon
  link: string
  roles: Role[]
}

interface MenuSection {
  name: string
  items: MenuItem[]
}

interface SidePanelProps {
  collapsed: boolean
  toggleCollapsed: () => void
}

export const SidePanel = ({ collapsed, toggleCollapsed }: SidePanelProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useUserContext()

  const menuSections: MenuSection[] = [
    {
      name: 'Global Database',
      items: [
        { name: 'Dashboard', Logo: IconDashboard, link: '/', roles: [] },
        { name: 'Plot Designer', Logo: IconTableOptions, link: '/plot-designer', roles: [] },
      ],
    },
    {
      name: 'Portfolio Analysis',
      items: [
        { name: 'Attributes', Logo: IconChartBar, link: '/portfolio/attributes', roles: [] },
        { name: 'Carbon Intensity', Logo: IconChartHistogram, link: '/portfolio/carbon-intensity', roles: [] },
      ],
    },
    {
      name: 'Project Analysis',
      items: [{ name: 'Benchmarking', Logo: IconListDetails, link: '/details', roles: [] }],
    },
    {
      name: 'Management',
      items: [
        { name: 'Contributions', Logo: IconUpload, link: '/contributions', roles: [] },
        { name: 'Organization', Logo: IconAffiliate, link: '/organization', roles: [] },
        { name: 'Profile', Logo: IconUser, link: '/profile', roles: [] },
      ],
    },
    {
      name: 'Admin',
      items: [{ name: 'Admin', Logo: IconUserStar, link: '/admin', roles: [Role.ADMIN] }],
    },
  ]

  const onCurrentPage = (link: string) =>
    (location.pathname.startsWith(link) && link !== '/') || location.pathname === link

  // Find current page item for header display
  const currentPageItem =
    menuSections.flatMap((section) => section.items).find((item) => onCurrentPage(item.link)) ||
    menuSections[0].items[0]

  return (
    <div
      style={{
        width: collapsed ? '80px' : '250px',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#fff',
        overflow: 'auto',
      }}
    >
      <AppShell.Section>
        {!collapsed ? (
          <Group style={{ justifyContent: 'center' }}>
            <currentPageItem.Logo stroke={2} size={25} />
            <Title order={4}>{currentPageItem.name}</Title>
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
          {menuSections
            .map((section) => ({
              ...section,
              items: section.items.filter(
                ({ roles }) => roles.length === 0 || roles.some((role) => hasRole(user!, role)),
              ),
            }))
            .filter((section) => section.items.length > 0)
            .map((section) => (
              <div key={section.name}>
                {!collapsed && (
                  <Title
                    order={6}
                    style={{
                      padding: '10px 20px',
                      color: theme?.colors?.gray?.[6] || '#666',
                      textTransform: 'uppercase' as const,
                      fontSize: '0.75rem',
                    }}
                  >
                    {section.name}
                  </Title>
                )}
                <Stack gap={0}>
                  {section.items.map(({ name, Logo, link }, index) => (
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
              </div>
            ))}
        </Stack>
      </AppShell.Section>

      <AppShell.Section>
        <SignOut collapsed={collapsed} />
      </AppShell.Section>
    </div>
  )
}
