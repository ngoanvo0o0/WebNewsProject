import { CustomError } from "../../errorHandler"
import {NewsResponse, NewsRequest, GetNewsesRequest} from "../../apis/admin-console"
import { NewsDto, PagedNewsItemDto } from "../../dtos/news.dto"
import {Categories, News, NewsTags, Tags, Users} from "../../models/init-models"
import { generateSlug, regexUuid } from "../../shared/function"
import { NewsTagsDto } from "../../dtos/news-tags.dto"
import {NewStatus, PagedList, PaginationQuery} from "../../dtos/pagination.dto"
import { TagDto } from "../../dtos/tag.dto"
import { Op } from "sequelize"
import { orderBy } from "lodash"
import { logCreation, logUpdate } from "./histories.service"
import { HistoryEntityType } from "../../dtos/history.dto"
import logger from "../../shared/Logger";

const host = process.env.HOST || ""
export class AdminConsoleNewsService {
  public async getNews(pagination: PaginationQuery): Promise<PagedList<PagedNewsItemDto>> {
    const {rows, count} = await News.findAndCountAll({
      attributes: [
        'id',
        'title',
        'view',
        ['publish_date', 'publishDate'],
        ['user_id', 'userId'],
        'imageurl',
        'status',
        'slug',
        ['is_hot_news', 'isHotNews'],
        ['created_at', 'createdAt'],
        ['updated_at', 'updatedAt'],
        'customId'
      ],
      where: {
        isDeleted: false,
        status: pagination.status
      },
      offset: (pagination.page - 1) * pagination.size,
      limit: pagination.size,
      include: [{
        model: Categories,
        attributes: [
          'id', 'name'
        ],
        as: 'category',
        where: {
          isDeleted: false
        }
      }]
    })

    const newsList = rows.map((newsItem, index) => {
      return {
        index: index + 1,
        id: newsItem.id,
        title: newsItem.title,
        view: newsItem.view,
        publishDate: newsItem.publishDate,
        userId: newsItem.userId,
        categoryId: newsItem.categoryId,
        categoryName: newsItem.category?.name,
        imageUrl: newsItem.imageurl && `${host}${newsItem.imageurl}`,
        status: newsItem.status,
        slug: newsItem.slug,
        isHotNews: newsItem.isHotNews,
        author: newsItem.user?.name,
        createdAt: newsItem.createdAt,
        createdDate: newsItem.createdAt,
        updatedAt: newsItem.updatedAt,
        customId: Number(newsItem.customId)
      } as PagedNewsItemDto
    })

    const orderByCreatedAt = orderBy(newsList, e => e.customId, 'desc')

    return new PagedList<PagedNewsItemDto>(orderByCreatedAt, count, pagination.page, pagination.size);
  }

  public async getNewsForWebsite(newsesRequest: GetNewsesRequest): Promise<PagedList<PagedNewsItemDto>> {
    const categoryCondition: Record<string, any> = {}
    const {menuSlug: slug} = newsesRequest!
    let newsCondition: Record<string, any> = {
      isDeleted: false,
      status: 'publish',
    }

    // eslint-disable-next-line eqeqeq
    if(newsesRequest.isHotNews != null) {
      newsCondition.isHotNews = newsesRequest.isHotNews
    }

    if (newsesRequest.menuSlug) {
      categoryCondition.condition = {
        [Op.or]: [
          {'$category.slug$': { [Op.eq]: slug }},
          {'$category.parent.slug$': { [Op.eq]: slug }}
        ]
      }
    }

    if (newsesRequest.search) {
      const search = `%${newsesRequest.search}%`
      newsCondition = {
        ...newsCondition,
        [Op.or]: [{
          title: {
            [Op.iLike]: search
          }
        }, {
          description: {
            [Op.iLike]: search
          }
        }, {
          content: {
            [Op.iLike]: search
          }
        }]
      }
    }

    const {rows, count} = await News.findAndCountAll({
      where: { ...newsCondition,
        ...categoryCondition.condition
      },
      offset: (newsesRequest.page - 1) * newsesRequest.size,
      limit: newsesRequest.size,
      include: [{
        model: Categories,
        as: 'category',
        where: {
          isDeleted: false,
          status: 'active',
        },
        include: [{
          required: false,
          model: Categories,
          as: 'parent',
          where: {
            isDeleted: false,
            status: 'active',
          }
        }]
      },
        {
          model: Users,
          as: 'user',
          // where: {
          //   isDeleted: false
          // }
        }
      ],
      order: [['createdAt', 'desc']]
    })

    const newsList = rows.map((newsItem) => {
      return {
        id: newsItem.id,
        title: newsItem.title,
        description: newsItem.description,
        content: newsItem.content,
        publishDate: newsItem.publishDate,
        userId: newsItem.userId,
        categoryId: newsItem.category?.parent?.id || newsItem.categoryId,
        categoryName: newsItem.category?.parent?.name || newsItem.category?.name,
        imageUrl: newsItem.imageurl && `${host}${newsItem.imageurl}`,
        status: newsItem.status,
        slug: newsItem.slug,
        isHotNews: newsItem.isHotNews,
        author: newsItem.user?.name,
        view: newsItem.view,
        metaKeyword: newsItem.metaKeyword
      } as PagedNewsItemDto
    })

    return new PagedList<PagedNewsItemDto>(newsList, count, newsesRequest.page, newsesRequest.size);
  }

