// src/types/index.ts

// Re-export auth types
export type {
  LoginCredentials,
  AuthResponse,
  AuthError,
} from '@/services/authService';

// Re-export token/user types
export type {
  User,
  JWTPayload,
} from '@/utils/tokenUtils';

// Re-export API types
export type {
  ApiError,
  Admin,
  AdminsDataResponse,
} from '@/services/apiService';

// You can add more shared types here as your app grows
// For example:
// export interface Brand {
//   id: number;
//   name: string;
//   logo?: string;
// }

// export interface Campaign {
//   id: number;
//   name: string;
//   brandId: number;
//   startDate: string;
//   endDate: string;
// }



/*
TODO
change this
// src/providers/AuthProvider.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService, type LoginCredentials, type AuthError } from '@/services/authService';
import type { User } from '@/utils/tokenUtils';

to import from thisnfile
// Instead of:
import type { LoginCredentials } from '@/services/authService';
import type { User } from '@/utils/tokenUtils';
import type { Admin } from '@/services/apiService';

// You can now do:
import type { LoginCredentials, User, Admin } from '@/types';
*/