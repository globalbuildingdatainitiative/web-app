import React, { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { AppLayout, Loading } from '@components'
import { Center } from '@mantine/core'

const ContributionPage = lazy(() => import('../../pages/ContributionPage'))
const ContributeNowPage = lazy(() => import('../../pages/ContributeNowPage'))
const DashboardPage = lazy(() => import('../../pages/DashboardPage'))
const OrganizationPage = lazy(() => import('../../pages/OrganizationPage'))
const CreateOrganizationPage = lazy(() => import('../../pages/CreateOrganizationPage'))
const ProfilePage = lazy(() => import('../../pages/ProfilePage'))
const Page404 = lazy(() => import('../../pages/404Page'))

export const AppRouter = () => (
  <React.Suspense
    fallback={
      <Center style={{ height: '100vh' }}>
        <Loading />
      </Center>
    }
  >
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/organization' element={<OrganizationPage />} />
        <Route path='/organization/new' element={<CreateOrganizationPage />} />
        <Route path='/contributions' element={<ContributionPage />} />
        <Route path='/contributions/new' element={<ContributeNowPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  </React.Suspense>
)
