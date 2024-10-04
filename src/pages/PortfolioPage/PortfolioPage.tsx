import { OrganizationHeader, PortfolioPaper } from '@components'
import { Stack } from '@mantine/core'

export const PortfolioPage = () => {
  return (
    <Stack>
      <OrganizationHeader context='portfolio' />
      <PortfolioPaper />
    </Stack>
  )
}
