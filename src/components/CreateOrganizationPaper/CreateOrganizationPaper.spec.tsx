/*import { CreateOrganizationPaper } from '@components'
import { MockedProvider } from '@apollo/client/testing'
import { expect, render, screen, suite, test } from '@test'
import { MemoryRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { fireEvent, waitFor } from '@testing-library/react'

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

  test('Render Create Organization Button', async () => {
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

  test('Autocomplete Country Selection', async () => {
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<CreateOrganizationPaper />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )

    // Find the country input by its placeholder text
    const countryInput = screen.getByPlaceholderText('Select Country') as HTMLInputElement
    fireEvent.focus(countryInput)
    fireEvent.change(countryInput, { target: { value: 'United States' } })

    // Wait for the options to be rendered and find the option element
    const option = await waitFor(() => screen.getByText('Pakistan'))
    fireEvent.click(option)

    // Assert the value directly
    expect(countryInput.value).toBe('United States')

    const createButton = screen.getByText('Create Organization')
    fireEvent.click(createButton)

    expect(await screen.findByTestId('CreateOrganizationPaper')).toBeTruthy()
  })
})
*/

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

  test('Render Create Organization Button', async () => {
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
