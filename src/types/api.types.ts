// src/types/api.types.ts

/**
 * Standard API error structure
 */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

/**
 * Paginated response metadata
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Generic paginated response wrapper
 */
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Admin entity
 */
export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

/**
 * Admin list response
 */
export type AdminsDataResponse = PaginatedResponse<Admin>;