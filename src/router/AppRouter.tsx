// src/router/AppRouter.tsx
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import { useIsAuthenticated } from '@/hooks/useAuth';
import LoginPage from '@/pages/login';
import HomePage from '@/pages/home';
import { AdminsPage } from '@/features/admins';
import {BrandsPage} from '@/features/brands/';
import CampaignsPage from '@/pages/campaigns';
import InfluencersPage from '@/pages/influencers';
import ProtectedRoute from './ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';

function AppRouter() {
  const { isAuth, isLoading } = useIsAuthenticated();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={isAuth ? <Navigate to="/home" replace /> : <LoginPage />} 
        />
        <Route 
          path='/home' 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/admins' 
          element={
            <ProtectedRoute>
              <AdminsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/brands' 
          element={
            <ProtectedRoute>
              <BrandsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/campaigns' 
          element={
            <ProtectedRoute>
              <CampaignsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/influencers' 
          element={
            <ProtectedRoute>
              <InfluencersPage />
            </ProtectedRoute>
          } 
        />
        {/* Catch all route - redirect to home if authenticated, login if not */}
        <Route 
          path='*' 
          element={<Navigate to={isAuth ? "/home" : "/"} replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;