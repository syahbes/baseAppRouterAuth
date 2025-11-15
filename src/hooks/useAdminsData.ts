// src/hooks/useAdminsData.ts
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/apiService';
import type { AdminsDataResponse } from '@/types';

export const useAdminsData = () => {
  return useQuery<AdminsDataResponse, Error>({
    queryKey: ['admins'],
    queryFn: () => apiService.getAdmins(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};