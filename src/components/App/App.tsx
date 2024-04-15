import { AppShell, MantineProvider, rem } from '@mantine/core'
import { AppRouter, ErrorBoundary, SidePanel, theme, Greeting } from '@components'
import '@fontsource/outfit'
import '@mantine/core/styles.css'

export const App = () => (
  <MantineProvider theme={theme}>
    <AppShell
      header={{ height: 60, offset: false }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding='xl'
      withBorder={false}
    >
      <AppShell.Header pl={`calc(300px + var(--mantine-spacing-xl))`} bg='#fafbff'>
        <ErrorBoundary>
          <Greeting />
        </ErrorBoundary>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <SidePanel />
      </AppShell.Navbar>
      <AppShell.Main pt={`calc(${rem(40)} + var(--mantine-spacing-xl))`} bg='#fafbff'>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </AppShell.Main>
    </AppShell>
  </MantineProvider>
)
