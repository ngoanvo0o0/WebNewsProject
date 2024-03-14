import { UserHistories } from "../../models/UserHistories";
import { HistoryAction, HistoryDto } from "../../dtos/history.dto";
import { Users } from "../../models/Users";

export async function listHistories(): Promise<HistoryDto[]> {
  const ads = await UserHistories.findAll({
    include: { model: Users, as: "user" },
    where: { isDeleted: false },
    order: [["updatedAt", "DESC"]],
  });
  ads;
  return ads.map((ad) => mapEntityToDto(ad));
}

function mapEntityToDto(history: UserHistories) {
  return {
    id: history.id,
    userName: history.user.name,
    action: history.action,
    entityId: history.id,
    entityName: history.entityName,
    entityType: history.entityType,
    createdDate: history.updatedAt,
  } as HistoryDto;
}

export async function logVisit(
  userId: string,
  entityId: string,
  entityName: string,
  entityType: string
) {
  await logHistory(userId, "get", entityId, entityName, entityType);
}

export async function logCreation(
  userId: string,
  entityId: string,
  entityName: string,
  entityType: string
) {
  await logHistory(userId, "create", entityId, entityName, entityType);
}

export async function logUpdate(
  userId: string,
  entityId: string,
  entityName: string,
  entityType: string
) {
  await UserHistories.update(
    { entityName: entityName },
    { where: { entityId: entityId } }
  );
  await logHistory(userId, "update", entityId, entityName, entityType);
}

export async function logDeletion(
  userId: string,
  entityId: string,
  entityName: string,
  entityType: string
) {
  await logHistory(userId, "delete", entityId, entityName, entityType);
}

export async function logHistory(
  userId: string,
  action: HistoryAction,
  entityId?: string,
  entityName?: string,
  entityType?: string
) {
  await UserHistories.create({
    userId: userId,
    action: action,
    entityId: entityId,
    entityName: entityName,
    entityType: entityType,
  });
}
