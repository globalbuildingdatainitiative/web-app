import { MockedResponse } from '@apollo/client/testing'
import { GetRolesAndPermissionsDocument } from '@queries'
import getResponse from './data/getRolesAndPermissions'

export const getRolesAndPermissionsMock: MockedResponse[] = [
  {
    request: {
      query: GetRolesAndPermissionsDocument,
    },
    result: getResponse,
  },
]
