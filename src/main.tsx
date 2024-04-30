import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@components'
import { BrowserRouter } from 'react-router-dom'

import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import Session, { SessionAuth } from 'supertokens-auth-react/recipe/session'
import { GraphQLProvider } from '@context'
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui'
import * as reactRouterDom from 'react-router-dom'
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
  recipeList: [EmailPassword.init(), Session.init()],
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SuperTokensWrapper>
      <BrowserRouter>
        <GraphQLProvider>
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
        </GraphQLProvider>
      </BrowserRouter>
    </SuperTokensWrapper>
  </React.StrictMode>,
)