  public async getNewsBySlug(slug: string): Promise<NewsDto> {
    const news = await News.findOne({
      where: {
        isDeleted: false,
        slug: slug
      },
      include: [{
        model: NewsTags,
        as: 'newsTags',
        where: {
          isDeleted: false
        },
        required: false
      },
      {
        model: Categories,
        as: 'category',
        where: {
          isDeleted: false
        },
        include: [{
          model: Categories,
          as: 'parent',
        }]
      }]
    })

    if (!news) {
      throw new CustomError('Not found this news', 400)
    }

    let userNameUpdated = ''
    if (news.updatedBy) {
      const findUserUpdated = await Users.findOne({
        where: {
          isDeleted: false,
          id: news.updatedBy
        }
      })

      userNameUpdated = findUserUpdated?.name ?? ''
    }

    news.view = !news.view ? '1' : String(Number(news.view) + 1)
    news.save() 
    const newsObject: NewsDto = {
      id: news.id,
      title: news.title,
      description: news.description,
      content: news.content,
      publishDate: news.publishDate,
      userId: news.userId,
      categoryId: news.categoryId,
      categoryName: news.category?.name,
      parentCategoryId: news.category?.parent?.id,
      parentCategoryName: news.category?.parent?.name,
      imageUrl: news.imageurl && `${host}${news.imageurl}`,
      status: news.status,
      slug: news.slug,
      createdAt: news.createdAt,
      tagIds: news.newsTags?.map((newsTag) => newsTag.tagId) as string[] || [],
      isHotNews: news.isHotNews,
      userNameUpdated,
      metaKeyword: news.metaKeyword,
      view: news.view,
      updatedAt: news.updatedAt
    }

    return newsObject
  }

  public async upsertNews(newsRequest: NewsRequest, currentUser: string): Promise<NewsResponse> {
    let slug = undefined
    let customId = undefined
    if (!newsRequest.id && newsRequest.title) {
      slug = generateSlug(newsRequest.title)
      const findMaxCustomId = await News.max('customId')
      logger.info('findMaxCustomId: ' + JSON.stringify(findMaxCustomId))
      customId = Number(findMaxCustomId || 0) + 1
    }

    const [news] = await News.upsert({
      categoryId: newsRequest.categoryId,
      content: newsRequest.content,
      description: newsRequest.description,
      id: newsRequest.id,
      imageurl: newsRequest.imageUrl,
      publishDate: newsRequest.publishDate,
      status: !newsRequest.id ? 'draft' : undefined,
      title: newsRequest.title,
      userId: !newsRequest.id ? currentUser : undefined,
      isHotNews: newsRequest.isHotNews,
      slug,
      updatedAt: new Date(),
      updatedBy: currentUser,
      metaKeyword: newsRequest.metaKeyword,
      view: newsRequest.view,
      customId
    })

    if (newsRequest.id) {
      await NewsTags.update({
        isDeleted: true,
        updatedAt: new Date()
      }, {
        where: {
          newsId: news.id
        }
      })
    }

    const tagsModel: TagDto[] = []
    const newsTagsModel: NewsTagsDto[] = []
    const customTags: string[] = []
    const tagIds: string[] = []

    newsRequest.tagIds?.filter((tagId) => {
      if (!tagId.match(regexUuid)) {
        customTags.push(tagId)
      }
    })
    newsRequest.tagIds?.filter((tagId) => {
      if (tagId.match(regexUuid)) {
        tagIds.push(tagId)
      }
    })

    for (const customTag of customTags) {
      tagsModel.push({
        name: customTag,
        createdBy: currentUser,
        updatedBy: currentUser
      })
    }

    const tagsCreated = await Tags.bulkCreate(tagsModel, { returning: true })
    for (const customTagCreated of tagsCreated) {
      tagIds.push(customTagCreated.id)
    }

    for (const tagId of tagIds) {
      newsTagsModel.push({
        newsId: news.id,
        tagId
      })
    }

    await NewsTags.bulkCreate(newsTagsModel, { returning: true })

    if (newsRequest.id === news.id) {
      logUpdate(
        currentUser,
        news.id,
        news.title!,
        HistoryEntityType.News
      );
    } else {
      logCreation(
        currentUser,
        news.id,
        news.title!,
        HistoryEntityType.News
      );
    }

    return {
      data: {
        id: news.id,
        title: news.title,
        description: news.description,
        publishDate: news.publishDate
      }
    }
  }

  public async deleteNews(newsId: string, currentUserId: string): Promise<void> {
    const news = await News.findByPk(newsId)

    if (!news?.id) {
      throw new CustomError('Not found this news', 400)
    }

    news.isDeleted = true
    news.updatedBy = currentUserId
    news.updatedAt = new Date()
    await news.save()
  }

  public async changeStatusNews(newsId: string, currentUserId: string): Promise<void> {
    const news = await News.findByPk(newsId)

    if (!news?.id) {
      throw new CustomError('Not found this news', 400)
    }

    if (news.status === NewStatus.Draft) {
      news.status = NewStatus.Publish
    } else {
      news.status = NewStatus.Draft
    }

    news.updatedAt = new Date()
    news.updatedBy = currentUserId
    await news.save()
  }

  private async bulkCreateNewsTags(tagIds: string[], newsId: string) {
    const newsTags: NewsTagsDto[] = []
    for (const tagId of tagIds) {
      newsTags.push({
        newsId,
        tagId
      })
    }
    await NewsTags.bulkCreate(newsTags, { returning: true })
  }

  private async deleteNewsTags() {
    await NewsTags.update({
      isDeleted: true,
      updatedAt: new Date()
    }, {
      where: {
        isDeleted: false
      }
    })
  }
}
