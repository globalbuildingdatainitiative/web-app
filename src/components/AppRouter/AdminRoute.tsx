import React from 'react'
import { SessionAuth } from 'supertokens-auth-react/recipe/session'
import { AccessDeniedScreen } from 'supertokens-auth-react/recipe/session/prebuiltui'
import { UserRoleClaim } from 'supertokens-auth-react/recipe/userroles'

interface AdminRouteProps {
  children: React.ReactNode
}

export const AdminRoute = (props: AdminRouteProps) => {
  const { children } = props
  return (
    <SessionAuth
      accessDeniedScreen={AccessDeniedScreen}
      overrideGlobalClaimValidators={(globalValidators) => [
        ...globalValidators,
        UserRoleClaim.validators.includes('admin'),
      ]}
    >
      {children}
    </SessionAuth>
  )
}
