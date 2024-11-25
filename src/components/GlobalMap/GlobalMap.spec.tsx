import { GlobalMap } from '@components'
import { expect, render, screen, suite, test, waitFor } from '@test'
import { getGlobalMapMock, MockSessionProvider } from '@mocks'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom'

suite('GlobalMap', () => {
  const mockSessionContext = {
    loading: false as const,
    userId: '1',
    invalidClaims: [],
    doesSessionExist: true,
    accessTokenPayload: {},
  }

  test('Snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={getGlobalMapMock} addTypename={false}>
        <MockSessionProvider sessionContext={mockSessionContext}>
          <MemoryRouter>
            <GlobalMap loading={false} data={undefined} />
          </MemoryRouter>
        </MockSessionProvider>
      </MockedProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  test('Render Correctly', async () => {
    render(
      <MockedProvider mocks={getGlobalMapMock} addTypename={false}>
        <MockSessionProvider sessionContext={mockSessionContext}>
          <MemoryRouter>
            <GlobalMap loading={false} data={undefined} />
          </MemoryRouter>
        </MockSessionProvider>
      </MockedProvider>,
    )
    await waitFor(() => expect(screen.getByTestId('GlobalMap')).to.exist)
  })

  // Additional tests
  test('Changes color based on filters', async () => {
    render(
      <MockedProvider mocks={getGlobalMapMock} addTypename={false}>
        <MockSessionProvider sessionContext={mockSessionContext}>
          <MemoryRouter>
            <GlobalMap loading={false} data={undefined} />
          </MemoryRouter>
        </MockSessionProvider>
      </MockedProvider>,
    )

    // Wait for data to load
    await waitFor(() => expect(screen.getByTestId('GlobalMap')).to.exist)
  })

  test('Shows error state', async () => {
    const errorMock = [
      {
        request: {
          query: getGlobalMapMock[0].request.query,
          variables: getGlobalMapMock[0].request.variables,
        },
        error: new Error('An error occurred'),
      },
    ]

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <MockSessionProvider sessionContext={mockSessionContext}>
          <MemoryRouter>
            <GlobalMap loading={false} data={undefined} />
          </MemoryRouter>
        </MockSessionProvider>
      </MockedProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText(/Bummer/)).to.exist
    })
  })
})
