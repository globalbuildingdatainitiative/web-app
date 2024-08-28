import { ContributionTable } from '@components'
import { MockedProvider } from '@apollo/client/testing'
import { getContributionsMock } from '@mocks'
import { expect, render, screen, suite, test, fireEvent } from '@test'

suite('ContributionTable', () => {
  test('Snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={getContributionsMock} addTypename={false}>
        <ContributionTable />
      </MockedProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  test('Render Correctly', async () => {
    render(
      <MockedProvider mocks={getContributionsMock} addTypename={false}>
        <ContributionTable />
      </MockedProvider>,
    )
    expect(await screen.findByTestId('ContributionTable')).toBeTruthy()
  })

  test('Render Rows with User Names', async () => {
    render(
      <MockedProvider mocks={getContributionsMock} addTypename={false}>
        <ContributionTable />
      </MockedProvider>,
    )
    expect(await screen.findByText('My Project 1')).toBeTruthy()
    expect(await screen.findByText('John Doe')).toBeTruthy()
    expect(await screen.findByText('My Project 2')).toBeTruthy()
    expect(await screen.findByText('Jane Smith')).toBeTruthy()
  })

  test('Handle Pagination', async () => {
    render(
      <MockedProvider mocks={getContributionsMock} addTypename={false}>
        <ContributionTable />
      </MockedProvider>,
    )

    expect(await screen.findByText('My Project 1')).toBeTruthy()
    expect(await screen.findByText('John Doe')).toBeTruthy()

    const nextPageButton = screen.getByRole('button', { name: /2/i })
    fireEvent.click(nextPageButton)

    expect(await screen.findByText('My Project 11')).toBeTruthy()
    expect(await screen.findByText('Alice Johnson')).toBeTruthy()
  })
})
