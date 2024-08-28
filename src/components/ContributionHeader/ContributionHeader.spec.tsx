import { ContributionHeader } from '@components'
import { MemoryRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { expect, render, screen, waitFor } from '@test'
import { MockedProvider } from '@apollo/client/testing'
import { GetContributionsForHeaderDocument } from '@queries' // Use the actual DocumentNode here
import { GraphQLError } from 'graphql'

const mocks = [
  {
    request: {
      query: GetContributionsForHeaderDocument,
    },
    result: {
      data: {
        contributions: {
          count: 10,
          items: [
            {
              uploadedAt: '2024-08-19T12:34:56Z',
            },
          ],
        },
      },
    },
  },
]

const errorMocks = [
  {
    request: {
      query: GetContributionsForHeaderDocument,
    },
    result: {
      errors: [new GraphQLError('An error occurred')],
    },
  },
]

test('ContributionHeader renders correctly with data', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<ContributionHeader />} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>,
  )

  // Check loading state
  expect(screen.getByText('Loading...')).to.exist

  // Wait for the data to load
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).to.not.exist
  })

  // Check that the total contributions and last contribution date are displayed correctly
  expect(screen.getByText('Total Contributions')).to.exist
  expect(screen.getByText('10')).to.exist
  expect(screen.getByText('Days Since Last Contribution')).to.exist

  // Check that the "Contribute Now" button is rendered
  expect(screen.getByRole('button', { name: /Contribute Now/i })).to.exist
})

test('ContributionHeader shows error state', async () => {
  render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<ContributionHeader />} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>,
  )

  // Check loading state
  expect(screen.getByText('Loading...')).to.exist

  // Wait for the error state
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).to.not.exist
    expect(screen.getByText('Error loading data')).to.exist
  })
})
