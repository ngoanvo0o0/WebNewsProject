export enum NewsStatusEnum {
  Draft='draft',
  Publish='publish',
}

export interface NewsDto {
  id?: string
  title?: string
  description?: string
  content?: string
  publishDate?: Date | string
  userId?: string
  categoryId?: string
  categoryName?: string
  imageUrl?: string
  status?: NewsStatusEnum
  slug?: string
  createdBy?: string
  updatedBy?: string
  createdAt?: Date
  updatedAt?: Date
  tagIds?: string[]
  isHotNews?: boolean
  userNameUpdated?: string
  metaKeyword?: string
  view?: string
  isPublish?: boolean
  customId?: number
}

export interface GetNewsResponse {
  data: NewsDto[]
}

export interface NewsResponse {
  data: NewsDto
}

export interface NewsRequest {
  id?: string
  title?: string
  description?: string
  content?: string
  publishDate?: Date
  userId?: string
  categoryId?: string
  imageUrl?: string
  status?: "draft" | "publish"
  tagIds?: string[]
  isHotNews?: boolean
  metaKeyword?: string
  view?: string
}
