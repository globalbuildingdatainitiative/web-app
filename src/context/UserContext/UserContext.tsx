import { GetCurrentUserQuery } from '@queries'
import { createContext } from 'react'
import { ApolloError } from '@apollo/client'

export type User = GetCurrentUserQuery['users'][number]

interface UserContextProps {
  user: User | null
  loading: boolean
  error: ApolloError | undefined
}

export const UserContext = createContext({ user: null } as UserContextProps)
