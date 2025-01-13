import { ReactNode, useMemo } from 'react'
import { useGetCurrentUserQuery } from '@queries'
import { UserContext } from './UserContext.tsx'
import Session from 'supertokens-auth-react/recipe/session'
import { UserRoleClaim } from 'supertokens-auth-react/recipe/userroles'
import { Role, User } from './types.ts'

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const currentUserId = localStorage.getItem('userId')
  const { data, loading, error } = useGetCurrentUserQuery({
    variables: { id: currentUserId! },
    skip: !currentUserId,
  })
  const claimValue = Session.useClaimValue(UserRoleClaim)

  const user = useMemo(() => {
    if (loading) return null
    if (error) return null
    if (!data || !data.users) return null

    const user = { ...data.users[0], roles: []} as User
    if (claimValue.loading || !claimValue.doesSessionExist) {
      return user
    }
    console.log('roles', claimValue.value)

    user.roles = claimValue.value ? (claimValue.value as Role[]) : []

    return user
  }, [loading, error, data, claimValue])

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
