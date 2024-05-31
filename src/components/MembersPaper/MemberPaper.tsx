import { ErrorBoundary, Paper } from '@components'
import { Title } from '@mantine/core'
import { MemberTable } from '@components'
import { useGetUsersQuery } from '@queries'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'

export const MemberPaper = () => {
  const { data: usersData } = useGetUsersQuery()
  const session = useSessionContext()
  const users = usersData?.users
  let currentOrganizationId

  if (!session.loading) {
    const currentUserID = session.userId
    const currentUser = users?.find((user) => user.id === currentUserID)
    currentOrganizationId = currentUser?.organizationId
  }
  return (
    <Paper data-testid='MemberPaper'>
      <ErrorBoundary>
        <Title order={2}>All Members</Title>
        <MemberTable organizationId={currentOrganizationId} />
      </ErrorBoundary>
    </Paper>
  )
}
