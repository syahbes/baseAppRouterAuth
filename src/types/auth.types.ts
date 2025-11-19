// src/types/auth.types.ts

/**
 * User information from /admins/me endpoint
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

/**
 * Login credentials payload
 */
export interface LoginCredentials {
  email: string;
  password: string;
}