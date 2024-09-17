import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { NewUserInvitation } from '@components'
import { UpdateUserDocument, AcceptInvitationDocument } from '@queries'

const mocks = [
  {
    request: {
      query: UpdateUserDocument,
      variables: {
        userInput: {
          id: '123',
          firstName: 'John',
          lastName: 'Doe',
          currentPassword: 'asokdA87fnf30efjoiOI**cwjkn',
          newPassword: 'newPassword123',
        },
      },
    },
    result: {
      data: {
        updateUser: true,
      },
    },
  },
  {
    request: {
      query: AcceptInvitationDocument,
      variables: { userId: '123' },
    },
    result: {
      data: {
        acceptInvitation: true,
      },
    },
  },
]

describe('NewUserInvitation', () => {
  const renderComponent = (userId = '123') =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[`/invite?user_id=${userId}`]}>
          <Routes>
            <Route path='/invite' element={<NewUserInvitation />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )

  test('renders NewUserInvitation component', () => {
    renderComponent()
    expect(screen.getByTestId('NewUserInvitation')).toBeTruthy()
    expect(screen.getByLabelText('First Name')).toBeTruthy()
    expect(screen.getByLabelText('Last Name')).toBeTruthy()
    expect(screen.getByLabelText('New Password')).toBeTruthy()
    expect(screen.getByLabelText('Confirm New Password')).toBeTruthy()
    expect(screen.getByText('Accept Invitation and Sign Up')).toBeTruthy()
  })

  test('handles form submission', async () => {
    renderComponent()
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } })
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } })
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newPassword123' } })
    fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'newPassword123' } })

    fireEvent.click(screen.getByText('Accept Invitation and Sign Up'))

    await waitFor(() => {
      expect(screen.getByText('Invitation accepted successfully.')).toBeTruthy()
      expect(screen.getByText('Redirecting to home page...')).toBeTruthy()
    })
  })

  test('displays validation errors', async () => {
    renderComponent()
    fireEvent.click(screen.getByText('Accept Invitation and Sign Up'))

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeTruthy()
      expect(screen.getByText('Last name is required')).toBeTruthy()
      expect(screen.getByText('Password is required')).toBeTruthy()
    })
  })
})
