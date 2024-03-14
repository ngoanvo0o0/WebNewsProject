import { UserDto } from "../../dtos/user.dto"
import { CategoryDto, CategoryStatusEnum, CategoryTypeEnum, CategoryTypeShowEnum } from "../../dtos/category.dto"
import { NewsDto } from "../../dtos/news.dto"
import { SelectOption } from "../../dtos/common"
import { RaoVatDto } from "../../dtos/raovat.dto"
import { MenuDto } from "../../dtos/menu.dto"
import {PaginationQuery} from "../../dtos/pagination.dto";
import { ConfigDto } from "../../dtos/config.dto"
import { WebsiteDto } from "../../dtos/website.dto"
import { DashboardDto } from "../../dtos/dashboard.dto"
import { NewsDetailsOfMembersDto, NewsOfMemberDto, ToTalNewsOfMonthDto } from "../../dtos/reports.dto"

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
  // phoneNumber?: string,
  password?: string,
}

export interface UpsertUserResponse {
  id: string
  name?: string
  email?: string
  phoneNumber?: string
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
  name: string
  categoryParentId?: string
  categoryParentName?: string
}

export interface SelectOptionResponse {
  data: SelectOption[]
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


export interface GetNewsesRequest extends PaginationQuery {
  style?: 'news1' | 'news2' | 'news3',
  isHotNews?: boolean;
  menuSlug?: string;
  search?: string
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
  extraImages?: string[]
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
export interface GetTagsResponse {
  data: {name: string, count: number}[]
}

export interface ConfigResponse {
  data: ConfigDto
}

export interface ConfigRequest {
  id?: string
  key?: string
  value?: string
  type?: string
}

export interface WebsiteResponse {
  data: WebsiteDto
}

export interface WebsiteRequest {
  id?: string
  logo?: string
  footerContent?: string
  facebookUrl?: string
  twitterUrl?: string
  googleUrl?: string
  linkedinUrl?: string
}

export interface DashBoardResponse {
  data: DashboardDto
}

export interface TotalNewsOfMonthResponse {
  data: ToTalNewsOfMonthDto[]
}

export interface GetNewsOfMemberResponse {
  data: NewsOfMemberDto[]
}

export interface GetNewsDetailsOfMembersResponse {
  data: NewsDetailsOfMembersDto[]
}
