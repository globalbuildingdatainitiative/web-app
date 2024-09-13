import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@components'
import * as reactRouterDom from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import Session, { SessionAuth } from 'supertokens-auth-react/recipe/session'
import { GraphQLProvider, UserProvider } from '@context'
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui'
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui'
import { Route, Routes } from 'react-router'
const RejectInvitePage = lazy(() => import('pages/RejectInvitePage'))
const AcceptInvitePage = lazy(() => import('pages/AcceptInvitePage'))

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SuperTokensWrapper>
      <BrowserRouter>
        <GraphQLProvider>
          <Routes>
            <Route path='/reject-invite' element={<RejectInvitePage />} />
            <Route path='/accept-invite' element={<AcceptInvitePage />} />
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
        </GraphQLProvider>
      </BrowserRouter>
    </SuperTokensWrapper>
  </React.StrictMode>,
)
