import React, { lazy, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@components'
import * as reactRouterDom from 'react-router-dom'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@mantine/hooks'
import { MantineProvider } from '@mantine/core'

import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import Session, { SessionAuth } from 'supertokens-auth-react/recipe/session'
import { GraphQLProvider, UserProvider } from '@context'
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui'
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui'
import { Route, Routes } from 'react-router'

const RejectInvitationPage = lazy(() => import('pages/RejectInvitationPage'))
const ExistingUserInvitationPage = lazy(() => import('pages/ExistingUserInvitationPage'))
const NewUserInvitationPage = lazy(() => import('pages/NewUserInvitationPage'))
const MobileUsersPage = lazy(() => import('pages/MobileUsersPage'))

SuperTokens.init({
  appInfo: {
    appName: import.meta.env.VITE_APP_NAME,
    apiDomain: import.meta.env.VITE_AUTH_API_DOMAIN,
    websiteDomain: import.meta.env.VITE_WEB_DOMAIN,
    apiBasePath: import.meta.env.VITE_AUTH_API_PATH,
    websiteBasePath: import.meta.env.VITE_AUTH_WEB_PATH,
  },
  recipeList: [
    EmailPassword.init({
      signInAndUpFeature: {
        signUpForm: {
          formFields: [
            {
              id: 'firstName',
              label: 'First Name',
              placeholder: 'First Name',
            },
            {
              id: 'lastName',
              label: 'Last Name',
              placeholder: 'Last Name',
            },
          ],
        },
      },
      onHandleEvent: async (context) => {
        if (context.action === 'SUCCESS') {
          localStorage.setItem('userId', context.user.id)
        }
      },
    }),
    Session.init(),
  ],
})

const MobileRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const navigate = useNavigate()

  useEffect(() => {
    if (isMobile) {
      navigate('/mobile')
    }
  }, [isMobile, navigate])

  return <>{children}</>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <SuperTokensWrapper>
        <BrowserRouter>
          <GraphQLProvider>
            <MobileRedirect>
              <Routes>
                <Route path='/reject-invite' element={<RejectInvitationPage />} />
                <Route path='/accept-invite' element={<ExistingUserInvitationPage />} />
                <Route path='/accept-invite-new' element={<NewUserInvitationPage />} />
                <Route path='/mobile' element={<MobileUsersPage />} />
                {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [EmailPasswordPreBuiltUI])}
                <Route
                  path='*'
                  element={
                    <UserProvider>
                      <SessionAuth>
                        <App />
                      </SessionAuth>
                    </UserProvider>
                  }
                />
              </Routes>
            </MobileRedirect>
          </GraphQLProvider>
        </BrowserRouter>
      </SuperTokensWrapper>
    </MantineProvider>
  </React.StrictMode>,
)
