import { ContributionHeader, ProfilePaper, EditProfileForm } from '@components'
import { Grid, Stack } from '@mantine/core'

export const ProfilePage = () => {
  return (
    <Stack>
      <ContributionHeader />
      <Grid>
        <Grid.Col span={8}>
          <ProfilePaper />
        </Grid.Col>
        <Grid.Col span={4}>
          <EditProfileForm />
        </Grid.Col>
      </Grid>
    </Stack>
  )
}
