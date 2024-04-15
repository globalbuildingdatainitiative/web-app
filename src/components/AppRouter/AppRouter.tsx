import React, { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { Loading } from '@components'

const DashboardPage = lazy(() => import('../../pages/DashboardPage'))
const Page404 = lazy(() => import('../../pages/404Page'))

export const AppRouter = () => (
  <React.Suspense fallback={<Loading />}>
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  </React.Suspense>
)
