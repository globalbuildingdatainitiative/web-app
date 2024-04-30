import { MockedResponse } from '@apollo/client/testing'
import { GetContributionsDocument } from '@queries'
import getContributionsResponse from './data/getContributionsResponse.ts'

export const getContributionsMock: MockedResponse[] = [
  {
    request: {
      query: GetContributionsDocument,
    },
    result: getContributionsResponse,
  },
]
