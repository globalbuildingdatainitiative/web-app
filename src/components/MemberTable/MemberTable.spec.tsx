import { MemberTable } from '@components'
import { MockedProvider } from '@apollo/client/testing'
import { getUsersMock, getOrganizationsMock, MockSessionProvider } from '@mocks'
import { expect, render, screen, suite, test, waitFor } from '@test'
import { ClaimValidationError } from 'supertokens-auth-react/recipe/session'

suite('MemberTable', () => {
  const mockSessionContext = {
    loading: false as const,
    userId: '1', // Mock user ID for the session
    invalidClaims: [] as ClaimValidationError[],
    doesSessionExist: true,
    accessTokenPayload: {},
  }

  test('Snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={[...getUsersMock, ...getOrganizationsMock]} addTypename={false}>
        <MockSessionProvider sessionContext={mockSessionContext}>
          <MemberTable organizationId='1' /> {/* Pass the organizationId prop */}
        </MockSessionProvider>
      </MockedProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  test('Render Correctly', async () => {
    render(
      <MockedProvider mocks={[...getUsersMock, ...getOrganizationsMock]} addTypename={false}>
        <MockSessionProvider sessionContext={mockSessionContext}>
          <MemberTable organizationId='1' /> {/* Pass the organizationId prop */}
        </MockSessionProvider>
      </MockedProvider>,
    )
    await waitFor(() => expect(screen.getByTestId('MemberTable')).toBeTruthy())
  })

  test('Render Rows', async () => {
    render(
      <MockedProvider mocks={[...getUsersMock, ...getOrganizationsMock]} addTypename={false}>
        <MockSessionProvider sessionContext={mockSessionContext}>
          <MemberTable organizationId='1' /> {/* Pass the organizationId prop */}
        </MockSessionProvider>
      </MockedProvider>,
    )
    await waitFor(() => expect(screen.getByText('Hassan Shahzad')).toBeTruthy())
  })
})
