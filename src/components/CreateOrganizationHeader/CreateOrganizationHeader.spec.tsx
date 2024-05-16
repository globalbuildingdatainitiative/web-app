import { CreateOrganizationHeader } from '@components'
import { MemoryRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { expect, render, test, screen } from '@test'

test('CreateOrganizationHeader', async () => {
  const { baseElement } = render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<CreateOrganizationHeader />} />
      </Routes>
    </MemoryRouter>,
  )
  expect(await screen.findByTestId('CreateOrganizationHeader')).toBeTruthy()
  expect(baseElement).toMatchSnapshot()
})
