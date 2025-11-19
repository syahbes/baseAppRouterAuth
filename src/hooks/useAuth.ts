// src/hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services';
import type { LoginCredentials, User, ApiError } from '@/types';
import { toast } from "sonner"

// Query key constants
export const AUTH_KEYS = {
  user: ['auth', 'user'] as const,
};

/**
 * Hook to get current user session
 * Fetches user data on mount using the /admins/me endpoint
 */
export const useAuthUser = () => {
  return useQuery<User, ApiError>({
    queryKey: AUTH_KEYS.user,
    queryFn: async () => {
      return await authService.getMe();
    },
    retry: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes (formerly cacheTime)
  });
};

/**
 * Hook to handle login
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<User, ApiError, LoginCredentials>({
    mutationFn: async (credentials) => {
      const user = await authService.login(credentials);
      return user;
    },
    onSuccess: (user) => {
      // Set the user in the cache
      queryClient.setQueryData(AUTH_KEYS.user, user);
    },
    onError: (error) => {
      console.error('Login failed:', error);
      let message = 'Login failed';
      if (error.status === 401) {
        message = 'Wrong email or password';
      }
      toast.error(message);
    },
  });
};

/**
 * Hook to handle logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError>({
    mutationFn: async () => {
      await authService.logout();
    },
    onSettled: () => {
      // Immediately clear the user data from cache
      queryClient.setQueryData(AUTH_KEYS.user, null);
      // Then clear all queries
      queryClient.clear();
    },
  });
};

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = () => {
  const { data: user, isLoading } = useAuthUser();
  
  return {
    isAuth: !!user,
    user,
    isLoading,
  };
};