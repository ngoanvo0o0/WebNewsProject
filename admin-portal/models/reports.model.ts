export interface TotalNewsOfMonthResponse {
  data: ToTalNewsOfMonthDto[]
}

export interface ToTalNewsOfMonthDto {
  totalNews: number
  month: string
}

export interface GetNewsOfMemberResponse {
  data: NewsOfMemberDto[]
}

export interface NewsOfMemberDto {
  month: string
  userId?: string
  name?: string
  totalNews: number
  totalViews: number
}

export interface GetNewsDetailsOfMembersResponse {
  data: NewsDetailsOfMembersDto[]
}

export interface NewsDetailsOfMembersDto {
  title: string
  slug: string
  view: number
}
