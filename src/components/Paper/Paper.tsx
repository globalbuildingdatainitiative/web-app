import { Card } from '@mantine/core'
import { ReactNode } from 'react'

interface PaperProps {
  children?: ReactNode
  'data-testid'?: string
  id?: string
}

export const Paper = (props: PaperProps) => {
  const { children, id } = props

  return (
    <Card shadow='sm' padding='lg' radius='lg' withBorder data-testid={props['data-testid']} id={id}>
      {children}
    </Card>
  )
}
