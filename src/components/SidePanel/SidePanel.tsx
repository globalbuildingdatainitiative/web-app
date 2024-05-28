import { useState, useEffect } from 'react'
import { AppShell, Button, Group, Stack, Title, Menu } from '@mantine/core'
import { IconAffiliate, IconChevronRight, IconDashboard, IconLogout, IconUpload, IconUser } from '@tabler/icons-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'supertokens-auth-react/recipe/emailpassword'
import { useGetUsersQuery, useGetOrganizationsQuery } from '@queries'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'

interface ButtonProps {
  name: string
  Logo: typeof IconAffiliate
  link: string
}

export const SidePanel = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('User')
  const [organization, setOrganization] = useState('<Unknown>')
  const session = useSessionContext()
  const { data: usersData } = useGetUsersQuery()
  const { data: organizationsData } = useGetOrganizationsQuery()

  const users = usersData?.users
  const organizations = organizationsData?.organizations

  const currentUserID = session?.userId ?? ''

  useEffect(() => {
    async function fetchFirstNameAndOrganization() {
      if (session.loading || !session.doesSessionExist) {
        return
      }

      try {
        const currentUser = users?.find((user) => user.id === currentUserID)
        if (currentUser && currentUser.firstName) {
          setFirstName(currentUser.firstName)
        }

        if (currentUser && currentUser.organizationId) {
          const currentOrganization = organizations?.find(
            (organization) => organization.id === currentUser.organizationId,
          )
          if (currentOrganization && currentOrganization.name) {
            setOrganization(currentOrganization.name)
          }
        }
      } catch (error) {
        console.error('Failed to fetch user metadata:', error)
      }
    }
    fetchFirstNameAndOrganization()
  }, [session, users, organizations])

  const buttons: ButtonProps[] = [
    { name: 'Dashboard', Logo: IconDashboard, link: '/' },
    { name: 'Contributions', Logo: IconUpload, link: '/contributions' },
    { name: 'Organization', Logo: IconAffiliate, link: '/organization' },
    { name: 'Profile', Logo: IconUser, link: '/profile' },
  ]

  const currentPage = buttons.find(({ link }) => link === location.pathname) || buttons[0]

  async function onLogout() {
    await signOut()
    navigate('/auth')
  }

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
      <AppShell.Section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Menu
          trigger='hover'
          openDelay={100}
          closeDelay={400}
          position='top'
          offset={8}
          withArrow
          arrowPosition='center'
        >
          <Menu.Target>
            <Button variant='outline' color='green' c='gray' size='md' radius='md'>
              {firstName} from {organization}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={onLogout}>
              <IconLogout size={18} />
              Sign Out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </AppShell.Section>
    </>
  )
}
