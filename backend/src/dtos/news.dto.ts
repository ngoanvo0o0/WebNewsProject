import { CategoryDto } from "./category.dto";

export interface NewsDto {
  id?: string;
  title?: string;
  description?: string;
  content?: string;
  publishDate?: Date | string;
  userId?: string;
  categoryId?: string;
  categoryName?: string;
  categoryStyle?: string;
  parentCategoryId?: string;
  parentCategoryName?: string;
  imageUrl?: string;
  status?: "draft" | "publish";
  slug?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tagIds?: string[];
  isHotNews?: boolean;
  author?: string
  userNameUpdated?: string
  metaKeyword?: string
  view?: string
  index?: number
  createdDate?: Date,
  isPublish?: boolean
  customId?: number
}

export type PagedNewsItemDto = Omit<
  NewsDto,
  "content" | "updateAt" | "updatedBy" | "createdAt" | "createdBy"
>;


export interface NewsGroupedByCategoryDto extends CategoryDto {
  newses: NewsDto[]
}