import { EditOrganizationForm } from '@components'
import { MockedProvider } from '@apollo/client/testing'
import { expect, render, screen, suite, test } from '@test'
import { MemoryRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { getUsersMock, getOrganizationsMock } from '@mocks'

suite('EditOrganizationForm', () => {
  test('Snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={[...getUsersMock, ...getOrganizationsMock]} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<EditOrganizationForm />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  test('Render Correctly', async () => {
    render(
      <MockedProvider mocks={[...getUsersMock, ...getOrganizationsMock]} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<EditOrganizationForm />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(await screen.findByTestId('EditOrganizationForm')).toBeTruthy()
  })
})
