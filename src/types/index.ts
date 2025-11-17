// src/types/index.ts

/**
 * Barrel export for all type definitions
 * This allows importing types from a single location: import { User, ApiError } from '@/types'
 */

export type {
  User,
  LoginCredentials,
  AuthResponse,
  AuthResult,
} from './auth.types';

export type {
  ApiError,
  PaginationMeta,
  PaginatedResponse,
  Admin,
  AdminsDataResponse,
} from './api.types';