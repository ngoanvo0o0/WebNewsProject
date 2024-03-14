import { Op } from "sequelize"
import { DashBoardResponse } from "../../apis/admin-console"
import { TotalCountDto } from "../../dtos/dashboard.dto"
import { News, Users } from "../../models/init-models"
import { listHistories } from "./histories.service"
import { Sequelize } from "sequelize-typescript"
import { PagedNewsItemDto } from "../../dtos/news.dto"

export class AdminConsoleDashboardService {
  public async getDashBoard(): Promise<DashBoardResponse> {
    const [
      totalNews,
      totalUsers,
      totalNewsActive,
      totalNewsInactive,
      getHistories,
      getMembers,
      getTop10OfNews
    ] = await Promise.all([
      News.count({
        where: {
          isDeleted: false
        }
      }),
      Users.count({
        where: {
          isDeleted: false
        }
      }),
      News.count({
        where: {
          isDeleted: false,
          status: 'publish'
        }
      }),
      News.count({
        where: {
          isDeleted: false,
          status: 'draft'
        }
      }),
      listHistories(),
      Users.findAll({
        attributes: [
          'id', 'name'
        ],
        where: {
          isDeleted: false,
          roleId: {
            [Op.ne]: null
          }
        }
      }),
      News.findAll({
        raw: true,
        attributes:[
          'id',
          'title',
          'status',
          'slug',
          ['is_hot_news', 'isHotNews'],
          ['created_at', 'createdAt'],
          ['created_by', 'createdBy'],
          'view'
        ],
        where: {
          isDeleted: false,
          status: 'publish',
          [Op.and]: [{
            view: {
              [Op.ne]: null
            }
          },
          Sequelize.where(
            Sequelize.cast(Sequelize.col('view'), 'BIGINT'), {
              [Op.gte]: 5000
            }
          )
          ]
        },
        order: [
          [Sequelize.cast(Sequelize.col('view'), 'BIGINT'), 'DESC']
        ],
        limit: 10
      })
    ])

    const totalCount: TotalCountDto = {
      totalNews,
      totalUsers,
      totalNewsActive,
      totalNewsInactive
    }

    const histories = getHistories.slice(0 , 15)
    const top10OfNews = getTop10OfNews.map((news) => {
      const createdBy = getMembers.find((member) => member.id === news.createdBy)?.name || ''
      return {
        id: news.id,
        title: news.title,
        slug: news.slug,
        isHotNews: news.isHotNews,
        view: news.view,
        createdDate: news.createdAt,
        isPublish: news.status === 'publish',
        createdBy
      } as PagedNewsItemDto
    })

    const result = {
      totalCount,
      histories,
      top10OfNews
    }

    return {
      data: result
    }
  }
}
