export interface AccountCredentials {
  username: string;
  password: string;
}

export interface TokenDto {
  token: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RoleDto {
  id: string
  name: string
}
