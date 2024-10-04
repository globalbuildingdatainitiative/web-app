import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@components'
import * as reactRouterDom from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import Session, { SessionAuth } from 'supertokens-auth-react/recipe/session'
import { GraphQLProvider, UserProvider } from '@context'
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui'
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui'
import { Route, Routes } from 'react-router'
import { MobileRedirect } from '@components'

const RejectInvitationPage = lazy(() => import('pages/RejectInvitationPage'))
const ExistingUserInvitationPage = lazy(() => import('pages/ExistingUserInvitationPage'))
const NewUserInvitationPage = lazy(() => import('pages/NewUserInvitationPage'))

SuperTokens.init({
  appInfo: {
    appName: import.meta.env.VITE_APP_NAME,
    apiDomain: import.meta.env.VITE_AUTH_API_DOMAIN,
    websiteDomain: import.meta.env.VITE_WEB_DOMAIN,
    apiBasePath: import.meta.env.VITE_AUTH_API_PATH,
    websiteBasePath: import.meta.env.VITE_AUTH_WEB_PATH,
  },
  style: `
        [data-supertokens~=button] {
            background-color: #1d9a78;
            border: 0px;
            border-radius: 6px;
            width: 30%;
            margin: 0 auto;
            transition: all 0.4s
        }
        button[data-supertokens~='button']:hover {
            background-color: #134f5c !important; /* Darker shade on hover (#166b65) */
          }
          [data-supertokens~=linkButton] {
            color: #1d9a78;
        }
        [data-supertokens~=link] {
            color: #1d9a78;
        }
        [data-supertokens~=label] {
            font-family: Calibri, sans-serif;
        }
        [data-supertokens~=container] {
            box-shadow: #1d9a78;
        }
        [data-supertokens~="headerSubtitle"][data-supertokens~="secondaryText"] {
            color: #868d8b;
            font-family: Calibri, sans-serif;
        }
        `,

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
    <MantineProvider>
      <MobileRedirect>
        <SuperTokensWrapper>
          <BrowserRouter>
            <GraphQLProvider>
              <Routes>
                <Route path='/reject-invite' element={<RejectInvitationPage />} />
                <Route path='/accept-invite' element={<ExistingUserInvitationPage />} />
                <Route path='/accept-invite-new' element={<NewUserInvitationPage />} />
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
      </MobileRedirect>
    </MantineProvider>
  </React.StrictMode>,
)
