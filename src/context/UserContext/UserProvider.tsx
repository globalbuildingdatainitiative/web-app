import { ReactNode, useMemo } from 'react'
import { Role, useGetCurrentUserQuery } from '@queries'
import { UserContext } from './UserContext.tsx'
import Session from 'supertokens-auth-react/recipe/session'
import { UserRoleClaim } from 'supertokens-auth-react/recipe/userroles'
import { User } from './types.ts'

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
  const sessionContext = Session.useSessionContext()

  const user = useMemo(() => {
    if (loading) return null
    if (error) return null
    if (!data || !data.users) return null

    const user = {
      ...data.users.items?.[0],
      roles: [],
      // @ts-expect-error accessTokenPayload is not defined in SessionContext by exists
      isImpersonation: sessionContext?.accessTokenPayload?.isImpersonation ?? false,
    } as User

    if (claimValue.loading || !claimValue.doesSessionExist) {
      return user
    }

    user.roles = claimValue.value ? (claimValue.value.map((role) => role.toUpperCase()) as Role[]) : []

    return user
  }, [loading, error, data, claimValue, sessionContext])

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
