import { CustomError } from "../../errorHandler"
import { GetMenuResponse, MenuRequest, MenuResponse } from "../../apis/admin-console"
import { Categories, Menu, Users } from "../../models/init-models"
import { generateSlug } from "../../shared/function"
import { MenuDto } from "../../dtos/menu.dto"
import { CategoryDto } from "src/dtos/category.dto"
import { Op } from "sequelize"
import { logCreation, logUpdate } from "./histories.service"
import { HistoryEntityType } from "../../dtos/history.dto"

export class AdminConsoleMenuService {
  public async getMenus(): Promise<GetMenuResponse> {
    const menus = await Menu.findAll({
      where: {
        isDeleted: false
      },
      order: [
        ['order', 'ASC']
      ],
      include: [{
        model: Categories,
        as: 'category',
        where: {
          isDeleted: false
        },
        required: false
      }]
    })
    const parentIdList = menus.filter(x => x.categoryId).map((menu) => menu.categoryId!)
    const childCategories = await Categories.findAll({
      where: {
        isDeleted: false,
        [Op.and]: [
          {parentId: {[Op.not]: null}},
          {parentId: {[Op.in]: parentIdList}}
        ]
      }
    })
    const childCategoryGroups = childCategories.reduce((acc, cur) => {
      if (!acc[cur.parentId!]) {
        acc[cur.parentId!] = []
      }
      acc[cur.parentId!].push(cur)
      return acc
    }, {} as {[key: string]: Categories[]})

    const menusMapped = menus.map((menu) => ({
      id: menu.id,
      order: menu.order,
      name: menu.name,
      categoryId: menu.categoryId,
      categoryName: menu.category?.name,
      createdAt: menu.createdAt,
      createdBy: menu.createdBy,
      slug: menu.category?.slug,
      childCategories: childCategoryGroups[menu.categoryId!]?.map((childCategory) => mapCategory(childCategory)) ?? []
    }) as MenuDto)

    return { data: menusMapped }
  }

  public async getMenusById(menuId: string): Promise<MenuResponse> {
    const menu = await Menu.findOne({
      where: {
        isDeleted: false,
        id: menuId
      },
      include: [{
        model: Categories,
        as: 'category',
        where: {
          isDeleted: false
        },
        required: false
      }],
      order: [
        ['updated_at', 'DESC']
      ]
    })

    if (!menu) {
      throw new CustomError('Menu not found', 400)
    }

    let userNameUpdated = ''
    if (menu.updatedBy) {
      const findUserUpdated = await Users.findOne({
        where: {
          isDeleted: false,
          id: menu.updatedBy
        }
      })

      userNameUpdated = findUserUpdated?.name ?? ''
    }


    const menuObject = {
      id: menu.id,
      order: menu.order,
      name: menu.name,
      categoryId: menu.categoryId,
      categoryName: menu.category?.name,
      createdAt: menu.createdAt,
      createdBy: menu.createdBy,
      userNameUpdated,
      updatedAt: menu.updatedAt
    } as MenuDto

    return { data: menuObject }
  }

  public async upsertMenu(menuRequest: MenuRequest, currentUser: string): Promise<MenuResponse> {
    let slug = undefined

    if (!menuRequest.id && menuRequest.name) {
      slug = generateSlug(menuRequest.name)
    }

    const [menu] = await Menu.upsert({
      id: menuRequest.id,
      categoryId: menuRequest.categoryId,
      name: menuRequest.name,
      order: menuRequest.order,
      slug,
      createdBy: !menuRequest.id ? currentUser : undefined,
      updatedBy: currentUser
    })

    if (menuRequest.id === menu.id) {
      logUpdate(
        currentUser,
        menu.id,
        menu.name!,
        HistoryEntityType.Menu
      );
    } else {
      logCreation(
        currentUser,
        menu.id,
        menu.name!,
        HistoryEntityType.Menu
      );
    }

    return {
      data: {
        id: menu.id,
        name: menu.name
      }
    }
  }

  public async deleteMenu(menuId: string): Promise<void> {
    const menu = await Menu.findByPk(menuId)

    if (!menu?.id) {
      throw new CustomError('Menu not found', 400)
    }

    menu.isDeleted = true
    menu.updatedAt = new Date()
    await menu.save()
  }
}

function mapCategory(category: Categories) {
  return {
    id: category.id,
    name: category.name,
    parentId: category.parentId,
    status: category.status,
    type: category.type,
    styleShow: category.styleShow,
    slug: category.slug
  } as CategoryDto
}