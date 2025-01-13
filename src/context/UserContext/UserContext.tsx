import { createContext } from 'react'
import { ApolloError } from '@apollo/client'
import { User } from './types.ts'

interface UserContextProps {
  user: User | null
  loading: boolean
  error: ApolloError | undefined
}

export const UserContext = createContext({ user: null } as UserContextProps)
