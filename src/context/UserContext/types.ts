import { GetCurrentUserQuery } from '@queries'

type GraphQLUser = GetCurrentUserQuery['users'][number]

export type Role = keyof typeof ROLES
export type Permission = (typeof ROLES)[Role][number]

export const ROLES = {
  admin: ['all'],
} as const

export interface User extends GraphQLUser {
  roles: Role[]
}
