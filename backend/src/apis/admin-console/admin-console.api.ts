import {
  GetUsersByIdResponse,
  GetUsersResponse,
  UpsertUserRequest,
  UpsertUserResponse,
  UpsertCategoryRequest,
  UpsertCategoryResponse,
  GetCategoryByIdResponse,
  GetCategoriesResponse,
  SelectOptionResponse,
  NewsResponse,
  NewsRequest,
  GetRaoVatResponse,
  RaoVatResponse,
  RaoVatRequest,
  GetMenuResponse,
  MenuRequest,
  MenuResponse,
  ConfigRequest,
  ConfigResponse,
  WebsiteRequest,
  WebsiteResponse,
  DashBoardResponse,
  TotalNewsOfMonthResponse,
  GetNewsOfMemberResponse,
  GetNewsDetailsOfMembersResponse
} from ".";
import { AdminConsoleRoleService } from "../../services/admin-console/role.service";
import { AdminConsoleUSerService } from "../../services/admin-console/user.service";
import { AdminConsoleCategoryService } from "../../services/admin-console/categories.service";
import { AdminConsoleNewsService } from "../../services/admin-console/news.service";

import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post, Put,
  Queries,
  Request,
  Route,
  Security,
  Tags,
} from "tsoa";
import { AdminConsoleRaoVatService } from "../../services/admin-console/raovat.service";
import { AdminConsoleTagsService } from "../../services/admin-console/tag.service";
import { PagedList, PaginationQuery } from "../../dtos/pagination.dto";
import { NewsDto, PagedNewsItemDto } from "../../dtos/news.dto";
import { AdminConsoleMenuService } from "../../services/admin-console/menu.service";
import { Request as ExRequest } from "express";
import { AuthenticationInfo } from "../../dtos/authentication.dto";
import { CategoryQuery } from "../../dtos/category.dto";
import { AdminConsoleTeamService } from "../../services/admin-console/team.service";
import { AdminConsoleConfigService } from "../../services/admin-console/config.service";
import { AdminConsoleWebsiteService } from "../../services/admin-console/website.service";
import {
  listHistories,
  logVisit,
} from "../../services/admin-console/histories.service";
import { HistoryDto, HistoryEntityType } from "../../dtos/history.dto";
import { AdminConsoleDashboardService } from "../../services/admin-console/dashboard.service";
import { AdminConsoleReport } from "../../services/admin-console/reports.service";
import { FileService } from "../../services/file.service"
import { FileDto } from "../../dtos/common";

@Route("admin-console")
@Tags("AdminConsole")
export class AdminConsoleController extends Controller {
  @Security("")
  @Get("users")
  public async getUsers(): Promise<GetUsersResponse> {
    return new AdminConsoleUSerService().getUsers();
  }

  @Security("")
  @Get("users/{userId}")
  public async getUsersById(
    @Path() userId: string,
    @Request() request: ExRequest
  ): Promise<GetUsersByIdResponse> {
    const result = await new AdminConsoleUSerService().getUsersById(userId);
    const currentUser = (request.authInfo as AuthenticationInfo)?.userId;
    if (currentUser) {
      const data = result.data;
      logVisit(currentUser, data.id, data.name!, HistoryEntityType.User);
    }
    return result;
  }

  @Security("")
  @Post("users")
  public async upsertUser(
    @Body() userRequest: UpsertUserRequest,
    @Request() request: ExRequest
  ): Promise<UpsertUserResponse> {
    const currentUser = (request.authInfo as AuthenticationInfo).userId;
    return new AdminConsoleUSerService().upsertUser(userRequest, currentUser);
  }

  @Security("")
  @Delete("users/{userId}")
  public async deleteUser(@Path() userId: string, @Request() request: ExRequest): Promise<void> {
    const currentUser = (request.authInfo as AuthenticationInfo).userId;
    return new AdminConsoleUSerService().deleteUser(userId, currentUser);
  }

  @Security("")
  @Get("team")
  public async getTeam(): Promise<GetUsersResponse> {
    return new AdminConsoleTeamService().getTeam();
  }

  @Security("")
  @Get("team/{userId}")
  public async getTeamById(
    @Path() userId: string,
    @Request() request: ExRequest,
  ): Promise<GetUsersByIdResponse> {
    const result = await new AdminConsoleTeamService().getTeamById(userId);
    const currentUser = (request.authInfo as AuthenticationInfo)?.userId;
    if (currentUser) {
      const data = result.data;
      logVisit(currentUser, data.id, data.name!, HistoryEntityType.Team);
    }
    return result;
  }

