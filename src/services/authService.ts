// src/services/authService.ts
import axios, { AxiosError } from 'axios';
import { config } from '@/config/env';
import { isAdminRole } from '@/utils/tokenUtils';
import type { LoginCredentials, User, ApiError } from '@/types';

class AuthService {
  private readonly baseURL: string;

  constructor() {
    this.baseURL = config.apiUrl;
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      const data = error.response.data as any;
      return {
        message: data?.message || 'An error occurred',
        status: error.response.status,
        code: data?.code,
      };
    }
    
    if (error.request) {
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
        code: 'NETWORK_ERROR',
      };
    }
    
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
      code: 'UNKNOWN_ERROR',
    };
  }

  /**
   * Get current user information
   */
  async getMe(): Promise<User> {
    try {
      const response = await axios.get<User>(
        `${this.baseURL}/admins/me`,
        { withCredentials: true }
      );
      
      if (!isAdminRole(response.data.role)) {
        throw new Error('Unauthorized: Admin access required');
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Login admin user
   */
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      await axios.post(
        `${this.baseURL}/auth/login/admin`,
        credentials,
        { withCredentials: true }
      );

      // After successful login, fetch user details
      return await this.getMe();
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await axios.post(
        `${this.baseURL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  /**
   * Refresh access token and get user
   */
  async refresh(): Promise<User> {
    try {
      await axios.post(
        `${this.baseURL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      // After refresh, fetch user details
      return await this.getMe();
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }
}

export const authService = new AuthService();