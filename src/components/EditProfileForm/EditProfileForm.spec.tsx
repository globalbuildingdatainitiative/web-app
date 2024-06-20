import { EditProfileForm } from '@components'
import { MockedProvider } from '@apollo/client/testing'
import { expect, render, screen, suite, test, fireEvent } from '@test'
import { MemoryRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { getUsersMock } from '@mocks'

suite('EditProfileForm', () => {
  test('Snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={getUsersMock} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<EditProfileForm />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  test('Render Correctly', async () => {
    render(
      <MockedProvider mocks={getUsersMock} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<EditProfileForm />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(await screen.findByTestId('EditProfileForm')).toBeTruthy()
  })

  test('Render Save Changes Button', async () => {
    render(
      <MockedProvider mocks={getUsersMock} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<EditProfileForm />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )

    expect(await screen.findByText('Save Changes')).toBeTruthy()
  })

  test('Form Submission', async () => {
    render(
      <MockedProvider mocks={getUsersMock} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<EditProfileForm />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'UpdatedFirstName' } })
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'UpdatedLastName' } })
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'updated@example.com' } })
    fireEvent.change(screen.getByLabelText('Current Password'), { target: { value: 'currentPassword123' } })
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newPassword123' } })
    fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'newPassword123' } })

    fireEvent.click(screen.getByText('Save Changes'))

    // Add any assertions or wait for any specific results
  })
})
