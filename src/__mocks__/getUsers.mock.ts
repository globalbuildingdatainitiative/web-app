import { MockedResponse } from '@apollo/client/testing'
import { GetUsersDocument } from '@queries'
import getUsersResponse from './data/getUsersResponse'

export const getUsersMock: MockedResponse[] = [
  {
    request: {
      query: GetUsersDocument,
    },
    result: getUsersResponse,
  },
]
