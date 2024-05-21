import React, { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { Loading } from '@components'

const ContributionPage = lazy(() => import('../../pages/ContributionPage'))
const ContributeNowPage = lazy(() => import('../../pages/ContributeNowPage'))
const DashboardPage = lazy(() => import('../../pages/DashboardPage'))
const OrganizationPage = lazy(() => import('../../pages/OrganizationPage'))
const CreateOrganizationPage = lazy(() => import('../../pages/CreateOrganizationPage'))
const Page404 = lazy(() => import('../../pages/404Page'))

export const AppRouter = () => (
  <React.Suspense fallback={<Loading />}>
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      <Route path='/organization' element={<OrganizationPage />} />
      <Route path='/organization/new' element={<CreateOrganizationPage />} />
      <Route path='/contributions' element={<ContributionPage />} />
      <Route path='/contributions/new' element={<ContributeNowPage />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  </React.Suspense>
)
