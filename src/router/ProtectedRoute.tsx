// src/router/ProtectedRoute.tsx
import { Navigate } from 'react-router';
import { useAuth } from '@/providers/AuthProvider';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth();
  return isAuth ? <>{children}</> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
