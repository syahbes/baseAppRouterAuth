// src/services/index.ts

/**
 * Barrel export for all services
 * This allows importing services from a single location: import { apiService, authService } from '@/services'
 */

export { apiService } from './apiService';
export { authService } from './authService';
export { adminsService } from './admins.service';
export { brandsService } from './brands.service';
export { campaignsService } from './campaigns.service';
export { influencersService } from './influencers.service';

// Re-export types for convenience
export type { Brand, BrandsDataResponse } from './brands.service';
export type { Campaign, CampaignsDataResponse } from './campaigns.service';
export type { Influencer, InfluencersDataResponse } from './influencers.service';