// src/utils/tokenUtils.ts
import { jwtDecode } from 'jwt-decode';

export interface JWTPayload {
  email: string;
  user_name: string;
  role: string;
  exp?: number;
  iat?: number;
}

export interface User {
  email: string;
  user_name: string;
  role: string;
}

/**
 * Decode a JWT token and extract user information
 */
export const decodeToken = (token: string): JWTPayload => {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch (error) {
    throw new Error('Invalid token format');
  }
};

/**
 * Extract user data from a decoded token
 */
export const getUserFromToken = (token: string): User => {
  const decoded = decodeToken(token);
  return {
    email: decoded.email,
    user_name: decoded.user_name,
    role: decoded.role,
  };
};

/**
 * Check if user has admin privileges
 */
export const isAdminRole = (role: string): boolean => {
  return role === 'admin' || role === 'super_admin';
};

/**
 * Check if a token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeToken(token);
    if (!decoded.exp) return true;
    
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};