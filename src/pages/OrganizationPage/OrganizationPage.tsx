import { MemberPaper, OrganizationHeader } from '@components'
import { Stack } from '@mantine/core'

export const OrganizationPage = () => {
  return (
    <Stack>
      <OrganizationHeader />
      <MemberPaper />
    </Stack>
  )
}
