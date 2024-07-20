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
            <GlobalMap />
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
            <GlobalMap />
          </MemoryRouter>
        </MockSessionProvider>
      </MockedProvider>,
    )
    await waitFor(() => expect(screen.getByTestId('GlobalMap')).to.exist)
  })
})
