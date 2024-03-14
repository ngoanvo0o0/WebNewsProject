import { GetUsersByIdResponse, GetUsersResponse, UpsertUserRequest, UpsertUserResponse } from "~/models/user.model";
import { HttpClient } from "./http-client";
import {
  GetCategoriesResponse,
  GetCategoryByIdResponse,
  UpsertCategoryRequest,
  UpsertCategoryResponse
} from "~/models/category.model";
import { SelectOptionResponse } from "~/models/role.model";
import { GetNewsResponse, NewsRequest, NewsResponse } from "~/models/news.model";
import { GetRaoVatResponse, RaoVatRequest } from "~/models/raovat.model";
import { GetMenuResponse, MenuRequest, MenuResponse } from "~/models/menu.model";
import { ConfigRequest, ConfigResponse } from "~/models/config.model";
import { WebsiteRequest, WebsiteResponse } from "~/models/website.model";
import { HistoryDto } from "~/models/history.model";
import { DashBoardResponse } from "~/models/dashboard.model";
import { GetNewsDetailsOfMembersResponse, GetNewsOfMemberResponse, TotalNewsOfMonthResponse } from "~/models/reports.model";
import {NewsStatus} from "~/utils/constant";

export class AdminConsoleApi extends HttpClient {
  async getUsers(search: string): Promise<GetUsersResponse> {
    return await this.call("GET", "api/admin-console/users")
  }

  async getUsersById(userId: string): Promise<GetUsersByIdResponse> {
    return await this.call("GET", `api/admin-console/users/${userId}`)
  }

  async upsertUser(userRequest: UpsertUserRequest): Promise<UpsertUserResponse> {
    return await this.call("POST", "api/admin-console/users", userRequest)
  }

  async deleteUser(userId: string): Promise<GetUsersByIdResponse> {
    return await this.call("DELETE", `api/admin-console/users/${userId}`)
  }

  async getTeam(search: string): Promise<GetUsersResponse> {
    return await this.call("GET", "api/admin-console/team")
  }

  async getTeamById(userId: string): Promise<GetUsersByIdResponse> {
    return await this.call("GET", `api/admin-console/team/${userId}`)
  }

  async upsertTeam(userRequest: UpsertUserRequest): Promise<UpsertUserResponse> {
    return await this.call("POST", "api/admin-console/team", userRequest)
  }

  async deleteTeam(userId: string): Promise<GetUsersByIdResponse> {
    return await this.call("DELETE", `api/admin-console/team/${userId}`)
  }

  async getCategoriesParents(): Promise<GetCategoriesResponse> {
    return await this.call("GET", "api/admin-console/categories/parents")
  }

  async getCategories(): Promise<GetCategoriesResponse> {
    return await this.call("GET", "api/admin-console/categories")
  }

  async getCategoryById(categoryId: string): Promise<GetCategoryByIdResponse> {
    return await this.call("GET", `api/admin-console/categories/${categoryId}`)
  }

  async upsertCategory(categoryRequest: UpsertCategoryRequest): Promise<UpsertCategoryResponse> {
    return await this.call("POST", "api/admin-console/categories", categoryRequest)
  }

  async deleteCategory(categoryId: string): Promise<GetCategoryByIdResponse> {
    return await this.call("DELETE", `api/admin-console/categories/${categoryId}`)
  }
  
  async getSelectRoles(): Promise<SelectOptionResponse> {
    return await this.call("GET", "api/admin-console/select/roles")
  }

  async getSelectCategories(type?: string): Promise<SelectOptionResponse> {
    return await this.call("GET", `api/admin-console/select/categories/${type}`)
  }

  async getNews(status: NewsStatus): Promise<GetNewsResponse> {
    return await this.call("GET", "api/admin-console/news", undefined, {
      status,
      size: 9999999999999
    })
  }

  async getNewsById(newsId: string): Promise<NewsResponse> {
    return await this.call("GET", `api/admin-console/news/${newsId}`)
  }

  async upsertNews(newsRequest: NewsRequest): Promise<NewsResponse> {
    return await this.call("POST", "api/admin-console/news", newsRequest)
  }

  async deleteNews(newsId: string): Promise<void> {
    return await this.call("DELETE", `api/admin-console/news/${newsId}`)
  }

  async changeStatusNews(newsId: string): Promise<void> {
    return await this.call("PUT", `api/admin-console/news/${newsId}/change-status`)
  }

  async getRaoVats(): Promise<GetRaoVatResponse> {
    return await this.call("GET", "api/admin-console/rao-vat")
  }

  async getRaoVatsById(raoVatId: string): Promise<NewsResponse> {
    return await this.call("GET", `api/admin-console/rao-vat/${raoVatId}`)
  }

  async upsertRaoVat(raoVatRequest: RaoVatRequest): Promise<NewsResponse> {
    return await this.call("POST", "api/admin-console/rao-vat", raoVatRequest)
  }

  async deleteRaoVat(raoVatId: string): Promise<void> {
    return await this.call("DELETE", `api/admin-console/rao-vat/${raoVatId}`)
  }

  async getSelectTags(): Promise<SelectOptionResponse> {
    return await this.call("GET", `api/admin-console/select/tags`)
  }

  async getMenus(): Promise<GetMenuResponse> {
    return await this.call("GET", "api/admin-console/menus")
  }

  async getMenusById(menuId: string): Promise<MenuResponse> {
    return await this.call("GET", `api/admin-console/menus/${menuId}`)
  }

  async upsertMenu(menuRequest: MenuRequest): Promise<MenuResponse> {
    return await this.call("POST", "api/admin-console/menus", menuRequest)
  }

  async deleteMenu(menuId: string): Promise<void> {
    return await this.call("DELETE", `api/admin-console/menus/${menuId}`)
  }

  async getConfigByKey(key: string): Promise<ConfigResponse> {
    return await this.call("GET", `api/admin-console/configs/${key}`) 
  }

  async upsertConfig(configRequest: ConfigRequest): Promise<ConfigResponse> {
    return await this.call("POST", "api/admin-console/configs", configRequest)
  }

  async getWebsite(): Promise<WebsiteResponse> {
    return await this.call("GET", 'api/admin-console/website/')
  }

  async upsertWebsite(websiteRequest: WebsiteRequest): Promise<WebsiteResponse> {
    return await this.call("POST", "api/admin-console/website", websiteRequest)
  }

  async getHistories(): Promise<HistoryDto> {
    return await this.call("GET", "api/admin-console/histories")
  }

  async getDashboard(): Promise<DashBoardResponse> {
    return await this.call("GET", "api/admin-console/dashboard")
  }

  async getTotalNewsOfMonth(): Promise<TotalNewsOfMonthResponse> {
    return await this.call("GET", "api/admin-console/reports/total-news-of-month")
  }
  
  async getImages(): Promise<{categoriesImages: string[], adImages: string[], raoVatImages: string[]}> {
    return await this.call("GET", "api/admin-console/image-urls")
  }
  
  async removeImage(images: string[]): Promise<void> {
    return await this.call("DELETE", "api/admin-console/remove-images",{} ,{images})
  }
  
  async getNewsOfMembers(): Promise<GetNewsOfMemberResponse> {
    return await this.call("GET", "api/admin-console/reports/news-of-members")
  }

  async getNewsDetailsOfMembers(userId: string, month: string): Promise<GetNewsDetailsOfMembersResponse> {
    return await this.call("GET", `api/admin-console/reports/news-details-by/${userId}/months/${month}`)
  }
}
