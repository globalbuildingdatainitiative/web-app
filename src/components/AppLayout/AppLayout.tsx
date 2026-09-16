import { AppShell, useMantineTheme, useMatches } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { ErrorBoundary, Greeting, SidePanel } from '@components'
import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { V2Banner } from 'components/V2Banner'

export const AppLayout = () => {
  const theme = useMantineTheme()
  const [collapsed, setCollapsed] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(true) // Not persistent, will reset on page refresh
  const location = useLocation()
  const sidepanelBreakpoint = useMediaQuery('(max-width: 1410px)')

  useEffect(() => {
    if (sidepanelBreakpoint) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [sidepanelBreakpoint])

  useEffect(() => {
    setBannerOpen(true)
  }, [location.pathname])

  const headerContentRef = useRef<HTMLDivElement>(null)
  const [headerContentHeight, setHeaderContentHeight] = useState(0)

  useLayoutEffect(() => {
    const content = headerContentRef.current
    if (!content) {
      return
    }
    const updateHeight = () => setHeaderContentHeight(content.offsetHeight)
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(content)
    return () => observer.disconnect()
  }, [])

  const headerHeight = Math.max(60, headerContentHeight)

  const navbarWidth = useMatches({
    xs: collapsed ? 100 : 100,
    sm: collapsed ? 100 : 200,
    md: collapsed ? 100 : 250,
    lg: collapsed ? 100 : 250,
    xl: collapsed ? 100 : 250,
  })

  return (
    <AppShell
      header={{ height: headerHeight, offset: false }}
      navbar={{
        width: navbarWidth,
        breakpoint: 'xs',
      }}
      padding='xl'
      withBorder={false}
    >
      <AppShell.Header pl={`calc(${navbarWidth}px + var(--mantine-spacing-xl))`} bg={theme.other.backgroundColor}>
        <ErrorBoundary>
          <div ref={headerContentRef}>
            {bannerOpen && <V2Banner onClose={() => setBannerOpen(false)} />}
            <Greeting />
          </div>
        </ErrorBoundary>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <SidePanel collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)} />
      </AppShell.Navbar>
      <AppShell.Main
        pt={`calc(var(--app-shell-header-height) + var(--mantine-spacing-xl))`}
        bg={theme.other.backgroundColor}
      >
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </AppShell.Main>
    </AppShell>
  )
}
