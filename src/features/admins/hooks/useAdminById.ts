// src/hooks/useAdminsData.ts
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services';
import type { Admin, ApiError } from '@/types';

export const useAdminById = (id: number) => {
  return useQuery<Admin, ApiError>({
    queryKey: ['admins', id],
    queryFn: () => apiService.admins.getAdminById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};