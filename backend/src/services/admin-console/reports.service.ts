import { QueryTypes } from "sequelize"
import { NewsDetailsOfMembersDto, NewsOfMemberDto, ToTalNewsOfMonthDto } from "../../dtos/reports.dto"
import { ConfigSequelize } from "../../sequelize"
import { GetNewsDetailsOfMembersResponse, GetNewsOfMemberResponse, TotalNewsOfMonthResponse } from "../../apis/admin-console"

export class AdminConsoleReport {
  public async getTotalNewsOfMonth(): Promise<TotalNewsOfMonthResponse> {
    const query = `SELECT count(*) total_news,
        to_char(n.created_at, 'YYYY-MM') "month"
    FROM news n
    GROUP BY to_char(n.created_at, 'YYYY-MM')
    ORDER BY to_char(n.created_at, 'YYYY-MM') DESC`

    const resultOfQuery: any = await ConfigSequelize.getInstance()?.sequelize?.query(query,
      { type: QueryTypes.SELECT })

    const result = resultOfQuery.map((item: any) => {
      return {
        totalNews: Number(item.total_news),
        month: item.month
      } as ToTalNewsOfMonthDto
    })

    return { data: result }
  }

  public async getNewsOfMembers(): Promise<GetNewsOfMemberResponse> {
    const query = `SELECT to_char(n.created_at, 'YYYY-MM') "month",
        u."name",
        u.id user_id,
        count(n.id) total_news,
        sum(n."view"::integer) total_views
    FROM news n
    LEFT JOIN users u ON u.id = n.created_by
    WHERE n.is_deleted = FALSE
    GROUP BY "month",
          u.id
    ORDER BY "month" DESC`

    const resultOfQuery: any = await ConfigSequelize.getInstance()?.sequelize?.query(query,
      { type: QueryTypes.SELECT })

    const result = resultOfQuery.map((item: any) => {
      return {
        month: item.month,
        userId: item.user_id,
        name: item.name,
        totalNews: Number(item.total_news || 0),
        totalViews: Number(item.total_views || 0)
      } as NewsOfMemberDto
    })

    return { data: result }
  }

  public async getNewsDetailsOfMembers(userId: string, month: string): Promise<GetNewsDetailsOfMembersResponse> {
    const query = `SELECT n.title,
        n."view",
        n.slug
    FROM news n
    WHERE n.is_deleted = FALSE
    AND n.created_by = :userId
    AND to_char(n.created_at, 'YYYY-MM') = :month`

    const resultOfQuery: any = await ConfigSequelize.getInstance()?.sequelize?.query(query,
      { type: QueryTypes.SELECT, replacements: {
        userId,
        month
      } })

      const result = resultOfQuery.map((item: any) => {
        return {
          title: item.title,
          slug: item.slug,
          view: Number(item.view || 0)
        } as NewsDetailsOfMembersDto
      })

      return { data: result }
  }
}
