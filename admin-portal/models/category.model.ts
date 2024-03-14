export enum CategoryStatusEnum {
  Active='active',
  Inactive='inactive',
}

export enum CategoryTypeEnum {
  News='news',
  RaoVat='raovat',
  Menu='menu'
}

export enum CategoryTypeShowEnum {
    News1='news1',
    News2='news2',
    News3='news3'
}


export interface CategoryDto {
  id: string
  name: string
  parentCategoryName?: string
  parentCategoryId?: string
  status?: CategoryStatusEnum
  type: CategoryTypeEnum
  styleShow?: CategoryTypeShowEnum
  createdAt?: string
  categoryParentId?: string
}

export interface GetCategoriesResponse {
  data: CategoryDto[]
}

export interface GetCategoryByIdResponse {
  data: CategoryDto
}

export interface UpsertCategoryRequest {
  id?: string
  name: string
  categoryParentId?: string
  status: CategoryStatusEnum
  type: CategoryTypeEnum
  styleShow?: CategoryTypeShowEnum | string
}

export interface UpsertCategoryResponse {
  id: string
  name?: string
  parentId?: string
  parentName?: string
}
