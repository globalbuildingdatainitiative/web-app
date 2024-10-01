import React from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { MobileUsers } from '@components'

export const MobileRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return <MobileUsers />
  }

  return <>{children}</>
}
