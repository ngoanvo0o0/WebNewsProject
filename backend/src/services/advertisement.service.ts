import { Ads } from "../models/Ads";
import { PaginationQuery } from "../dtos/pagination.dto";
import { handlePaginationRequest } from "../helpers/pagination.helper";
import {
  AdvertisementDto,
  SaveAdvertisementDto,
} from "../dtos/advertisement.dto";
import { isBelongToValues } from "../helpers/type-value.helper";
import { Users } from "../models/Users";
import { CustomError } from "../errorHandler";
import {
  logCreation,
  logDeletion,
  logUpdate,
} from "./admin-console/histories.service";
import { HistoryEntityType } from "../dtos/history.dto";

const host = process.env.HOST || "";

export async function getAdvertisements(
  pagination: PaginationQuery
): Promise<AdvertisementDto[]> {
  const validatedPagination = handlePaginationRequest(pagination);
  const ads = await Ads.findAll({
    limit: validatedPagination.size,
    offset: (validatedPagination.page! - 1) * validatedPagination.size!,
    where: { isDeleted: false },
    order: [["updatedAt", "DESC"]],
  });

  return ads.map((ad) => mapEntityToDto(ad));
}

export async function getAdvertisement(id: string): Promise<AdvertisementDto> {
  const ad = await Ads.findByPk(id);
  if (!ad) {
    throw new CustomError("Advertisement not found", 404);
  }
  const userUpdated = await Users.findOne({
    where: {
      isDeleted: false,
      id: ad.updatedBy,
    },
  });
  return mapEntityToDto(ad, userUpdated?.name);
}

export async function createAdvertisement(
  input: SaveAdvertisementDto
): Promise<AdvertisementDto> {
  if (!input.imageUrl) {
    throw new CustomError("Missing image", 404);
  }

  checkAdvertisementInputValues(input);
  await checkUserExistence(input.userId);

  const ad = await Ads.create({
    name: input.name,
    imageurl: input.imageUrl,
    order: input.order,
    position: input.position,
    status: input.status,
    createdBy: input.userId,
    updatedBy: input.userId,
    url: input.url,
  });

  logCreation(input.userId, ad.id, ad.name!, HistoryEntityType.Advertisement);

  return mapEntityToDto(ad);
}

export async function updateAdvertisement(
  id: string,
  input: SaveAdvertisementDto
): Promise<{ advertisement: AdvertisementDto; oldImageUrl?: string }> {
  checkAdvertisementInputValues(input);

  const advertisement = await Ads.findByPk(id);
  if (!advertisement) {
    throw new CustomError("Advertisement not found", 404);
  }

  if (advertisement.updatedBy !== input.userId) {
    checkUserExistence(input.userId);
    advertisement.updatedBy = input.userId;
  }

  const oldImageUrl = advertisement.imageurl;
  advertisement.name = input.name;
  advertisement.order = input.order;
  advertisement.url = input.url;
  advertisement.position = input.position;
  advertisement.status = input.status;
  advertisement.updatedAt = new Date();
  if (input.imageUrl) {
    advertisement.imageurl = input.imageUrl;
  }
  await advertisement.save();

  logUpdate(
    input.userId,
    advertisement.id,
    advertisement.name!,
    HistoryEntityType.Advertisement
  );

  return { advertisement: mapEntityToDto(advertisement), oldImageUrl };
}

export async function deleteAdvertisement(
  id: string,
  userId: string
): Promise<void> {
  const advertisement = await Ads.findByPk(id);
  if (!advertisement) {
    throw new CustomError("Advertisement not found", 404);
  }

  advertisement.isDeleted = true;
  advertisement.updatedBy = userId;
  advertisement.updatedAt = new Date();
  await advertisement.save();

  logDeletion(
    userId,
    advertisement.id,
    advertisement.name!,
    HistoryEntityType.Advertisement
  );
}

function checkAdvertisementInputValues(input: SaveAdvertisementDto): void {
  if (
    !input.name ||
    !input.order ||
    !input.url ||
    !input.position ||
    !input.status ||
    !input.userId
  ) {
    throw new CustomError("Missing required fields", 404);
  }

  if (
    !isBelongToValues(input.position, [
      "top",
      "left",
      "right",
      "center",
      "bottom",
    ])
  ) {
    throw new CustomError("Invalid position value", 404);
  }

  if (!isBelongToValues(input.status, ["active", "inactive"])) {
    throw new CustomError("Invalid status value", 404);
  }

  if (input.order < 1) {
    throw new CustomError("Invalid order value", 404);
  }
}

async function checkUserExistence(userId: string): Promise<void> {
  const user = await Users.findByPk(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
}

function mapEntityToDto(
  entity: Ads,
  userNameUpdated?: string
): AdvertisementDto {
  return {
    id: entity.id,
    name: entity.name,
    url: entity.url,
    imageUrl: entity.imageurl && `${host}${entity.imageurl}`,
    order: entity.order,
    position: entity.position,
    status: entity.status,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    userNameUpdated,
  } as AdvertisementDto;
}
