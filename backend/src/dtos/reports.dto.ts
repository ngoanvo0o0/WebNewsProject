export interface ToTalNewsOfMonthDto {
  totalNews: number
  month: string
}

export interface NewsOfMemberDto {
  month: string
  userId?: string
  name?: string
  totalNews: number
  totalViews: number
}

export interface NewsDetailsOfMembersDto {
  title: string
  slug: string
  view: number
}
