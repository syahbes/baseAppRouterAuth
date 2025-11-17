// src/hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services';
import type { LoginCredentials, User, ApiError } from '@/types';

// Query key constants
export const AUTH_KEYS = {
  user: ['auth', 'user'] as const,
};

/**
 * Hook to get current user session
 */
export const useAuthUser = () => {
  return useQuery<User, ApiError>({
    queryKey: AUTH_KEYS.user,
    queryFn: async () => {
      const { user } = await authService.refresh();
      return user;
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
      const { user } = await authService.login(credentials);
      return user;
    },
    onSuccess: (user) => {
      // Set the user in the cache
      queryClient.setQueryData(AUTH_KEYS.user, user);
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
      // Clear all queries on logout
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