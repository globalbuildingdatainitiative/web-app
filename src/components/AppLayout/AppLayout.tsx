import { AppShell, rem, useMantineTheme, useMatches } from '@mantine/core'
import { ErrorBoundary, Greeting, SidePanel } from '@components'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

export const AppLayout = () => {
  const theme = useMantineTheme()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <AppShell
      header={{ height: 60, offset: false }}
      navbar={{
        width: { xs: collapsed ? 30 : 100, sm: collapsed ? 180 : 200, xl: collapsed ? 130 : 300 },
        breakpoint: 'xs',
      }}
      padding='xl'
      withBorder={false}
    >
      <AppShell.Header
        pl={`calc(${useMatches({ xs: collapsed ? 30 : 100, sm: collapsed ? 180 : 200, xl: collapsed ? 130 : 300 })}px + var(--mantine-spacing-xl))`}
        bg={theme.other.backgroundColor}
      >
        <ErrorBoundary>
          <Greeting />
        </ErrorBoundary>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <SidePanel collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)} />
      </AppShell.Navbar>
      <AppShell.Main pt={`calc(${rem(40)} + var(--mantine-spacing-xl))`} bg={theme.other.backgroundColor}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </AppShell.Main>
    </AppShell>
  )
}
