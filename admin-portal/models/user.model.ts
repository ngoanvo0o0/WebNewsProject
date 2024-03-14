export interface UserDto {
  id: string;
  email: string;
  name: string;
  bio?: string
  status?: UserStatus
  createdAt?: string
  hashedPassword: string;
  roleId: string
  permissions?: string[]
  phoneNumber?: string
  userNameUpdated?: string
  updatedAt?: string
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive'
}

export interface GetUsersResponse {
  data: UserDto[]
}

export interface GetUsersByIdResponse {
  data: UserDto
}

export interface UpsertUserRequest {
  id?: string
  fullName: string
  email: string
  status?: 'active' | 'inactive'
  roleId?: string
  phoneNumber?: string
  password?: string;
}

export interface UpsertUserResponse {
  id: string
  name?: string
  email?: string
  phoneNumber?: string
}
