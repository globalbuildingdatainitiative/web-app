import { AppShell, rem, useMantineTheme, useMatches } from '@mantine/core'
import { ErrorBoundary, Greeting, SidePanel } from '@components'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  const theme = useMantineTheme()

  return (
    <AppShell
      header={{ height: 60, offset: false }}
      navbar={{ width: { xs: 100, sm: 200, xl: 300 }, breakpoint: 'xs' }}
      padding='xl'
      withBorder={false}
    >
      <AppShell.Header
        pl={`calc(${useMatches({ xs: 100, sm: 200, xl: 300 })}px + var(--mantine-spacing-xl))`}
        bg={theme.other.backgroundColor}
      >
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
