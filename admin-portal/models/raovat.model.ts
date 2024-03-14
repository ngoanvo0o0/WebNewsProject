export interface RaoVatDto {
  id?: string
  title?: string
  content?: string
  imageUrl?: string
  extraImages?: string[]
  rawExtraImagePaths?: string[]
  categoryId?: string
  categoryName?: string
  publishDate?: string | Date
  createdAt?: string
  createdBy?: string
  updatedAt?: string
  updatedBy?: string
  userNameUpdated?: string
  phoneNumber?: string
  facebook?: string
  metaKeyword?: string
  contactName?: string
  websiteUrl?: string
  email?: string
  address?: string
  description?: string
  customId?: number
}

export interface GetRaoVatResponse {
  data: RaoVatDto[]
}

export interface RaoVatResponse {
  data: RaoVatDto
}

export interface RaoVatRequest {
  id?: string
  title?: string
  content?: string
  imageUrl?: string
  categoryId?: string
  publishDate?: Date
  phoneNumber?: string
  facebook?: string
  metaKeyword?: string
  contactName?: string
  websiteUrl?: string
  email?: string
  address?: string
  description?: string
  status?: 'publish' | 'draft'
}

