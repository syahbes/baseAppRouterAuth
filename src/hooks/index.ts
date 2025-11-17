// src/hooks/index.ts

/**
 * Barrel export for all hooks
 * This allows importing hooks from a single location: import { useAuth, useAdminsData } from '@/hooks'
 */

export {
  useAuthUser,
  useLogin,
  useLogout,
  useIsAuthenticated,
  AUTH_KEYS,
} from './useAuth';

export { useAdminsData } from './useAdminsData';