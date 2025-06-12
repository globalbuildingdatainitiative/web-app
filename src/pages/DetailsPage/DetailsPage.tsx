import { DetailsPaper } from '@components'
import { Container, Stack } from '@mantine/core'

export const DetailsPage = () => {
  return (
    <Stack h='90vh' justify='center' align='center'>
      <Container size='xl'>
        <DetailsPaper />
      </Container>
    </Stack>
  )
}
