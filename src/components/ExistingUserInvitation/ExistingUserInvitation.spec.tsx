import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ExistingUserInvitation } from '@components'
import { AcceptInvitationDocument } from '@queries'
import '@testing-library/jest-dom'

const mocks = [
  {
    request: {
      query: AcceptInvitationDocument,
      variables: { user: { id: '123' } },
    },
    result: {
      data: {
        acceptInvitation: true,
      },
    },
  },
]

describe('ExistingUserInvitation', () => {
  const renderComponent = (userId = '123') =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[`/invite?user_id=${userId}`]}>
          <Routes>
            <Route path='/invite' element={<ExistingUserInvitation />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )

  test('renders ExistingUserInvitation component', () => {
    renderComponent()
    expect(screen.getByTestId('ExistingUserInvitation')).toBeTruthy()
    expect(screen.getByText('Accept Invitation and Sign In')).toBeTruthy()
  })

  test('handles accept invitation', async () => {
    renderComponent()
    const acceptButton = screen.getByText('Accept Invitation and Sign In')
    fireEvent.click(acceptButton)

    await waitFor(() => {
      expect(screen.getByText('Invitation accepted successfully.')).toBeTruthy()
      expect(screen.getByText('Redirecting to home page...')).toBeTruthy()
    })
  })

  test('displays error message on mutation error', async () => {
    const errorMock = [
      {
        request: {
          query: AcceptInvitationDocument,
          variables: { user: { id: '456' } },
        },
        error: new Error('An error occurred'),
      },
    ]

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <MemoryRouter initialEntries={['/invite?user_id=456']}>
          <Routes>
            <Route path='/invite' element={<ExistingUserInvitation />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )

    const acceptButton = screen.getByText('Accept Invitation and Sign In')
    fireEvent.click(acceptButton)

    // Wait for the error message to appear
    await waitFor(() => {
      const alertMessage = screen.getByRole('alert').querySelector('.mantine-Alert-message')
      expect(alertMessage).toHaveTextContent('Failed to accept invitation. Please try again or contact support.')
    })
  })
})
