import { ContributionPaper } from '@components'
import { MockedProvider } from '@apollo/client/testing'
import { getContributionsMock } from '@mocks'
import { expect, render, test, screen } from '@test'

test('ContributionPaper', async () => {
  const { baseElement } = render(
    <MockedProvider mocks={getContributionsMock} addTypename={false}>
      <ContributionPaper />
    </MockedProvider>,
  )
  expect(await screen.findByTestId('ContributionPaper')).toBeTruthy()
  expect(baseElement).toMatchSnapshot()
})
