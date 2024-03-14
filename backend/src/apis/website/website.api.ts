import { AdminConsoleNewsService } from "../../services/admin-console/news.service"

import {Controller, Get, Path, Queries, Query, Route, Tags, Post, Body, Request} from "tsoa"
import {PagedList} from "../../dtos/pagination.dto"
import {NewsGroupedByCategoryDto, PagedNewsItemDto} from "../..//dtos/news.dto"
import {GetNewsesRequest, GetTagsResponse} from "../admin-console"
import {AdminConsoleRaoVatService} from "../../services/admin-console/raovat.service";
import {AdminConsoleTagsService} from "../../services/admin-console/tag.service";
import {PagedRaoVatItemDto, RaoVatDto} from "../../dtos/raovat.dto";
import {CreateCommentRequest, GetCommentsRequest, GetRaoVatRequest} from "./index";
import {CategoryDto} from "../../dtos/category.dto";
import { AuthenticationInfo } from "../../dtos/authentication.dto"
import { Request as ExRequest } from "express"
import { WebsiteService } from "../../services/website.service"
import { PagedCommentItemDto } from "../../dtos/comment.dot"
import { AdvertisementDto } from "../../dtos/advertisement.dto"
import { WebsiteDto } from "../../dtos/website.dto";

@Route('')

@Tags('website')
// @Security('')
export class WebsiteApi extends Controller {
    @Get("news")
    public async getNews(
        @Queries() newsesRequest: GetNewsesRequest
    ): Promise<PagedList<PagedNewsItemDto>> {
        return new AdminConsoleNewsService().getNewsForWebsite(newsesRequest)
    }

    @Get("rao-vat")
    public async getRaoVats(
        @Queries() raoVatRequest: GetRaoVatRequest
    ): Promise<PagedList<PagedRaoVatItemDto>> {
        return new AdminConsoleRaoVatService().getRaoVatsForWebsite(raoVatRequest)
    }

    @Get("rao-vat/{slug}")
    public async getRaoVatBySlug(
        @Path() slug: string
    ): Promise<RaoVatDto> {
        return new AdminConsoleRaoVatService().getRaoVatBySlug(slug)
    }

    @Get("categories")
    public async getCategoriesByType(
        @Query() type: 'raovat' | 'menu' | 'news'
    ): Promise<CategoryDto[]> {
        return new AdminConsoleRaoVatService().getCategoriesByType(type)
    }

    @Get("tags")
    public async getTags(): Promise<GetTagsResponse> {
        return new AdminConsoleTagsService().getTags()
    }

    @Post("comments")
    public async addComment(
      @Body() commentRequest: CreateCommentRequest,
      @Request() request: ExRequest
    ): Promise<void> {
      const currentUser = (request.authInfo as AuthenticationInfo)?.userId
      return new WebsiteService().createComment(commentRequest, currentUser)
    }

    @Get("comments")
    public async getComments(
        @Queries() getCommentRequest: GetCommentsRequest
    ): Promise<PagedList<PagedCommentItemDto>> {
      return new WebsiteService().getComments(getCommentRequest)
    }

    @Get("news/grouped-by-category")
    public async getNewsGroupedByCategory(): Promise<NewsGroupedByCategoryDto[]> {
      return new WebsiteService().getNewsGroupedByCategory()
    }

    @Get("sitemap")
    public async getSitemap(): Promise<string[]> {
      return new WebsiteService().getSitemap()
    }

    @Get("ads")
    public async getAds(): Promise<AdvertisementDto[]> {
      return new WebsiteService().getAds()
    }

    @Get("config")
    public async getLinks(): Promise<WebsiteDto> {
      return new WebsiteService().getWebsiteConfig()
    }
}
