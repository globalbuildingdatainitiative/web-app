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
  const renderButton = (buttonName: string, navigateTo: string) => {
    return (
      <Button
        color='green'
        radius='sm'
        px={16}
        onClick={() => navigate(navigateTo)}
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
      <Group grow align='center'>
        <Group align='center'>
          <IconUser size={48} color='#00A859' />
          <Stack align='center'>
            <Text>Total Members</Text>
            <Text>{totalMembers}</Text>
          </Stack>
        </Group>
        <Divider orientation='vertical' />

        <Group align='center'>
          <IconBuilding size={48} color='#00A859' />
          <Stack align='center'>
            <Text>Organization Name</Text>
            <Text size='xl'>{organizationName}</Text>
          </Stack>
        </Group>
        <Divider orientation='vertical' />
        <Group align='center'>
          {context === 'organization' && organizationName !== 'Unknown' && (
            <>{renderButton('Add Members', '/organization/addmembers')}</>
          )}
          {context === 'organization' && organizationName === 'Unknown' && null}
          {context === 'addMembers' && <>{renderButton('View Members', '/organization')}</>}
        </Group>
      </Group>
    </Paper>
  )
}
