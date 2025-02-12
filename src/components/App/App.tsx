import { Center, MantineProvider } from '@mantine/core'
import { AppRouter, ErrorMessage, Loading, theme } from '@components'
import '@fontsource/plus-jakarta-sans'
import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/charts/styles.css'
import { useUserContext } from '@context'

export const App = () => {
  const { user, loading, error } = useUserContext()
  return (
    <MantineProvider theme={theme}>
      {loading ? (
        <Center style={{ height: '100vh' }}>
          <Loading />
        </Center>
      ) : null}
      {error ? (
        <Center style={{ height: '100vh' }}>
          <ErrorMessage
            error={{
              message: `An error occurred. Please try again. If the problem persists, contact support at office@gbdi.io. Error: ${error.message}`,
            }}
          />
        </Center>
      ) : null}
      {user ? <AppRouter /> : null}
    </MantineProvider>
  )
}
