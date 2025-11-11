import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import { useAuth } from '@/providers/AuthProvider'
import LoginPage from '@/pages/login';
import HomePage from '@/pages/home';
import AdminsPage from '@/pages/admins';
import BrandsPage from '@/pages/brands';
import CampaignsPage from '@/pages/campaigns';
import InfluencersPage from '@/pages/influencers';
import ProtectedRoute from './ProtectedRoute';

// Loading component for session validation
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #007bff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <p style={{ color: '#666' }}>Loading...</p>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

function AppRouter() {
  const { isAuth, isLoading } = useAuth();

  // Show loading spinner while checking session
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