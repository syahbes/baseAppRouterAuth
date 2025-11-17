// src/types/auth.types.ts

/**
 * User information decoded from JWT token
 */
export interface User {
  id?: number;
  email?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Login credentials payload
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Authentication response from API
 */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * Auth result with user data
 */
export interface AuthResult {
  user: User;
  tokens: AuthResponse;
}