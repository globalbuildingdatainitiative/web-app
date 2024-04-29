import { render as testingLibraryRender } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { ReactNode } from 'react'
import { theme } from '@components'

export function render(ui: ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: ReactNode }) => <MantineProvider theme={theme}>{children}</MantineProvider>,
  })
}
