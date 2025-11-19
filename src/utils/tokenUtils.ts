// src/utils/tokenUtils.ts

/**
 * Check if user has admin privileges
 */
export const isAdminRole = (role: string): boolean => {
  return role === 'admin' || role === 'super_admin';
};