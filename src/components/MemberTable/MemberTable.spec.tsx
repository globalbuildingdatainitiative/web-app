import { MemberTable } from '@components'
import { MockedProvider } from '@apollo/client/testing'
import { getUsersMock, getOrganizationsMock, MockSessionProvider } from '@mocks'
import { expect, render, screen, test, waitFor } from '@test'
import { MemoryRouter } from 'react-router-dom'

describe('MemberTable', () => {
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

  test('Render Rows for Non-invited and Accepted Users', async () => {
    render(
      <MockedProvider mocks={[...getUsersMock, ...getOrganizationsMock]} addTypename={false}>
        <MockSessionProvider sessionContext={mockSessionContext}>
          <MemoryRouter>
            <MemberTable organizationId='1' />
          </MemoryRouter>
        </MockSessionProvider>
      </MockedProvider>,
    )

    // Wait for data to load
    await waitFor(
      async () => {
        const table = await screen.findByRole('table')
        const tableBody = table.querySelector('tbody')

        expect(tableBody?.textContent).toContain('Hassan Shahzad')
        expect(tableBody?.textContent).toContain('Martin Rock')
        expect(tableBody?.textContent).not.toContain('Jane Doe')
      },
      { timeout: 2000 },
    )
  })

  test('Render Correct Number of Rows', async () => {
    render(
      <MockedProvider mocks={[...getUsersMock, ...getOrganizationsMock]} addTypename={false}>
        <MockSessionProvider sessionContext={mockSessionContext}>
          <MemoryRouter>
            <MemberTable organizationId='1' />
          </MemoryRouter>
        </MockSessionProvider>
      </MockedProvider>,
    )

    await waitFor(
      async () => {
        const table = await screen.findByRole('table')
        const tableBody = table.querySelector('tbody')
        const rows = tableBody?.querySelectorAll('tr') || []

        // We expect 2 data rows
        expect(rows.length).toBe(2)
      },
      { timeout: 2000 },
    )
  })
})
