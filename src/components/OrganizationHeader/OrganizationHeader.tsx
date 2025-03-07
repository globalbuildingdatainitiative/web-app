import { Paper, ActionButton } from '@components'
import { Center, Divider, Group, Stack, Text, useMantineTheme } from '@mantine/core'
import { useUserContext } from '@context'
import { useGetUsersQuery } from '@queries'
import { IconBuilding, IconUsers } from '@tabler/icons-react'

interface OrganizationHeaderProps {
  context: 'organization' | 'addMembers' | 'createOrganization' | 'portfolio' | 'editOrganization'
}

export const OrganizationHeader = ({ context }: OrganizationHeaderProps) => {
  const { user } = useUserContext()
  const organizationId = user?.organization?.id || ' '
  const { data: usersData } = useGetUsersQuery({
    variables: {
      filters: {
        organizationId: {
          equal: organizationId,
        },
      },
    },
  })
  const totalMembers =
    usersData?.users?.filter((user) => {
      const status = user.inviteStatus?.toLowerCase()
      return status === 'accepted' || status === 'none'
    }).length || 0
  const organizationName = user?.organization?.name || 'Unknown'
  const theme = useMantineTheme()

  return (
    <Paper data-testid='OrganizationHeader'>
      <Group align='center' justify='space-between'>
        <Divider orientation='vertical' color='white' />
        <Group align='center'>
          <IconUsers size={36} color={theme.primaryColor} />
          <Stack align='center'>
            <Text>Total Members</Text>
            <Text>{totalMembers}</Text>
          </Stack>
        </Group>
        <Divider orientation='vertical' />

        <Group align='center'>
          <IconBuilding size={36} color={theme.primaryColor} />
          <Stack align='center'>
            <Text>Organization Name</Text>
            <Text size='xl'>{organizationName}</Text>
          </Stack>
        </Group>

        {organizationName !== 'Unknown' && <Divider orientation='vertical' />}

        {context === 'organization' && organizationName !== 'Unknown' && (
          <>
            <Center>
              <ActionButton buttonName='View Organization' navigateTo='/organization/edit' />
            </Center>
            <Divider orientation='vertical' />
            <Center>
              <ActionButton buttonName='Add Members' navigateTo='/organization/addmembers' />
            </Center>
          </>
        )}

        {context === 'editOrganization' && organizationName !== 'Unknown' && (
          <>
            <Center>
              <ActionButton buttonName='View Members' navigateTo='/organization' />
            </Center>
            <Divider orientation='vertical' />
            <Center>
              <ActionButton buttonName='Add Members' navigateTo='/organization/addmembers' />
            </Center>
          </>
        )}

        {context === 'addMembers' && <ActionButton buttonName='View Members' navigateTo='/organization' />}
        <Divider orientation='vertical' color='white' />
      </Group>
    </Paper>
  )
}
