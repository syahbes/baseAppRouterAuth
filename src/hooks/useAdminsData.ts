// src/hooks/useUserData.ts
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/apiService';
import { useAuth } from '@/providers/AuthProvider';

export const useAdminsData = () => {
  const { isAuth } = useAuth();

  return useQuery({
    queryKey: ['adminsData'],
    queryFn: async () => {
      const response = await apiService.getAdmins();
      return response;
    },
    enabled: isAuth, // Only fetch when user is authenticated
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 1, // Only retry once on failure
  });
};