import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import { useAuth } from '@/providers/AuthProvider'
import LoginPage from '@/pages/login';
import HomePage from '@/pages/home';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  const { isAuth } = useAuth();

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
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
