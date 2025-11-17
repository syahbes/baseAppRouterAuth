// src/services/brands.service.ts
import { HttpClient } from './base/httpClient';
import type { PaginatedResponse } from '@/types';

// Define Brand type (you can move this to types later if needed)
export interface Brand {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type BrandsDataResponse = PaginatedResponse<Brand>;

class BrandsService extends HttpClient {
  /**
   * Get paginated list of brands
   */
  async getBrands(page: number = 1, pageSize: number = 10): Promise<BrandsDataResponse> {
    return this.get<BrandsDataResponse>(`/brands?page=${page}&pageSize=${pageSize}`);
  }

  /**
   * Get a single brand by ID
   */
  async getBrandById(id: number): Promise<Brand> {
    return this.get<Brand>(`/brands/${id}`);
  }

  /**
   * Create a new brand
   */
  async createBrand(data: Partial<Brand>): Promise<Brand> {
    return this.post<Brand>('/brands', data);
  }

  /**
   * Update an existing brand
   */
  async updateBrand(id: number, data: Partial<Brand>): Promise<Brand> {
    return this.patch<Brand>(`/brands/${id}`, data);
  }

  /**
   * Delete a brand
   */
  async deleteBrand(id: number): Promise<void> {
    return this.delete(`/brands/${id}`);
  }
}

export const brandsService = new BrandsService();