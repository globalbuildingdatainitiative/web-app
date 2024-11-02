import React, { lazy, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import { AppLayout, Loading } from '@components'
import { Center } from '@mantine/core'
import { useUserContext } from '@context'

const AddMembersPage = lazy(() => import('../../pages/AddMembersPage'))
const ContributionPage = lazy(() => import('../../pages/ContributionPage'))
const ContributeNowPage = lazy(() => import('../../pages/ContributeNowPage'))
const DashboardPage = lazy(() => import('../../pages/DashboardPage'))
const OrganizationPage = lazy(() => import('../../pages/OrganizationPage'))
const CreateOrganizationPage = lazy(() => import('../../pages/CreateOrganizationPage'))
const OrganizationPortfolioPage = lazy(() => import('../../pages/PortfolioPage'))
const EditProfilePage = lazy(() => import('../../pages/EditProfilePage'))
const EditOrganizationPage = lazy(() => import('../../pages/EditOrganizationPage'))
const Page404 = lazy(() => import('../../pages/404Page'))

export const AppRouter = () => {
  const { user } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    // If the user is not part of any organization, redirect to create organization page
    if (user && !user.organization) {
      navigate('/organization/new')
    }
  }, [user, navigate])

  return (
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
          <Route path='/organization/edit' element={<EditOrganizationPage />} />
          <Route path='/portfolio' element={<OrganizationPortfolioPage />} />
          <Route path='/organization/addmembers' element={<AddMembersPage />} />
          <Route path='/contributions' element={<ContributionPage />} />
          <Route path='/contributions/new' element={<ContributeNowPage />} />
          <Route path='/profile' element={<EditProfilePage />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </React.Suspense>
  )
}
