import { AppShell, rem, useMantineTheme } from '@mantine/core'
import { ErrorBoundary, Greeting, SidePanel } from '@components'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  const theme = useMantineTheme()

  return (
    <AppShell
      header={{ height: 60, offset: false }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding='xl'
      withBorder={false}
    >
      <AppShell.Header pl={`calc(300px + var(--mantine-spacing-xl))`} bg={theme.other.backgroundColor}>
        <ErrorBoundary>
          <Greeting />
        </ErrorBoundary>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <SidePanel />
      </AppShell.Navbar>
      <AppShell.Main pt={`calc(${rem(40)} + var(--mantine-spacing-xl))`} bg={theme.other.backgroundColor}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </AppShell.Main>
    </AppShell>
  )
}
