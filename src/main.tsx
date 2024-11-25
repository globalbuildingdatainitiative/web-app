import React from 'react'
import ReactDOM from 'react-dom/client'
import { GBDIRoutes, MobileRedirect } from '@components'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import Session from 'supertokens-auth-react/recipe/session'
import { GraphQLProvider } from '@context'

SuperTokens.init({
  appInfo: {
    appName: import.meta.env.VITE_APP_NAME,
    apiDomain: import.meta.env.VITE_AUTH_API_DOMAIN,
    websiteDomain: import.meta.env.VITE_WEB_DOMAIN,
    apiBasePath: import.meta.env.VITE_AUTH_API_PATH,
    websiteBasePath: import.meta.env.VITE_AUTH_WEB_PATH,
  },
  style: `
        [data-supertokens~=container] {
            box-shadow: #1d9a78;
            padding-top: 120px !important;
            padding-bottom: 24px !important;
            position: relative;
        }
        [data-supertokens~=container]:before {
            content: '';
            background-image: url('/src/assets/logo.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            width: 120px;
            height: 120px;
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
        }
        [data-supertokens~=headerTitle] {
            text-align: center !important;
            margin-bottom: 25px !important;
        }

        [data-supertokens~=button] {
            background-color: #1d9a78;
            border: 0px;
            border-radius: 6px;
            width: 30%;
            margin: 0 auto;
            transition: all 0.4s
        }
        button[data-supertokens~='button']:hover {
            background-color: #134f5c !important;
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
              <GBDIRoutes />
            </GraphQLProvider>
          </BrowserRouter>
        </SuperTokensWrapper>
      </MobileRedirect>
    </MantineProvider>
  </React.StrictMode>,
)
