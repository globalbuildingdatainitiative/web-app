import { OrganizationHeader, PortfolioPaper } from '@components'
import { Stack } from '@mantine/core'

export const OrganizationPortfolioPage = () => {
  return (
    <Stack>
      <OrganizationHeader context='portfolio' />
      <PortfolioPaper />
    </Stack>
  )
}
