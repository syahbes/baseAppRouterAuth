// src/hooks/useUserData.ts
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/apiService';
import { useAuth } from '@/providers/AuthProvider';

export const useUserData = () => {
  const { isAuth } = useAuth();

  return useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const response = await apiService.getUserData();
      return response.user;
    },
    enabled: isAuth, // Only fetch when user is authenticated
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 1, // Only retry once on failure
  });
};