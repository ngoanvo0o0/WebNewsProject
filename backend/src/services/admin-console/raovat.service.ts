import { CustomError } from "../../errorHandler";
import {
  GetRaoVatResponse,
  RaoVatResponse,
  RaoVatRequest,
} from "../../apis/admin-console";
import { PagedRaoVatItemDto, RaoVatDto } from "../../dtos/raovat.dto";
import { Categories, RaoVats, Users } from "../../models/init-models";
import { generateSlug } from "../../shared/function";
import { PagedList } from "../../dtos/pagination.dto";
import { GetRaoVatRequest } from "../../apis/website";
import { Op } from "sequelize";
import { CategoryDto } from "../../dtos/category.dto";
import { orderBy } from "lodash";
import { logCreation, logDeletion, logUpdate } from "./histories.service";
import { HistoryEntityType } from "../../dtos/history.dto";
import logger from "../../shared/Logger";

const host = process.env.HOST || "";
export class AdminConsoleRaoVatService {
  public async getRaoVats(): Promise<GetRaoVatResponse> {
    const raovats = await RaoVats.findAll({
      attributes: [
        'id',
        'title',
        'imageurl',
        'view',
        'status',
        ['category_id', 'categoryId'],
        ['publish_date', 'publishDate'],
        ['created_at', 'createdAt'],
        ['created_by', 'createdBy'],
        ['updated_at', 'updatedAt'],
        'customId'
      ],
      where: {
        isDeleted: false
      },
      include: [
        {
          model: Categories,
          as: "category",
          attributes: [
            'id',
            'name'
          ],
          where: {
            isDeleted: false,
          },
          required: false,
        },
      ],
      order: [["created_at", "ASC"]],
    });

    const raovatsMapped = raovats.map(
      (raovat, index) =>
        ({
          index: index + 1,
          id: raovat.id,
          title: raovat.title,
          imageUrl: raovat.imageurl && `${host}${raovat.imageurl}`,
          categoryId: raovat.categoryId,
          categoryName: raovat.category?.name,
          publishDate: raovat.publishDate,
          createdAt: raovat.createdAt,
          createdBy: raovat.createdBy,
          updatedAt: raovat.updatedAt,
          view: String(Number(raovat.view || 0)),
          status: raovat.status,
          customId: Number(raovat.customId)
        } as RaoVatDto)
    );

    const orderByCreatedAt = orderBy(raovatsMapped, (e) => e.customId, "desc");

    return { data: orderByCreatedAt };
  }

  public async getRaoVatsById(raoVatId: string): Promise<RaoVatResponse> {
    const raovat = await RaoVats.findOne({
      where: {
        isDeleted: false,
        id: raoVatId,
      },
      include: [
        {
          model: Categories,
          as: "category",
          where: {
            isDeleted: false,
          },
          required: false,
        },
      ],
    });

    if (!raovat) {
      throw new CustomError("Rao vat not found", 400);
    }

    let userNameUpdated = "";
    if (raovat.updatedBy) {
      const findUserUpdated = await Users.findOne({
        where: {
          isDeleted: false,
          id: raovat.updatedBy,
        },
      });

      userNameUpdated = findUserUpdated?.name ?? "";
    }

    const raovatObject = {
      id: raovat.id,
      title: raovat.title,
      content: raovat.content,
      imageUrl: raovat.imageurl && `${host}${raovat.imageurl}`,
      extraImages: raovat.extraImages?.map((x) => `${host}${x}`) ?? [],
      rawExtraImagePaths: raovat.extraImages ?? [],
      categoryId: raovat.categoryId,
      categoryName: raovat.category?.name,
      publishDate: raovat.publishDate,
      createdAt: raovat.createdAt,
      createdBy: raovat.createdBy,
      userNameUpdated,
      facebook: raovat.facebook,
      phoneNumber: raovat.phoneNumber,
      updatedAt: raovat.updatedAt,
      metaKeyword: raovat.metaKeyword,
      contactName: raovat.contactName,
      address: raovat.address,
      email: raovat.email,
      websiteUrl: raovat.websiteUrl,
      description: raovat.description,
      status: raovat.status
    } as RaoVatDto;

    return { data: raovatObject };
  }

