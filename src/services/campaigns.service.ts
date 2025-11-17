// src/services/campaigns.service.ts
import { HttpClient } from './base/httpClient';
import type { PaginatedResponse } from '@/types';

// Define Campaign type (you can move this to types later if needed)
export interface Campaign {
  id: number;
  name: string;
  description?: string;
  brandId: number;
  startDate: string;
  endDate: string;
  budget?: number;
  status: 'draft' | 'active' | 'paused' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export type CampaignsDataResponse = PaginatedResponse<Campaign>;

class CampaignsService extends HttpClient {
  /**
   * Get paginated list of campaigns
   */
  async getCampaigns(page: number = 1, pageSize: number = 10): Promise<CampaignsDataResponse> {
    return this.get<CampaignsDataResponse>(`/campaigns?page=${page}&pageSize=${pageSize}`);
  }

  /**
   * Get a single campaign by ID
   */
  async getCampaignById(id: number): Promise<Campaign> {
    return this.get<Campaign>(`/campaigns/${id}`);
  }

  /**
   * Create a new campaign
   */
  async createCampaign(data: Partial<Campaign>): Promise<Campaign> {
    return this.post<Campaign>('/campaigns', data);
  }

  /**
   * Update an existing campaign
   */
  async updateCampaign(id: number, data: Partial<Campaign>): Promise<Campaign> {
    return this.patch<Campaign>(`/campaigns/${id}`, data);
  }

  /**
   * Delete a campaign
   */
  async deleteCampaign(id: number): Promise<void> {
    return this.delete(`/campaigns/${id}`);
  }

  /**
   * Get campaigns by brand
   */
  async getCampaignsByBrand(brandId: number, page: number = 1, pageSize: number = 10): Promise<CampaignsDataResponse> {
    return this.get<CampaignsDataResponse>(`/campaigns?brandId=${brandId}&page=${page}&pageSize=${pageSize}`);
  }
}

export const campaignsService = new CampaignsService();