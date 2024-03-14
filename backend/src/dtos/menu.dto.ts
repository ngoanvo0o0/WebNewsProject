import { CategoryDto } from "./category.dto";

export interface MenuDto {
  id?: string
  order?: number
  name?: string
  slug?: string;
  categoryId?: string
  categoryName?: string
  createdAt?: string
  createdBy?: string
  updatedAt?: string
  updatedBy?: string
  userNameUpdated?: string
  childCategories?: CategoryDto[]
}
