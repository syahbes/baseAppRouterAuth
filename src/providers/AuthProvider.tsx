import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { apiService, type LoginCredentials, type ApiError } from '@/services/apiService';
import { jwtDecode } from 'jwt-decode';

interface User {
  email: string;
  user_name: string;
  role: string;
}

interface JWTPayload {
  email: string;
  user_name: string;
  role: string;
}

interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await apiService.refresh();
        const decodedToken = jwtDecode<JWTPayload>(response.accessToken);
        
        if (decodedToken.role !== 'admin' && decodedToken.role !== 'super_admin') {
          // User doesn't have proper role, log them out
          await apiService.logout();
          setIsAuth(false);
          setUser(null);
        } else {
          setUser({
            email: decodedToken.email,
            user_name: decodedToken.user_name,
            role: decodedToken.role,
          });
          setIsAuth(true);
        }
      } catch (error) {
        // If refresh fails, user is not authenticated
        console.log('No valid session found');
        setIsAuth(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.login(credentials);
      const decodedToken = jwtDecode<JWTPayload>(response.accessToken);
      setUser({
        email: decodedToken.email,
        user_name: decodedToken.user_name,
        role: decodedToken.role,
      });
      setIsAuth(true);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message || 'An unexpected error occurred');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state, even if API call fails
      setIsAuth(false);
      setUser(null);
      setError(null);
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    isAuth,
    user,
    isLoading,
    error,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};