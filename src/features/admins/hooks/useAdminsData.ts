// src/hooks/useAdminsData.ts
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services';
import type { AdminsDataResponse, ApiError } from '@/types';

export const useAdminsData = (page: number = 1, pageSize: number = 10) => {
  return useQuery<AdminsDataResponse, ApiError>({
    queryKey: ['admins', page, pageSize],
    queryFn: () => apiService.admins.getAdmins(page, pageSize),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};