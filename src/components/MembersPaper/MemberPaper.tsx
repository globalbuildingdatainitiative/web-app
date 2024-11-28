import { CreateOrganizationPaper, ErrorBoundary, InviteesTable, Loading, MemberTable, Paper } from '@components'
import { Title, Tabs, rem } from '@mantine/core'
import { useUserContext, User } from '@context'
import { IconUsers, IconUserPlus } from '@tabler/icons-react'

export const MemberPaper = () => {
  const { user } = useUserContext()

  return (
    <Paper data-testid='MemberPaper'>
      <ErrorBoundary>
        <Title order={2}>All Members</Title>
        <Wrapper user={user} />
      </ErrorBoundary>
    </Paper>
  )
}

const Wrapper = ({ user }: { user: User | null }) => {
  if (!user) return <Loading />
  if (!user.organization) return <CreateOrganizationPaper />

  const iconStyle = { width: rem(12), height: rem(12) }

  return (
    <Tabs defaultValue='members' keepMounted={false}>
      <Tabs.List>
        <Tabs.Tab value='members' leftSection={<IconUsers style={iconStyle} />}>
          Members
        </Tabs.Tab>
        <Tabs.Tab value='invitees' leftSection={<IconUserPlus style={iconStyle} />}>
          Invited
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='members'>
        <MemberTable organizationId={user.organization.id} />
      </Tabs.Panel>

      <Tabs.Panel value='invitees'>
        <InviteesTable organizationId={user.organization.id} />
      </Tabs.Panel>
    </Tabs>
  )
}