  @Security("")
  @Post("team")
  public async upsertTeam(
    @Body() userRequest: UpsertUserRequest,
    @Request() request: ExRequest
  ): Promise<UpsertUserResponse> {
    const currentUser = (request.authInfo as AuthenticationInfo).userId;
    return new AdminConsoleTeamService().upsertTeam(userRequest, currentUser);
  }

  @Security("")
  @Delete("team/{userId}")
  public async deleteTeam(@Path() userId: string): Promise<void> {
    return new AdminConsoleTeamService().deleteTeam(userId);
  }

  @Security("")
  @Get("select/roles")
  public async getSelectRoles(): Promise<SelectOptionResponse> {
    return new AdminConsoleRoleService().getSelectRoles();
  }

  @Get("select/categories/{type}")
  public async getSelectCategories(
    @Path() type?: string
  ): Promise<SelectOptionResponse> {
    return new AdminConsoleCategoryService().getSelectCategories(type);
  }

  @Get("categories/parents")
  public async getCategoriesParenst(): Promise<GetCategoriesResponse> {
    return new AdminConsoleCategoryService().getCategories();
  }

  @Get("categories")
  public async getCategories(
    @Queries() queries?: CategoryQuery
  ): Promise<GetCategoriesResponse> {
    return new AdminConsoleCategoryService().getCategories(queries);
  }

  @Get("categories/{categoryId}")
  public async getCategoriesById(
    @Path() categoryId: string
  ): Promise<GetCategoryByIdResponse> {
    return new AdminConsoleCategoryService().getCategorysById(categoryId);
  }

  @Security("")
  @Post("categories")
  public async upsertCategory(
    @Body() userRequest: UpsertCategoryRequest,
    @Request() request: ExRequest
  ): Promise<UpsertCategoryResponse> {
    const currentUser = (request.authInfo as AuthenticationInfo).userId;
    return new AdminConsoleCategoryService().upsertCategory(
      userRequest,
      currentUser
    );
  }

  @Security("")
  @Delete("categories/{categoryId}")
  public async deleteCategory(@Path() categoryId: string): Promise<void> {
    return new AdminConsoleCategoryService().deleteCategory(categoryId);
  }

  @Get("news")
  public async getNews(
    @Queries() pagination: PaginationQuery
  ): Promise<PagedList<PagedNewsItemDto>> {
    return new AdminConsoleNewsService().getNews(pagination);
  }

  @Get("news/{slug}")
  public async getNewsBySlug(@Path() slug: string): Promise<NewsDto> {
    return new AdminConsoleNewsService().getNewsBySlug(slug);
  }

  @Security("")
  @Post("news")
  public async upsertNews(
    @Body() newsRequest: NewsRequest,
    @Request() request: ExRequest
  ): Promise<NewsResponse> {
    const currentUser = (request.authInfo as AuthenticationInfo).userId;
    return new AdminConsoleNewsService().upsertNews(newsRequest, currentUser);
  }

  @Security("")
  @Delete("news/{newsId}")
  public async deleteNews(
    @Path() newsId: string,
    @Request() request: ExRequest
  ): Promise<void> {
    const currentUser = (request.authInfo as AuthenticationInfo).userId;
    return new AdminConsoleNewsService().deleteNews(newsId, currentUser);
  }

  @Security("")
  @Put("news/{newsId}/change-status")
  public async changeStatusNews(
    @Path() newsId: string,
    @Request() request: ExRequest
  ): Promise<void> {
    const currentUser = (request.authInfo as AuthenticationInfo).userId;
    return new AdminConsoleNewsService().changeStatusNews(newsId, currentUser);
  }

  @Get("rao-vat")
  public async getRaoVats(): Promise<GetRaoVatResponse> {
    return new AdminConsoleRaoVatService().getRaoVats();
  }

  @Get("rao-vat/{raoVatId}")
  public async getRaoVatsById(
    @Path() raoVatId: string,
    @Request() request: ExRequest
  ): Promise<RaoVatResponse> {
    const result = await new AdminConsoleRaoVatService().getRaoVatsById(
      raoVatId
    );
    const currentUser = (request.authInfo as AuthenticationInfo)?.userId;
    if (currentUser) {
      const data = result.data;
      logVisit(currentUser, data.id, data.title!, HistoryEntityType.RaoVat);
    }
    return result;
  }

