import React, { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { Loading } from '@components'
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui'
import * as reactRouterDom from 'react-router-dom'
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui'
import { SessionAuth } from 'supertokens-auth-react/recipe/session'

const ContributionPage = lazy(() => import('../../pages/ContributionPage'))
const DashboardPage = lazy(() => import('../../pages/DashboardPage'))
const OrganizationPage = lazy(() => import('../../pages/OrganizationPage'))
const Page404 = lazy(() => import('../../pages/404Page'))

export const AppRouter = () => (
  <React.Suspense fallback={<Loading />}>
    <Routes>
      {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [EmailPasswordPreBuiltUI])}
      <Route path="/" element={<SessionAuth><DashboardPage /></SessionAuth>} />
      <Route path="/organization" element={<SessionAuth><OrganizationPage /></SessionAuth>} />
      <Route path="/contributions" element={<SessionAuth><ContributionPage /></SessionAuth>} />
      <Route path="*" element={<SessionAuth><Page404 /></SessionAuth>} />
    </Routes>
  </React.Suspense>
)
