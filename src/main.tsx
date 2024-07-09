import React from 'react'
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
          if (context.isNewRecipeUser && context.user.loginMethods.length === 1) {
            console.log('New user signed up with email and password', context.user)
            window.location.reload()
          } else {
            console.log('User signed in with email and password', context.user)
            window.location.reload()
          }
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
          <UserProvider>
            <Routes>
              {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [EmailPasswordPreBuiltUI])}
              <Route
                path='*'
                element={
                  <SessionAuth>
                    <App />
                  </SessionAuth>
                }
              />
            </Routes>
          </UserProvider>
        </GraphQLProvider>
      </BrowserRouter>
    </SuperTokensWrapper>
  </React.StrictMode>,
)
