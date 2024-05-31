import { MockedResponse } from '@apollo/client/testing'
import { GetOrganizationsDocument } from '@queries'
import getOrganizationsResponse from './data/getOrganizationsResponse'

export const getOrganizationsMock: MockedResponse[] = [
  {
    request: {
      query: GetOrganizationsDocument,
    },
    result: getOrganizationsResponse,
  },
]
