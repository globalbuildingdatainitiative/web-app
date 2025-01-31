import React, { lazy, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import { AppLayout, Loading } from '@components'
import { Center } from '@mantine/core'
import { useUserContext } from '@context'
import { useLocation } from 'react-router-dom'
import { AdminRoute } from './AdminRoute.tsx'

const AddMembersPage = lazy(() => import('../../pages/AddMembersPage'))
const ContributionPage = lazy(() => import('../../pages/ContributionPage'))
const ContributeNowPage = lazy(() => import('../../pages/ContributeNowPage'))
const DashboardPage = lazy(() => import('../../pages/DashboardPage'))
const OrganizationPage = lazy(() => import('../../pages/OrganizationPage'))
const CreateOrganizationPage = lazy(() => import('../../pages/CreateOrganizationPage'))
const EditProfilePage = lazy(() => import('../../pages/EditProfilePage'))
const EditOrganizationPage = lazy(() => import('../../pages/EditOrganizationPage'))
const Page404 = lazy(() => import('../../pages/404Page'))
const ProjectDetailsPage = lazy(() => import('../../pages/ProjectDetailsPage'))
const AdminPage = lazy(() => import('../../pages/AdminPage'))
const CarbonIntensityPortfolioPage = lazy(() => import('../../pages/CarbonIntensityPortfolioPage'))
const AttributePortfolioPage = lazy(() => import('../../pages/AttributePortfolioPage'))
const DetailsPage = lazy(() => import('../../pages/DetailsPage'))

export const AppRouter = () => {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // If the user is not part of any organization, redirect to create organization page
    if (user && !user.organization && location.pathname !== '/organization/new') {
      navigate('/organization/new')
    }
  }, [user, navigate, location])

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
          <Route
            path='/admin'
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route path='/contributions' element={<ContributionPage />} />
          <Route path='/contributions/new' element={<ContributeNowPage />} />
          <Route path='/contributions/:contributionId/project' element={<ProjectDetailsPage />} />
          <Route path='/details' element={<DetailsPage />} />
          <Route path='/organization' element={<OrganizationPage />} />
          <Route path='/organization/addmembers' element={<AddMembersPage />} />
          <Route path='/organization/edit' element={<EditOrganizationPage />} />
          <Route path='/organization/new' element={<CreateOrganizationPage />} />
          <Route path='/portfolio/attributes' element={<AttributePortfolioPage />} />
          <Route path='/portfolio/carbon-intensity' element={<CarbonIntensityPortfolioPage />} />
          <Route path='/profile' element={<EditProfilePage />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </React.Suspense>
  )
}
