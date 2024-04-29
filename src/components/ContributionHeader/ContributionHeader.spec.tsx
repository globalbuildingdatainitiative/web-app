import { ContributionHeader } from '@components'
import { MemoryRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { expect, render, test, screen } from '@test'

test('ContributionHeader', async () => {
  const { baseElement } = render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<ContributionHeader />} />
      </Routes>
    </MemoryRouter>,
  )
  expect(await screen.findByTestId('ContributionHeader')).toBeTruthy()
  expect(baseElement).toMatchSnapshot()
})
