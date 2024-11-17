import { AppShell, rem, useMantineTheme, useMatches } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { ErrorBoundary, Greeting, SidePanel } from '@components'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const AppLayout = () => {
  const theme = useMantineTheme()
  const [collapsed, setCollapsed] = useState(false)
  const sidepanelBreakpoint = useMediaQuery('(max-width: 1410px)')

  useEffect(() => {
    if (sidepanelBreakpoint) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [sidepanelBreakpoint])

  const navbarWidth = useMatches({
    xs: collapsed ? 100 : 100,
    sm: collapsed ? 100 : 200,
    md: collapsed ? 100 : 250,
    lg: collapsed ? 100 : 250,
    xl: collapsed ? 100 : 250,
  })

  return (
    <AppShell
      header={{ height: 60, offset: false }}
      navbar={{
        width: navbarWidth,
        breakpoint: 'xs',
      }}
      padding='xl'
      withBorder={false}
    >
      <AppShell.Header pl={`calc(${navbarWidth}px + var(--mantine-spacing-xl))`} bg={theme.other.backgroundColor}>
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
