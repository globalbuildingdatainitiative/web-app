import { CreateOrganizationPaper, ErrorBoundary, Loading, MemberTable, Paper } from '@components'
import { Title } from '@mantine/core'
import { useUserContext, User } from '@context'

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
  return <MemberTable organizationId={user.organization.id} />
}
