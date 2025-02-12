import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { RejectInvitation } from '@components'
import { RejectInvitationDocument } from '@queries'
import '@testing-library/jest-dom'

const mocks = [
  {
    request: {
      query: RejectInvitationDocument,
      variables: { userId: '123' },
    },
    result: {
      data: {
        rejectInvitation: true,
      },
    },
  },
]

describe('RejectInvitation', () => {
  const renderComponent = (userId = '123') =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[`/reject?user_id=${userId}`]}>
          <Routes>
            <Route path='/reject' element={<RejectInvitation />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )

  test('renders RejectInvitation component', () => {
    renderComponent()
    expect(screen.getByTestId('RejectInvitation')).toBeTruthy()
    expect(screen.getByText('Are you sure you want to reject this invitation?')).toBeTruthy()
    expect(screen.getByText('Reject Invitation')).toBeTruthy()
  })

  test('handles reject invitation', async () => {
    renderComponent()
    const rejectButton = screen.getByText('Reject Invitation')
    fireEvent.click(rejectButton)

    await waitFor(() => {
      expect(screen.getByText('Invitation rejected successfully.')).toBeTruthy()
      expect(screen.getByText('Redirecting to home page...')).toBeTruthy()
    })
  })

  test('displays error message on mutation error', async () => {
    const errorMock = [
      {
        request: {
          query: RejectInvitationDocument,
          variables: { userId: '456' },
        },
        error: new Error('An error occurred'),
      },
    ]

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <MemoryRouter initialEntries={['/reject?user_id=456']}>
          <Routes>
            <Route path='/reject' element={<RejectInvitation />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )

    const rejectButton = screen.getByText('Reject Invitation')
    fireEvent.click(rejectButton)

    // Wait for the error message to appear
    await waitFor(() => {
      const alertMessage = screen.getByRole('alert').querySelector('.mantine-Alert-message')
      expect(alertMessage).toHaveTextContent(
        'Failed to reject invitation. Please try again or contact support: office@gbdi.io.',
      )
    })
  })
})
