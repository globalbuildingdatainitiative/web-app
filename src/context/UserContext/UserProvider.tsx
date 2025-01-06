import { ReactNode, useMemo } from 'react'
import { useGetCurrentUserQuery } from '@queries'
import { User, UserContext } from './UserContext.tsx'

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const currentUserId = localStorage.getItem('userId')
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
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
