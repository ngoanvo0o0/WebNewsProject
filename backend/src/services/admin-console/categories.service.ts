import { Categories } from "../../models/Categories"
import { CategoryDto, CategoryQuery, CategoryTypeShowEnum } from "../../dtos/category.dto"
import { GetCategoriesResponse, GetCategoryByIdResponse, SelectOptionResponse, UpsertCategoryRequest, UpsertCategoryResponse } from "../../apis/admin-console"
import { CustomError } from "../../errorHandler"
import { SelectOption } from "../../dtos/common"
import { Users } from "../../models/Users"
import { generateSlug } from "../../shared/function"
import { logCreation, logUpdate } from "./histories.service"
import { HistoryEntityType } from "../../dtos/history.dto"

export class AdminConsoleCategoryService {
  public async getCategories(queryParams?: CategoryQuery, onlyParent?: boolean): Promise<GetCategoriesResponse> {
    const slugCondition = queryParams?.slug ? { slug: queryParams.slug } : {}
    let categories = await Categories.findAll({
      where: {
        isDeleted: false,
        ...slugCondition
      },
      include: [{
        model: Categories,
        as: 'parent',
        where: {
          isDeleted: false
        },
        required: false
      }],
      order: [['updated_at', 'DESC']]
    })

    if (onlyParent) {
      categories = categories.filter(e => e.parentId === null)
    }

    const categoriesMapped = categories.map((category) => {
      const parentCategory = category.parent
      return {
        id: category.id,
        name: category.name,
        status: category.status,
        type: category.type,
        styleShow: category.styleShow,
        createdAt: category.createdAt,
        parentCategory: parentCategory && {
          id: parentCategory?.id,
          name: parentCategory?.name
        }
      } as CategoryDto
    })


    return { data: categoriesMapped }
  }

  public async getCategorysById(categoryId: string): Promise<GetCategoryByIdResponse> {
    const categoryModel = await Categories.findOne({
      where: {
        isDeleted: false,
        id: categoryId
      }
    })

    if (!categoryModel) {
      throw new CustomError('Category not found', 400)
    }

    let userNameUpdated = ''
    if (categoryModel.updatedBy) {
      const findUserUpdated = await Users.findOne({
        where: {
          isDeleted: false,
          id: categoryModel.updatedBy
        }
      })

      userNameUpdated = findUserUpdated?.name ?? ''
    }

    return {
      data: {
        id: categoryModel.id,
        name: categoryModel.name!,
        categoryParentId: categoryModel.parentId,
        status: categoryModel.status!,
        type: categoryModel.type!,
        styleShow: categoryModel.styleShow,
        userNameUpdated,
        updatedAt: categoryModel.updatedAt
      }
    }
  }

  public async upsertCategory(categoryRequest: UpsertCategoryRequest, currentUser: string): Promise<UpsertCategoryResponse> {
    let slug = undefined

    if (!categoryRequest.id && categoryRequest.name) {
      slug = generateSlug(categoryRequest.name)
    }

    const [category, value] = await Categories.upsert({
      id: categoryRequest.id,
      name: categoryRequest.name,
      parentId: categoryRequest.categoryParentId,
      status: categoryRequest.status,
      type: categoryRequest.type,
      styleShow: categoryRequest.styleShow as CategoryTypeShowEnum || null!,
      updatedAt: new Date(),
      createdBy: !categoryRequest.id ? currentUser : undefined,
      updatedBy: currentUser,
      slug
    }, {
      returning: true
    })

    if (categoryRequest.id === category.id) {
      logUpdate(
        currentUser,
        category.id,
        category.name!,
        HistoryEntityType.Category
      );
    } else {
      logCreation(
        currentUser,
        category.id,
        category.name!,
        HistoryEntityType.Category
      );
    }

    return {
      id: category.id,
      name: category.name!
    }
  }

  public async deleteCategory(categoryId: string): Promise<void> {
    const category = await Categories.findByPk(categoryId)

    if (!category) {
      throw new CustomError('Not found Category', 400)
    }

    category.isDeleted = true
    category.updatedAt = new Date()
    category.save()
  }

  public async getSelectCategories(type?: string): Promise<SelectOptionResponse> {
    const categories = await Categories.findAll({
      where: {
        isDeleted: false,
        type: type === 'menu' ? ['news', 'raovat', 'menu'] : type,
        status: 'active'
      }
    })

    const categoriesMapped = categories.map((category) => {
      return {
        label: category.name,
        value: category.id
      } as SelectOption
    })

    return { data: categoriesMapped }
  }
}