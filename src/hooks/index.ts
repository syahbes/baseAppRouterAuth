// src/hooks/index.ts

/**
 * Barrel export for all hooks
 * Note: Feature-specific hooks are exported from their respective feature folders
 */

export {
  useAuthUser,
  useLogin,
  useLogout,
  useIsAuthenticated,
  AUTH_KEYS,
} from './useAuth';