import { Paper, ErrorBoundary } from '@components'
import { Tabs } from '@mantine/core'
import { AdminUserTable } from './AdminUserTable'
import { AdminOrganizationTable } from './AdminOrganizationTable'
import { AdminContributionTable } from './AdminContributionTable'

export const AdminPaper = () => {
  return (
    <Paper data-testid='ContributionPaper'>
      <ErrorBoundary>
        <Tabs keepMounted={false} defaultValue='organizations'>
          <Tabs.List mb='md'>
            <Tabs.Tab value='organizations'>Organizations</Tabs.Tab>
            <Tabs.Tab value='users'>Users</Tabs.Tab>
            <Tabs.Tab value='contributions'>Contributions</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='users'>
            <ErrorBoundary>
              <AdminUserTable />
            </ErrorBoundary>
          </Tabs.Panel>
          <Tabs.Panel value='organizations'>
            <ErrorBoundary>
              <AdminOrganizationTable />
            </ErrorBoundary>
          </Tabs.Panel>
          <Tabs.Panel value='contributions'>
            <ErrorBoundary>
              <AdminContributionTable />
            </ErrorBoundary>
          </Tabs.Panel>
        </Tabs>
      </ErrorBoundary>
    </Paper>
  )
}
