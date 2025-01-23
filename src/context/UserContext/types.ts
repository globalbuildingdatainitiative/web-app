import { GetCurrentUserQuery } from '@queries'

type GraphQLUser = GetCurrentUserQuery['users'][number]

export interface User extends GraphQLUser {
  isImpersonation: boolean
}
