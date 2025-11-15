// src/services/authService.ts
import axios, { AxiosError } from 'axios';
import { getUserFromToken, isAdminRole } from '@/utils/tokenUtils';
import type { User } from '@/utils/tokenUtils';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthError {
  message: string;
  status?: number;
}

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || "";
    
    if (!this.baseURL) {
      console.warn("VITE_API_URL not found in environment variables");
    }
  }

  private handleError(error: AxiosError): AuthError {
    if (error.response) {
      const data = error.response.data as any;
      return {
        message: data?.message || 'An error occurred',
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
      };
    } else {
      return {
        message: error.message || 'An unexpected error occurred',
        status: 0,
      };
    }
  }

  /**
   * Login admin user
   */
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthResponse }> {
    try {
      const response = await axios.post<AuthResponse>(
        `${this.baseURL}/auth/login/admin`,
        credentials,
        { withCredentials: true }
      );

      const user = getUserFromToken(response.data.accessToken);
      
      // Verify user has admin role
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
      // Don't throw error for logout - we'll clear local state anyway
      console.error('Logout error:', error);
    }
  }

  /**
   * Refresh access token
   */
  async refresh(): Promise<{ user: User; tokens: AuthResponse }> {
    try {
      const response = await axios.post<AuthResponse>(
        `${this.baseURL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      const user = getUserFromToken(response.data.accessToken);
      
      // Verify user still has admin role
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