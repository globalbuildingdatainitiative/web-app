import { MemberTable } from '@components'
import { MockedProvider } from '@apollo/client/testing'
import { getUsersMock, getOrganizationsMock, MockSessionProvider } from '@mocks'
import { expect, render, screen, suite, test, waitFor } from '@test'
import { MemoryRouter } from 'react-router-dom'

suite('MemberTable', () => {
  const mockSessionContext = {
    loading: false as const,
    userId: '1',
    invalidClaims: [],
    doesSessionExist: true,
    accessTokenPayload: {},
  }

  test('Snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={[...getUsersMock, ...getOrganizationsMock]} addTypename={false}>
        <MockSessionProvider sessionContext={mockSessionContext}>
          <MemoryRouter>
            <MemberTable organizationId='1' />
          </MemoryRouter>
        </MockSessionProvider>
      </MockedProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  test('Render Correctly', async () => {
    render(
      <MockedProvider mocks={[...getUsersMock, ...getOrganizationsMock]} addTypename={false}>
        <MockSessionProvider sessionContext={mockSessionContext}>
          <MemoryRouter>
            <MemberTable organizationId='1' />
          </MemoryRouter>
        </MockSessionProvider>
      </MockedProvider>,
    )
    await waitFor(() => expect(screen.getByTestId('MemberTable')).toBeTruthy())
  })

  test('Render Rows', async () => {
    render(
      <MockedProvider mocks={[...getUsersMock, ...getOrganizationsMock]} addTypename={false}>
        <MockSessionProvider sessionContext={mockSessionContext}>
          <MemoryRouter>
            <MemberTable organizationId='1' />
          </MemoryRouter>
        </MockSessionProvider>
      </MockedProvider>,
    )
    await waitFor(() => expect(screen.getByText('Hassan Shahzad')).toBeTruthy())
  })
})
