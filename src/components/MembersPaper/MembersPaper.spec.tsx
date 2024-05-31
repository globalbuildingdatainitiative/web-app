import { MemberPaper } from '@components'
import { MockedProvider } from '@apollo/client/testing'
import { getUsersMock, getOrganizationsMock } from '@mocks'
import { expect, render, screen, test, waitFor } from '@test'
import { MockSessionProvider } from '@mocks'
import { ClaimValidationError } from 'supertokens-auth-react/recipe/session'

test('MemberPaper', async () => {
  const mockSessionContext = {
    loading: false as const,
    userId: '1', // Mock user ID for the session
    invalidClaims: [] as ClaimValidationError[],
    doesSessionExist: true,
    accessTokenPayload: {},
  }

  const { baseElement } = render(
    <MockedProvider mocks={[...getUsersMock, ...getOrganizationsMock]} addTypename={false}>
      <MockSessionProvider sessionContext={mockSessionContext}>
        <MemberPaper />
      </MockSessionProvider>
    </MockedProvider>,
  )

  await waitFor(() => expect(screen.getByTestId('MemberPaper')).toBeTruthy())
  expect(baseElement).toMatchSnapshot()
})
