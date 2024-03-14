import {PaginationQuery} from "../../dtos/pagination.dto";

export interface GetRaoVatRequest extends PaginationQuery {
    categorySlug?: string
}

export interface GetCommentsRequest extends PaginationQuery {
    raoVatId?: string
    newsId?: string
}

export interface CreateCommentRequest {
    newsId?: string
    raoVatId?: string
    content: string
    anonymousEmail?: string
    anonymousName?: string
}