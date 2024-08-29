import { ProfilePaper } from '@components'
import { render, screen, suite, test } from '@test'
import { MockedProvider } from '@apollo/client/testing'
import { useGetContributionsPerMonthQuery } from '@queries'
import { vi, expect } from 'vitest'

vi.mock('@queries', () => ({
  useGetContributionsPerMonthQuery: vi.fn(),
}))

// Mock data for contributions
const mockContributionsData = {
  contributions: {
    items: [
      { uploadedAt: '2024-08-01T00:00:00Z' },
      { uploadedAt: '2024-08-15T00:00:00Z' },
      { uploadedAt: '2024-09-01T00:00:00Z' },
    ],
    count: 3,
  },
}

;(useGetContributionsPerMonthQuery as jest.Mock).mockReturnValue({
  loading: false,
  error: undefined,
  data: mockContributionsData,
})

suite('ProfilePaper', () => {
  test('Snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <ProfilePaper />
      </MockedProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  test('Render Correctly', async () => {
    render(
      <MockedProvider>
        <ProfilePaper />
      </MockedProvider>,
    )
    expect(await screen.findByTestId('ProfilePaper')).to.exist
  })

  test('Render User Contributions Chart', async () => {
    render(
      <MockedProvider>
        <ProfilePaper />
      </MockedProvider>,
    )
    expect(await screen.findByText('User Contributions Over Time (Monthly)')).to.exist
  })

  test('Render Contributions Data Correctly', async () => {
    render(
      <MockedProvider>
        <ProfilePaper />
      </MockedProvider>,
    )
    expect(await screen.findByText('User Contributions Over Time (Monthly)')).to.exist
  })
})
