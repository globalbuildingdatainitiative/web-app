import { OrganizationHeader, CreateOrganizationPaper } from '@components'
import { Stack } from '@mantine/core'

export const CreateOrganizationPage = () => {
  return (
    <Stack>
      <OrganizationHeader context='createOrganization' />
      <CreateOrganizationPaper />
    </Stack>
  )
}
