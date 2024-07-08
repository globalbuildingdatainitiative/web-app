import { CreateOrganizationPaper } from '@components'
import { MockedProvider } from '@apollo/client/testing'
import { expect, render, screen, suite, test } from '@test'
import { MemoryRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'

suite('CreateOrganizationPaper', () => {
  test('Snapshot', () => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<CreateOrganizationPaper />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  test('Render Correctly', async () => {
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<CreateOrganizationPaper />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(await screen.findByTestId('CreateOrganizationPaper')).toBeTruthy()
  })

  test('Render Create Organization ActionButton', async () => {
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<CreateOrganizationPaper />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )

    expect(await screen.findByText('Create Organization')).toBeTruthy()
  })
})
