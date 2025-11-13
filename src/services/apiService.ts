// src/services/apiService.ts
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface UserData {
  id: string;
  email: string;
  name?: string;
  role?: string;
  createdAt?: string;
  lastLogin?: string;
  preferences?: {
    theme?: string;
    notifications?: boolean;
  };
}
interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
interface AdminsDataResponse {
  items: Admin[];
  page: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ApiError {
  message: string;
  status?: number;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || "";

    if (!this.baseUrl) {
      console.warn("VITE_API_URL not found in environment variables");
    }
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This ensures cookies are sent and received
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || "Login failed",
          status: response.status,
        } as ApiError;
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        // Network error
        throw {
          message: "Network error. Please check your connection.",
          status: 0,
        } as ApiError;
      }

      // Re-throw API errors
      throw error as ApiError;
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Don't throw error for logout - we'll clear local state anyway
    }
  }

  async refresh(): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        credentials: "include", // This sends the refresh token cookie
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || "Token refresh failed",
          status: response.status,
        } as ApiError;
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        throw {
          message: "Network error during token refresh",
          status: 0,
        } as ApiError;
      }

      throw error as ApiError;
    }
  }

  async getAdmins(): Promise<AdminsDataResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/admins`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || "Failed to fetch admins",
          status: response.status,
        } as ApiError;
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        throw {
          message: "Network error while fetching admins",
          status: 0,
        } as ApiError;
      }

      throw error as ApiError;
    }
  }
}

export const apiService = new ApiService();
export type {
  LoginCredentials,
  LoginResponse,
  ApiError,
  UserData,
  AdminsDataResponse,
};