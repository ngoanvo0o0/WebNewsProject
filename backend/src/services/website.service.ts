import { Comments } from "../models/Comments";
import { CreateCommentRequest, GetCommentsRequest } from "../apis/website";
import { PagedList } from "../dtos/pagination.dto";
import { CommentDto, PagedCommentItemDto } from "../dtos/comment.dot";
import { Users } from "../models/Users";
import { News } from "../models/News";
import { Categories } from "../models/Categories";
import { chain, uniqBy } from "lodash";
import { NewsDto, NewsGroupedByCategoryDto } from "../dtos/news.dto";
import { Op } from "sequelize";
import { Menu } from "../models/Menu";
import { RaoVats } from "../models/RaoVats";
import { Ads } from "../models/Ads";
import { AdvertisementDto } from "../dtos/advertisement.dto";
import { Website } from "../models/Website";
import { WebsiteDto } from "../dtos/website.dto";

const host = process.env.HOST || ""
export class WebsiteService {
    public async createComment(commentRequest: CreateCommentRequest, currentUser?: string): Promise<void> {
        await Comments.create({
            content: commentRequest.content,
            newsId: commentRequest.newsId,
            raoVatId: commentRequest.raoVatId,
            anonymousEmail: commentRequest.anonymousEmail,
            anonymousName: commentRequest.anonymousName,
            userId: currentUser
        })
    }

    public async getComments(getCommentRequest: GetCommentsRequest): Promise<PagedList<PagedCommentItemDto>> {
        const { rows, count } = await Comments.findAndCountAll({
            where: {
                isDeleted: false,
                raoVatId: getCommentRequest.raoVatId || null!,
                newsId: getCommentRequest.newsId || null!
            },
            offset: (getCommentRequest.page - 1) * getCommentRequest.size,
            limit: getCommentRequest.size,
            include: [
                {
                    model: Users,
                    as: 'user',
                    required: false,
                    where: {
                        isDeleted: false
                    }
                }
            ],
            order: [['createdAt', 'asc']]
        })

        const comments = rows.map(e => {
            return {
                name: e.user?.name || e.anonymousName,
                email: e.user?.email || e.anonymousEmail,
                content: e.content,
                avatar: e.user?.avatar,
                createdAt: e.createdAt,
                userId: e.user?.id
            } as CommentDto
        })

        return new PagedList<PagedCommentItemDto>(comments, count, getCommentRequest.page, getCommentRequest.size);
    }

    public async getNewsGroupedByCategory(): Promise<NewsGroupedByCategoryDto[]> {
        const newsOnlyParentCategories = await News.findAll({
            where: {
                isDeleted: false,
                status: 'publish',
                isHotNews: false
            },
            include: [{
                model: Categories,
                as: 'category',
                where: {
                    isDeleted: false,
                    status: 'active',
                    type: 'news',
                    parentId: null!,
                },
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

        const newsOnlySubCategories = await News.findAll({
            where: {
                isDeleted: false,
                status: 'publish',
                isHotNews: false
            },
            include: [{
                model: Categories,
                as: 'category',
                where: {
                    isDeleted: false,
                    status: 'active',
                    type: 'news'
                },
                include: [{
                    required: true,
                    model: Categories,
                    as: 'parent',
                    where: {
                        type: 'news',
                        isDeleted: false,
                        status: 'active'
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

        const news = [...newsOnlySubCategories, ... newsOnlyParentCategories]
        const newsGroupedByCategory: NewsGroupedByCategoryDto[] = chain(news).map(e => {
            return {
                id: e.id,
                title: e.title,
                description: e.description,
                content: e.content,
                publishDate: e.publishDate,
                userId: e.userId,
                categoryId: e.category.parent?.id || e.category?.id,
                categoryName: e.category.parent?.name || e.category?.name,
                categoryStyle: e.category.parent?.styleShow || e.category?.styleShow,
                imageUrl: e.imageurl && `${host}${e.imageurl}`,
                status: e.status,
                slug: e.slug,
                isHotNews: e.isHotNews,
                author: e.user?.name,
                view: e.view,
                createdAt: e.createdAt
              } as NewsDto
        })
        .sortBy(e => e.createdAt)
        .reverse()
        .groupBy(e => (`${e.categoryId}@${e.categoryName}@${e.categoryStyle}`))
        .map((e, key) => {
            const id = key.split('\@')[0]
            const name = key.split('\@')[1]
            const categoryStyle = key.split('\@')[2]
            return {
                id,
                name,
                styleShow: categoryStyle,
                newses: e?.slice(0, 6)
            } as NewsGroupedByCategoryDto
        })
        .value()

        return newsGroupedByCategory
    }

    public async getSitemap (): Promise<string[]> {
        const HOST = process.env.WEBSITE_URL
        const [menus, newses, raoVats, categories] = await Promise.all([
            Menu.findAll({
                where: {
                    isDeleted: false,
                    slug: {
                        [Op.ne]: null!
                    }
                }
            }),
            News.findAll({
                where: {
                    isDeleted: false,
                    status: 'publish',
                    slug: {
                        [Op.ne]: null!
                    }
                }
            }),
            RaoVats.findAll({
                where: {
                    isDeleted: false,
                    slug: {
                        [Op.ne]: null!
                    }
                }
            }),
            Categories.findAll({
                where: {
                    isDeleted: false,
                    slug: {
                        [Op.ne]: null!
                    }
                }
            })
        ])

        const menuSlugs = [...menus].filter((menu) => menu.slug).map((menu) => `${HOST}/${menu.slug!}`)
        const newsSlugs = [...newses].filter((news) => news.slug).map((news) => `${HOST}/bai-viet/${news.slug!}`)
        const raoVatSlugs = [...raoVats].filter((raoVat) => raoVat.slug).map((raoVat) => `${HOST}/rao-vat/${raoVat.slug!}`)
        const categorySlugs = [...categories].filter((category) => category.slug).map((category) => `${HOST}/${category.slug!}`)

        return uniqBy([...menuSlugs, ...newsSlugs, ...raoVatSlugs, ...categorySlugs], (e) => e)
    }

    public async getAds (): Promise<AdvertisementDto[]> {
        const ads = await Ads.findAll({
            where: {
                isDeleted: false
            },
            order: [['order', 'asc']]
        })

        return ads.map(e => {
            return {
                id: e.id,
                name: e.name,
                imageUrl: e.imageurl && `${host}${e.imageurl}`,
                url: e.url,
                order: e.order,
                position: e.position
            } as AdvertisementDto
        }) 
    }

    public async getWebsiteConfig (): Promise<WebsiteDto> {
        const web = await Website.findOne()

        return {
            logo: web?.logo,
            facebookUrl: web?.facebookUrl,
            googleUrl: web?.googleUrl,
            twitterUrl: web?.twitterUrl,
            linkedinUrl: web?.linkedinUrl
        }
    }
    
}
