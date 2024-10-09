import { AppShell, rem, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { ErrorBoundary, Greeting, SidePanel } from '@components'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const AppLayout = () => {
  const theme = useMantineTheme()
  const [collapsed, setCollapsed] = useState(false)

  const isXs = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`) // Typically 480px
  const isSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`) // Typically 768px
  const isLg = useMediaQuery(`(max-width: ${theme.breakpoints.lg}px)`) // Typically 1200px
  const isXl = useMediaQuery(`(max-width: ${theme.breakpoints.xl}px)`)

  const sidepanelBreakpoint = useMediaQuery('(max-width: 1410px)')

  useEffect(() => {
    if (sidepanelBreakpoint) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [sidepanelBreakpoint])

  const getNavbarWidth = () => {
    if (isXs) {
      return collapsed ? 30 : 100
    } else if (isSm) {
      return collapsed ? 180 : 200
    } else if (isLg) {
      return collapsed ? 130 : 300
    } else if (isXl) {
      return collapsed ? 130 : 300
    } else {
      return collapsed ? 80 : 250
    }
  }

  const navbarWidth = getNavbarWidth()

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
