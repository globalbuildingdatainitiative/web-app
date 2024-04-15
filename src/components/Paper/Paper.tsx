import { Card } from '@mantine/core'
import { ReactNode } from 'react'

interface PaperProps {
  children?: ReactNode
}

export const Paper = (props: PaperProps) => {
  const { children } = props

  return (
    <Card shadow='sm' padding='lg' radius='lg' withBorder>
      {children}
    </Card>
  )
}
