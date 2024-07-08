import { Center, MantineProvider } from '@mantine/core'
import { AppRouter, Loading, theme } from '@components'
import '@fontsource/outfit'
import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/charts/styles.css'
import { useUserContext } from '@context'

export const App = () => {
  const { user } = useUserContext()
  return (
    <MantineProvider theme={theme}>
      {user ? (
        <AppRouter />
      ) : (
        <Center style={{ height: '100vh' }}>
          <Loading />
        </Center>
      )}
    </MantineProvider>
  )
}
