import { MockedResponse } from '@apollo/client/testing'
import { GetUsersDocument } from '@queries'
import getUsersResponse from './data/getUsersResponse'

export const getUsersMock: MockedResponse[] = [
  {
    request: {
      query: GetUsersDocument,
      variables: {
        filterBy: {
          equal: { organizationId: '1' },
        },
        sortBy: undefined,
      },
    },
    result: getUsersResponse,
  },
  {
    request: {
      query: GetUsersDocument,
      variables: {
        filterBy: undefined,
        sortBy: undefined,
      },
    },
    result: getUsersResponse,
  },
]
