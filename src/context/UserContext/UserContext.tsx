import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { useGetCurrentUserQuery, GetCurrentUserQuery } from '@queries'
import { doesSessionExist, getUserId } from 'supertokens-auth-react/recipe/session'

export type User = GetCurrentUserQuery['users'][number]

interface UserContextProps {
  user: User | null
}

export const UserContext = createContext({ user: null } as UserContextProps)

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      if (await doesSessionExist()) {
        const id = await getUserId()
        setCurrentUserId(id)
      }
    }
    fetchCurrentUserId()
  }, [])

  const { data, loading, error } = useGetCurrentUserQuery({
    variables: { id: currentUserId! },
    skip: !currentUserId,
  })

  const user = useMemo(() => {
    if (loading) return null
    if (error) return null
    if (!data || !data.users) return null
    return data.users[0] as User
  }, [loading, error, data])

  return (
    <UserContext.Provider
      value={{
        user: user,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
