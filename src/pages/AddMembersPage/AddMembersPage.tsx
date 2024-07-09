import { OrganizationHeader, AddMembersPaper } from '@components'
import { Stack } from '@mantine/core'

export const AddMembersPage = () => {
  return (
    <Stack>
      <OrganizationHeader context='addMembers' />
      <AddMembersPaper />
    </Stack>
  )
}
