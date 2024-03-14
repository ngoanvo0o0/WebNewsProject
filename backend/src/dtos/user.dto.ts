export interface CreateUserDto {
  email: string;
  hashedPassword: string;
  name: string;
  roleId: string
}

export interface UserDto {
  id: string;
  email: string;
  name: string;
  bio?: string
  status?: 'active' | 'inactive'
  createdAt?: string
  hashedPassword?: string;
  roleId?: string
  permissions?: string[]
  phoneNumber?: string
  userNameUpdated?: string
  googleId?: string
  facebookId?: string
  updatedAt?: string
}
