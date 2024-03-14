export interface MenuDto {
  id?: string
  order?: number
  name?: string
  categoryId?: string
  categoryName?: string
  createdAt?: string
  createdBy?: string
  updatedAt?: string
  updatedBy?: string
  userNameUpdated?: string
}

export interface GetMenuResponse {
  data: MenuDto[]
}

export interface MenuResponse {
  data: MenuDto
}

export interface MenuRequest {
  id?: string
  order?: number
  name?: string
  categoryId?: string
}
