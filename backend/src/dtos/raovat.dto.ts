export interface RaoVatDto {
  id: string
  title?: string
  content?: string
  imageUrl?: string
  extraImages?: string[],
  rawExtraImagePaths?: string[]
  categoryId?: string
  categoryName?: string
  publishDate?: string | Date
  createdAt?: string
  createdBy?: string
  updatedAt?: string
  updatedBy?: string
  userNameUpdated?: string
  slug?: string
  facebook?: string
  phoneNumber?: string
  contactName?: string
  metaKeyword?: string
  websiteUrl?: string
  email?: string
  address?: string
  description?: string
  index?: number
  view?: string
  status?: string
  customId?: number
}

export type PagedRaoVatItemDto = Omit<
    RaoVatDto,
    "content" | "updateAt" | "updatedBy" | "createdAt" | "createdBy"
>;