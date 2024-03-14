import { HistoryDto } from "./history.model"
import { NewsDto } from "./news.model"

export interface DashBoardResponse {
  data?: DashboardDto
}

export interface DashboardDto {
  totalCount?: TotalCountDto
  histories?: HistoryDto[]
  top10OfNews?: NewsDto[]
}

export interface TotalCountDto {
  totalNews: number
  totalUsers: number
  totalNewsActive: number
  totalNewsInactive: number
}