  @Security("")
  @Post("rao-vat")
  public async upsertRaoVat(
    @Body() raoVatRequest: RaoVatRequest,
    @Request() request: ExRequest
  ): Promise<RaoVatResponse> {
    const currentUser = (request.authInfo as AuthenticationInfo).userId;
    return new AdminConsoleRaoVatService().upsertRaoVat(
      raoVatRequest,
      currentUser
    );
  }

  @Security("")
  @Delete("rao-vat/{raoVatId}")
  public async deleteRaoVat(
    @Path() raoVatId: string,
    @Request() request: ExRequest
  ): Promise<void> {
    const currentUser = (request.authInfo as AuthenticationInfo)?.userId;
    return new AdminConsoleRaoVatService().deleteRaoVat(raoVatId, currentUser);
  }

  @Get("select/tags")
  public async getSelectTags(): Promise<SelectOptionResponse> {
    return new AdminConsoleTagsService().getSelectTags();
  }

  @Get("menus")
  public async getMenus(): Promise<GetMenuResponse> {
    return new AdminConsoleMenuService().getMenus();
  }

  @Get("menus/{menuId}")
  public async getMenusById(@Path() menuId: string): Promise<MenuResponse> {
    return new AdminConsoleMenuService().getMenusById(menuId);
  }

  @Security("")
  @Post("menus")
  public async upsertMenu(
    @Body() menuRequest: MenuRequest,
    @Request() request: ExRequest
  ): Promise<MenuResponse> {
    const currentUser = (request.authInfo as AuthenticationInfo).userId;
    return new AdminConsoleMenuService().upsertMenu(menuRequest, currentUser);
  }

  @Security("")
  @Delete("menus/{menuId}")
  public async deleteMenu(@Path() menuId: string): Promise<void> {
    return new AdminConsoleMenuService().deleteMenu(menuId);
  }

  @Get("configs/{key}")
  public async getConfigByKey(@Path() key: string): Promise<ConfigResponse> {
    return new AdminConsoleConfigService().getConfigByKey(key);
  }

  @Security("")
  @Post("configs")
  public async upsertConfig(
    @Body() configRequest: ConfigRequest,
    @Request() request: ExRequest
  ): Promise<ConfigResponse> {
    const currentUser = (request.authInfo as AuthenticationInfo).userId;
    return new AdminConsoleConfigService().upsertConfig(
      configRequest,
      currentUser
    );
  }

  @Get("website")
  public async getWebsite(): Promise<WebsiteResponse> {
    return new AdminConsoleWebsiteService().getWebsite();
  }

  @Security("")
  @Post("website")
  public async upsertWebsite(
    @Body() websiteRequest: WebsiteRequest,
    @Request() request: ExRequest
  ): Promise<WebsiteResponse> {
    const currentUser = (request.authInfo as AuthenticationInfo).userId;
    return new AdminConsoleWebsiteService().upsertWebsite(
      websiteRequest,
      currentUser
    );
  }

  @Security("")
  @Get("histories")
  public async getHistories(): Promise<HistoryDto[]> {
    return await listHistories();
  }

  @Get('dashboard')
  public async getDashboard(): Promise<DashBoardResponse> {
    return await new AdminConsoleDashboardService().getDashBoard()
  }

  @Get('reports/total-news-of-month')
  public async getTotalNewsOfMonth(): Promise<TotalNewsOfMonthResponse> {
    return await new AdminConsoleReport().getTotalNewsOfMonth()
  }

  @Get('reports/news-of-members')
  public async getNewsOfMembers(): Promise<GetNewsOfMemberResponse> {
    return await new AdminConsoleReport().getNewsOfMembers()
  }

  @Get('reports/news-details-by/{userId}/months/{month}')
  public async getNewsDetailsOfMembers(
    @Path() userId: string,
    @Path() month: string
  ): Promise<GetNewsDetailsOfMembersResponse> {
    return await new AdminConsoleReport().getNewsDetailsOfMembers(userId, month)
  }

  @Get('image-urls')
  public async getAllImageUrl (): Promise<{categoriesImages: FileDto[], adImages: FileDto[], raoVatImages: FileDto[]}> {
    const assetDir = (global as any).assetDir
    return new FileService().getAllImageUrls(assetDir)
  }
  
  @Security("")
  @Delete('remove-images')
  public async removeImages (@Queries() queries: {images: string[]}): Promise<void> {
    await new FileService().removeImages(queries.images)
  }
}
