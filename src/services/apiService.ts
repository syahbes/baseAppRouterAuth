// src/services/apiService.ts
import { authService } from './authService';
import { adminsService } from './admins.service';
import { brandsService } from './brands.service';
import { campaignsService } from './campaigns.service';
import { influencersService } from './influencers.service';

/**
 * Main API service that orchestrates all domain-specific services
 * and provides a centralized access point for API calls
 */
class ApiService {
  // Domain services
  public readonly admins = adminsService;
  public readonly brands = brandsService;
  public readonly campaigns = campaignsService;
  public readonly influencers = influencersService;

  constructor() {
    this.setupTokenRefresh();
  }

  /**
   * Setup token refresh callback for all HTTP clients
   */
  private setupTokenRefresh(): void {
    const refreshCallback = async () => {
      await authService.refresh();
    };

    // Inject refresh callback into all services
    (adminsService as any).refreshCallback = refreshCallback;
    (brandsService as any).refreshCallback = refreshCallback;
    (campaignsService as any).refreshCallback = refreshCallback;
    (influencersService as any).refreshCallback = refreshCallback;
  }
}

export const apiService = new ApiService();

// Backward compatibility - deprecated, use apiService.admins.getAdmins() instead
export const getAdmins = () => apiService.admins.getAdmins();