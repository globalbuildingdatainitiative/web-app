import { Paper } from '@components'
import { Button, Divider, Group, Title, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useGetContributionsForHeaderQuery } from '@queries'
import dayjs from 'dayjs'
import { IconUsers } from '@tabler/icons-react'

export const ContributionHeader = () => {
  const navigate = useNavigate()

  const { data, loading, error } = useGetContributionsForHeaderQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  const totalContributions = data?.contributions?.count || 0
  const lastContributionDate = data?.contributions?.items?.[0]?.uploadedAt || null
  const daysSinceLastContribution = lastContributionDate ? dayjs().diff(dayjs(lastContributionDate), 'day') : 'N/A'

  return (
    <Paper data-testid='ContributionHeader'>
      <Group justify='space-between' align='center'>
        <Group>
          <IconUsers color='green' size={32} />
          <div>
            <Title size='sm' order={3}>
              Total Contributions
            </Title>
            <Text style={{ textAlign: 'center' }} size='xl'>
              {totalContributions}
            </Text>
          </div>
        </Group>
        <Divider orientation='vertical' />
        <Group>
          <IconUsers color='green' size={32} />
          <div>
            <Title size='sm' order={3}>
              Days Since Last Contribution
            </Title>
            <Text style={{ textAlign: 'center' }} size='xl'>
              {daysSinceLastContribution}
            </Text>
          </div>
        </Group>
        <Divider orientation='vertical' />
        <Button color='green' radius='sm' px={16} onClick={() => navigate('/contributions/new')}>
          Contribute Now
        </Button>
      </Group>
    </Paper>
  )
}
