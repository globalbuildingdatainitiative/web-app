/*
import { GetCurrentUserQuery } from '@queries'
import { createContext } from 'react'

export type User = GetCurrentUserQuery['users'][number]

interface UserContextProps {
  user: User | null
}

export const UserContext = createContext({ user: null } as UserContextProps)
*/


import { GetCurrentUserQuery } from '@queries'
import { createContext } from 'react'

export type User = GetCurrentUserQuery['users'][number]

interface UserContextProps {
  user: User | null;
  refetchUser: () => Promise<void>;
}

export const UserContext = createContext({ user: null, refetchUser: async () => {} } as UserContextProps)
