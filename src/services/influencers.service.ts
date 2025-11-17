// src/services/influencers.service.ts
import { HttpClient } from './base/httpClient';
import type { PaginatedResponse } from '@/types';

// Define Influencer type (you can move this to types later if needed)
export interface Influencer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  followersCount?: number;
  platform?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export type InfluencersDataResponse = PaginatedResponse<Influencer>;

class InfluencersService extends HttpClient {
  /**
   * Get paginated list of influencers
   */
  async getInfluencers(page: number = 1, pageSize: number = 10): Promise<InfluencersDataResponse> {
    return this.get<InfluencersDataResponse>(`/influencers?page=${page}&pageSize=${pageSize}`);
  }

  /**
   * Get a single influencer by ID
   */
  async getInfluencerById(id: number): Promise<Influencer> {
    return this.get<Influencer>(`/influencers/${id}`);
  }

  /**
   * Create a new influencer
   */
  async createInfluencer(data: Partial<Influencer>): Promise<Influencer> {
    return this.post<Influencer>('/influencers', data);
  }

  /**
   * Update an existing influencer
   */
  async updateInfluencer(id: number, data: Partial<Influencer>): Promise<Influencer> {
    return this.patch<Influencer>(`/influencers/${id}`, data);
  }

  /**
   * Delete an influencer
   */
  async deleteInfluencer(id: number): Promise<void> {
    return this.delete(`/influencers/${id}`);
  }

  /**
   * Search influencers by criteria
   */
  async searchInfluencers(searchParams: {
    query?: string;
    platform?: string;
    category?: string;
    minFollowers?: number;
    page?: number;
    pageSize?: number;
  }): Promise<InfluencersDataResponse> {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    });
    return this.get<InfluencersDataResponse>(`/influencers/search?${params.toString()}`);
  }
}

export const influencersService = new InfluencersService();