  public async upsertRaoVat(
    raovatRequest: RaoVatRequest,
    currentUser: string
  ): Promise<RaoVatResponse> {
    let slug = undefined;
    let customId = undefined

    if (!raovatRequest.id && raovatRequest.title) {
      slug = generateSlug(raovatRequest.title);
      const findMaxCustomId = await RaoVats.max('customId')
      logger.info('findMaxCustomId: ' + JSON.stringify(findMaxCustomId))
      customId = Number(findMaxCustomId || 0) + 1
    }

    const [raovat] = await RaoVats.upsert({
      id: raovatRequest.id,
      categoryId: raovatRequest.categoryId,
      content: raovatRequest.content,
      imageurl: raovatRequest.imageUrl,
      extraImages: raovatRequest.extraImages,
      publishDate: raovatRequest.publishDate,
      title: raovatRequest.title,
      slug,
      createdBy: !raovatRequest.id ? currentUser : undefined,
      updatedBy: currentUser,
      facebook: raovatRequest.facebook,
      phoneNumber: raovatRequest.phoneNumber,
      metaKeyword: raovatRequest.metaKeyword,
      contactName: raovatRequest.contactName,
      websiteUrl: raovatRequest.websiteUrl,
      address: raovatRequest.address,
      email: raovatRequest.email,
      description: raovatRequest.description,
      status: raovatRequest.status,
      customId
    });

    if (raovatRequest.id === raovat.id) {
      logUpdate(
        currentUser,
        raovat.id,
        raovat.title!,
        HistoryEntityType.RaoVat
      );
    } else {
      logCreation(
        currentUser,
        raovat.id,
        raovat.title!,
        HistoryEntityType.RaoVat
      );
    }

    return {
      data: {
        id: raovat.id,
        title: raovat.title,
        publishDate: raovat.publishDate,
      },
    };
  }

  public async deleteRaoVat(raoVatId: string, userId: string): Promise<void> {
    const raovat = await RaoVats.findByPk(raoVatId);

    if (!raovat?.id) {
      throw new CustomError("Rao vat not found", 400);
    }

    raovat.isDeleted = true;
    raovat.updatedAt = new Date();
    raovat.updatedBy = userId;
    await raovat.save();
    logDeletion(userId, raovat.id, raovat.title!, HistoryEntityType.RaoVat);
  }

  public async getRaoVatsForWebsite(
    raoVatRequest: GetRaoVatRequest
  ): Promise<PagedList<PagedRaoVatItemDto>> {
    const { rows, count } = await RaoVats.findAndCountAll({
      where: {
        isDeleted: false,
        status: 'publish'
      },
      offset: (raoVatRequest.page - 1) * raoVatRequest.size,
      limit: raoVatRequest.size,
      include: [
        {
          model: Categories,
          as: "category",
          where: {
            isDeleted: false,
            slug: raoVatRequest.categorySlug
              ? raoVatRequest.categorySlug
              : { [Op.not]: null! },
          },
          required: true,
        },
      ],
      order: [["publish_date", "DESC"]],
    });

    const raovatsMapped = rows.map(
      (raovat) =>
        ({
          id: raovat.id,
          title: raovat.title,
          content: raovat.content,
          imageUrl: raovat.imageurl && `${host}${raovat.imageurl}`,
          categoryId: raovat.categoryId,
          categoryName: raovat.category?.name,
          publishDate: raovat.publishDate,
          createdAt: raovat.createdAt,
          createdBy: raovat.createdBy,
          slug: raovat.slug,
          metaKeyword: raovat.metaKeyword,
        } as PagedRaoVatItemDto)
    );

    return new PagedList<PagedRaoVatItemDto>(
      raovatsMapped,
      count,
      raoVatRequest.page,
      raoVatRequest.size
    );
  }

  public async getRaoVatBySlug(slug: string): Promise<RaoVatDto> {
    const raovat = await RaoVats.findOne({
      where: {
        isDeleted: false,
        slug,
        status: 'publish'
      },
      include: [
        {
          model: Categories,
          as: "category",
          where: {
            isDeleted: false,
          },
          required: false,
        },
      ],
    });

    if (!raovat) {
      throw new CustomError("Rao vat not found", 400);
    }

    raovat.view = !raovat.view ? '1' : String(Number(raovat.view) + 1)
    await raovat.save()
    const raovatObject = {
      id: raovat.id,
      title: raovat.title,
      content: raovat.content,
      imageUrl: raovat.imageurl && `${host}${raovat.imageurl}`,
      extraImages: raovat.extraImages?.map((x) => `${host}${x}`) ?? [],
      categoryId: raovat.categoryId,
      categoryName: raovat.category?.name,
      publishDate: raovat.publishDate,
      createdAt: raovat.createdAt,
      createdBy: raovat.createdBy,
      slug: raovat.slug,
      facebook: raovat.facebook,
      phoneNumber: raovat.phoneNumber,
      contactName: raovat.contactName,
      websiteUrl: raovat.websiteUrl,
      address: raovat.address,
      email: raovat.email,
      metaKeyword: raovat.metaKeyword,
      description: raovat.description,
    } as RaoVatDto;

    return raovatObject;
  }

  public async getCategoriesByType(
    type: "raovat" | "menu" | "news"
  ): Promise<CategoryDto[]> {
    const categories = await Categories.findAll({
      where: {
        isDeleted: false,
        type,
      },
    });

    return categories.map((c) => {
      return {
        name: c.name!,
        slug: c.slug!,
      } as CategoryDto;
    });
  }
}
