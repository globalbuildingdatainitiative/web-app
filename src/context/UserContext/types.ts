import { GetCurrentUserQuery } from '@queries'

type GraphQLUser = NonNullable<GetCurrentUserQuery['users']['items']>[number]

export interface User extends GraphQLUser {
  isImpersonation: boolean
}
