import React, { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { Loading } from '@components'

const LandingPage = lazy(() => import('../../pages/LandingPage'))

export const AppRouter = () => (
  <React.Suspense fallback={<Loading />}>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='*' element={<LandingPage />} />
    </Routes>
  </React.Suspense>
)
