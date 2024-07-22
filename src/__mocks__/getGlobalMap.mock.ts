import { MockedResponse } from '@apollo/client/testing'
import { GetProjectsCountsByCountryDocument } from '@queries'
import getGlobalMapResponse from './data/getGlobalMapResponse.ts'

export const getGlobalMapMock: MockedResponse[] = [
  {
    request: {
      query: GetProjectsCountsByCountryDocument,
    },
    result: getGlobalMapResponse,
  },
]
