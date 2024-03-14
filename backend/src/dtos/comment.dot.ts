export interface CommentDto {
    name: string
    content: string
    email: string
    userId: string
    avatar: string
    createdAt: string | Date
}

export type PagedCommentItemDto = Omit<
    CommentDto,
    "content" | "updateAt" | "updatedBy" | "createdAt" | "createdBy"
>;