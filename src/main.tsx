import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@components'
import { BrowserRouter } from 'react-router-dom'

import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import Session from 'supertokens-auth-react/recipe/session'

SuperTokens.init({
  appInfo: {
    appName: import.meta.env.VITE_APP_NAME as string,
    apiDomain: import.meta.env.VITE_API_DOMAIN as string, //Backend is hosted on port 7001
    websiteDomain: import.meta.env.VITE_WEB_DOMAIN as string, //App is hosted on port 8000
    apiBasePath: import.meta.env.VITE_API_PATH as string,
    websiteBasePath: import.meta.env.VITE_WEB_PATH as string,
  },
  recipeList: [EmailPassword.init(), Session.init()],
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SuperTokensWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SuperTokensWrapper>
  </React.StrictMode>,
)
