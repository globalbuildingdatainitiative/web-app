import { useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui'
import * as reactRouterDom from 'react-router-dom'
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui'
import { UserProvider } from '@context'
import { SessionAuth } from 'supertokens-auth-react/recipe/session'
import { App } from '@components'
import { lazy } from 'react'

const RejectInvitationPage = lazy(() => import('../../pages/RejectInvitationPage'))
const ExistingUserInvitationPage = lazy(() => import('../../pages/ExistingUserInvitationPage'))
const NewUserInvitationPage = lazy(() => import('../../pages/NewUserInvitationPage'))

export const GBDIRoutes = () => {
  const navigate = useNavigate()
  return (
    <Routes>
      <Route path='/reject-invite' element={<RejectInvitationPage />} />
      <Route path='/accept-invite' element={<ExistingUserInvitationPage />} />
      <Route path='/accept-invite-new' element={<NewUserInvitationPage />} />
      {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [EmailPasswordPreBuiltUI])}
      <Route
        path='*'
        element={
          <UserProvider>
            <SessionAuth
              onSessionExpired={() => {
                navigate('/auth')
              }}
            >
              <App />
            </SessionAuth>
          </UserProvider>
        }
      />
    </Routes>
  )
}
