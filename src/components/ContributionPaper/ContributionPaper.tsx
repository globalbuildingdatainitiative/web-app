import { ContributionTable, CreateOrganizationPaper, ErrorBoundary, Loading, Paper } from '@components'
import { Title } from '@mantine/core'
import { useUserContext, User } from '@context'

export const ContributionPaper = () => {
  const { user } = useUserContext()
  return (
    <Paper data-testid='ContributionPaper'>
      <ErrorBoundary>
        <Title order={3} style={{ marginBottom: 8 }}>
          All Contributions
        </Title>
        <Wrapper user={user} />
      </ErrorBoundary>
    </Paper>
  )
}

const Wrapper = ({ user }: { user: User | null }) => {
  if (!user) return <Loading />
  if (!user.organization) return <CreateOrganizationPaper />
  return <ContributionTable />
}
