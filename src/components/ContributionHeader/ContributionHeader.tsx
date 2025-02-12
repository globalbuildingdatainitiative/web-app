import { ActionButton, Paper, theme } from '@components'
import { Divider, Group, Text, Stack, Center, Skeleton } from '@mantine/core'
import { useGetContributionsForHeaderQuery } from '@queries'
import dayjs from 'dayjs'
import { IconStack3, IconCalendarMonth } from '@tabler/icons-react'
import { useUserContext } from '@context'

export const ContributionHeader = () => {
  const { user: currentUser } = useUserContext()
  const { data, loading, error } = useGetContributionsForHeaderQuery()

  if (error)
    return <div>Error loading data. Please try again. If the problem persists, contact support at office@gbdi.io</div>

  const userContributions = data?.contributions?.items?.filter((item) => item.user?.id === currentUser?.id) || []
  const sortedContributions = [...userContributions].sort(
    (a, b) => dayjs(b.uploadedAt).valueOf() - dayjs(a.uploadedAt).valueOf(),
  )
  const totalContributions = data?.contributions?.count || 0
  const lastContributionDate = sortedContributions[0]?.uploadedAt || null
  const daysSinceLastContribution = lastContributionDate
    ? Math.max(0, dayjs().startOf('day').diff(dayjs(lastContributionDate).startOf('day'), 'day'))
    : 'N/A'

  return (
    <Paper data-testid='ContributionHeader'>
      <Group justify='space-between' align='center'>
        <Divider orientation='vertical' color='white' />
        <Group align='center'>
          <IconStack3 size={36} color={theme.primaryColor} />
          <Stack align='center'>
            <Text> Total Contributions </Text>
            <Skeleton visible={loading} height={24} radius='sm'>
              <Text style={{ textAlign: 'center' }}>{totalContributions}</Text>
            </Skeleton>
          </Stack>
        </Group>
        <Divider orientation='vertical' />

        <Group align='center'>
          <IconCalendarMonth size={36} color={theme.primaryColor} />
          <Stack>
            <Text> Days Since Last Contribution </Text>
            <Skeleton visible={loading} height={24} radius='sm'>
              <Text style={{ textAlign: 'center' }}>{daysSinceLastContribution}</Text>
            </Skeleton>
          </Stack>
        </Group>
        <Divider orientation='vertical' />

        <>
          <Center>
            <ActionButton buttonName='Contribute Now' navigateTo='/contributions/new' />
          </Center>
          <Divider orientation='vertical' color='white' />
        </>
      </Group>
    </Paper>
  )
}
