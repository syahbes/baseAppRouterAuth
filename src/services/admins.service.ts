// src/services/admins.service.ts
import { HttpClient } from './base/httpClient';
import type { AdminsDataResponse } from '@/types';

class AdminsService extends HttpClient {
  /**
   * Get paginated list of admins
   */
  async getAdmins(page: number = 1, pageSize: number = 10): Promise<AdminsDataResponse> {
    return this.get<AdminsDataResponse>(`/admins?page=${page}&pageSize=${pageSize}`);
  }

  /**
   * Get a single admin by ID
   */
  async getAdminById(id: number): Promise<any> {
    return this.get(`/admins/${id}`);
  }

  /**
   * Create a new admin
   */
  async createAdmin(data: any): Promise<any> {
    return this.post('/admins', data);
  }

  /**
   * Update an existing admin
   */
  async updateAdmin(id: number, data: any): Promise<any> {
    return this.patch(`/admins/${id}`, data);
  }

  /**
   * Delete an admin
   */
  async deleteAdmin(id: number): Promise<void> {
    return this.delete(`/admins/${id}`);
  }
}

export const adminsService = new AdminsService();