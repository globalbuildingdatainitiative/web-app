import { ErrorBoundary, Paper } from '@components'
import { UserContributionsChart } from '@components'

export const ProfilePaper = () => {
  return (
    <Paper data-testid='ProfilePaper'>
      <ErrorBoundary>
        <UserContributionsChart />
      </ErrorBoundary>
    </Paper>
  )
}
