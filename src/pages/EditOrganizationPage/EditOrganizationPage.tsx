import { OrganizationHeader, EditOrganizationForm } from '@components'
import { Stack } from '@mantine/core'

export const EditOrganizationPage = () => {
  return (
    <Stack>
      <OrganizationHeader context='editOrganization' />
      <EditOrganizationForm />
    </Stack>
  )
}
