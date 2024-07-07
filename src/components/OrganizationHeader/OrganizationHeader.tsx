import { Paper } from '@components'
import { Button, Divider, Group, Stack, Text } from '@mantine/core'
import { useUserContext } from '@context'
import { useGetUsersQuery } from '@queries'
import { useNavigate } from 'react-router-dom'
import { IconBuilding, IconUser } from '@tabler/icons-react'

interface OrganizationHeaderProps {
  context: 'organization' | 'addMembers' | 'createOrganization'
}

export const OrganizationHeader = ({ context }: OrganizationHeaderProps) => {
  const navigate = useNavigate()
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
  const totalMembers = usersData?.users?.length || 0
  const organizationName = user?.organization?.name || 'Unknown'
  const renderButton = (buttonName: string, navigateTo: string, isEnabled: boolean) => {
    return (
      <Button
        color={isEnabled ? 'green' : 'gray'}
        radius='sm'
        px={16}
        onClick={() => navigate(navigateTo)}
        disabled={!isEnabled}
        styles={(theme) => ({
          root: {
            boxShadow: theme.shadows.sm,
          },
        })}
      >
        {buttonName}
      </Button>
    )
  }

  return (
    <Paper data-testid='OrganizationHeader'>
      <Group justify='space-between' align='center'>
        <Group justify='space-between' align='center'>
          <IconUser size={48} color='#00A859' />
          <Stack align='center'>
            <Text>Total Members</Text>
            <Text>{totalMembers}</Text>
          </Stack>
        </Group>
        <Divider orientation='vertical' />

        <Group justify='space-between' align='center'>
          <IconBuilding size={48} color='#00A859' />
          <Stack align='center'>
            <Text>Organization Name</Text>
            <Text size='xl'>{organizationName}</Text>
          </Stack>
        </Group>
        <Divider orientation='vertical' />

        {context === 'organization' && (
          <>
            {renderButton('Create Organization', '/organization/new', true)}
            <Divider orientation='vertical' />
            {renderButton('Add Members', '/organization/addmembers', true)}
          </>
        )}
        {context === 'createOrganization' && (
          <>
            {renderButton('View Members', '/organization', false)}
            <Divider orientation='vertical' />
            {renderButton('Add Members', '/organization/addmembers', false)}
          </>
        )}
        {context === 'addMembers' && (
          <>
            {renderButton('View Members', '/organization', true)}
            <Divider orientation='vertical' />
            {renderButton('Add Members', '/organization/addmembers', false)}
          </>
        )}
      </Group>
    </Paper>
  )
}
