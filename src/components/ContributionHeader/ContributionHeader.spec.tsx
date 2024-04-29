import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContributionHeader } from '@components'
import { MemoryRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { MantineProvider } from '@mantine/core'

test('ContributionHeader', async () => {
  const {baseElement} = render(
    <MantineProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ContributionHeader />} />
        </Routes>
      </MemoryRouter>
    </MantineProvider>,
  )
  expect(await screen.findByTestId('ContributionHeader')).toBeTruthy()
  expect(baseElement).toMatchSnapshot()
})