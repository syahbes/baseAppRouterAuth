// src/config/env.ts

/**
 * Centralized environment configuration
 * All environment variables should be accessed through this module
 */

interface EnvConfig {
  apiUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

/**
 * Validates that required environment variables are present
 */
function validateEnv(): void {
  if (!import.meta.env.VITE_API_URL) {
    throw new Error(
      'VITE_API_URL is not defined in environment variables. ' +
      'Please check your .env file.'
    );
  }
}

/**
 * Load and validate environment configuration
 */
function loadConfig(): EnvConfig {
  validateEnv();

  return {
    apiUrl: import.meta.env.VITE_API_URL,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
  };
}

export const config = loadConfig();