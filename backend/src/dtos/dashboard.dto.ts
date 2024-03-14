import { HistoryDto } from "./history.dto"
import { PagedNewsItemDto } from "./news.dto"

export interface DashboardDto {
  totalCount: TotalCountDto,
  histories: HistoryDto[],
  top10OfNews: PagedNewsItemDto[]
}

export interface TotalCountDto {
  totalNews: number
  totalUsers: number
  totalNewsActive: number
  totalNewsInactive: number
}
