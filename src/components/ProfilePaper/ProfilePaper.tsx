import { ErrorBoundary, Paper } from '@components'
import { Title } from '@mantine/core'

export const ProfilePaper = () => {
  return (
    <Paper data-testid='ProfilePaper'>
      <Title order={3} style={{ marginBottom: 8 }}>
        Profile
      </Title>
      <ErrorBoundary>
        <p>Here Profile charts will be displayed</p>
      </ErrorBoundary>
    </Paper>
  )
}
