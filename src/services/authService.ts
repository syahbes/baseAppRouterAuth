// src/services/authService.ts
import axios, { AxiosError } from 'axios';
import { config } from '@/config/env';
import { getUserFromToken, isAdminRole } from '@/utils/tokenUtils';
import type { LoginCredentials, AuthResult, ApiError } from '@/types';

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
   * Login admin user
   */
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const response = await axios.post<AuthResult['tokens']>(
        `${this.baseURL}/auth/login/admin`,
        credentials,
        { withCredentials: true }
      );

      const user = getUserFromToken(response.data.accessToken);
      
      if (!isAdminRole(user.role)) {
        throw new Error('Unauthorized: Admin access required');
      }

      return {
        user,
        tokens: response.data,
      };
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
   * Refresh access token
   */
  async refresh(): Promise<AuthResult> {
    try {
      const response = await axios.post<AuthResult['tokens']>(
        `${this.baseURL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      const user = getUserFromToken(response.data.accessToken);
      
      if (!isAdminRole(user.role)) {
        throw new Error('Unauthorized: Admin access required');
      }

      return {
        user,
        tokens: response.data,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }
}

export const authService = new AuthService();