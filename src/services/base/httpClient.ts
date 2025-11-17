// src/services/base/httpClient.ts
import axios, { type AxiosInstance, AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { config } from '@/config/env';
import type { ApiError } from '@/types';

export class HttpClient {
  protected client: AxiosInstance;
  private isRefreshing = false;
  private refreshPromise: Promise<void> | null = null;
  private refreshCallback?: () => Promise<void>;

  constructor(refreshCallback?: () => Promise<void>) {
    this.refreshCallback = refreshCallback;
    
    this.client = axios.create({
      baseURL: config.apiUrl,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Don't retry if no config or if the failed request was to auth endpoints
        if (!originalRequest || originalRequest.url?.includes('/auth/')) {
          return Promise.reject(this.handleError(error));
        }

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.handleTokenRefresh();
            return this.client(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Handle token refresh with promise caching to prevent multiple simultaneous refresh calls
   */
  private async handleTokenRefresh(): Promise<void> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    if (!this.refreshCallback) {
      throw new Error('No refresh callback provided');
    }

    this.isRefreshing = true;
    this.refreshPromise = this.refreshCallback()
      .finally(() => {
        this.isRefreshing = false;
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }

  protected handleError(error: AxiosError): ApiError {
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

  // Generic CRUD methods
  protected async get<T>(url: string): Promise<T> {
    try {
      const response = await this.client.get<T>(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  protected async post<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  protected async put<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  protected async patch<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.patch<T>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  protected async delete<T>(url: string): Promise<T> {
    try {
      const response = await this.client.delete<T>(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }
}