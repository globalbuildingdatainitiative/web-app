import { CreateOrganizationHeader, CreateOrganizationPaper } from '@components'
import { Stack } from '@mantine/core'

export const CreateOrganizationPage = () => {
  return (
    <Stack>
      <CreateOrganizationHeader />
      <CreateOrganizationPaper />
    </Stack>
  )
}
