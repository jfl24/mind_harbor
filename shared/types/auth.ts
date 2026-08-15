export interface RegisterRequest {
  email: string;
  passwordHash: string;
  pseudonyme?: string;
  nom?: string;
  prenom?: string;
  avatar?: string;
  bio?: string;
}

export interface LoginRequest {
  email: string;
  passwordHash: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  token: string;
}

export interface AuthTokens {
  tokenAcces: string;
  tokenRefresh: string;
}

export interface LoginResponse {
  succes: boolean;
  data: AuthTokens;
  message: string;
}