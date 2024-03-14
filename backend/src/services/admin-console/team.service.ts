import { UserDto } from "../../dtos/user.dto"
import { GetUsersByIdResponse, GetUsersResponse, UpsertUserRequest, UpsertUserResponse } from "../../apis/admin-console"
import { Users } from "../../models/Users"
import { CustomError } from "../../errorHandler"
import { Op } from "sequelize"
import { uuid } from 'uuidv4'
import {random} from "lodash";
import { hashSecret } from "../authentication.service"
import { logCreation, logUpdate } from "./histories.service"
import { HistoryEntityType } from "../../dtos/history.dto"

export class AdminConsoleTeamService {
  public async getTeam(): Promise<GetUsersResponse> {
    const users = await Users.findAll({
      where: {
        isDeleted: false,
        roleId: {
          [Op.ne]: null!
        }
      },
      attributes: ['id', 'name', 'email', 'bio', 'status', ['created_at', 'createdAt']],
      order: [['updated_at', 'DESC']]
    })

    const usersMapped = users.map((user) => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        bio: user.bio,
        status: user.status,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt
      } as UserDto
    })

    return { data: usersMapped }
  }

  public async getTeamById(userId: string): Promise<GetUsersByIdResponse> {
    const userModel = await Users.findOne({
      where: {
        isDeleted: false,
        id: userId
      }
    })

    if (!userModel) {
      throw new CustomError('User not found', 400)
    }

    let userNameUpdated = ''
    if (userModel.updatedBy) {
      const findUserUpdated = await Users.findOne({
        where: {
          isDeleted: false,
          id: userModel.updatedBy
        }
      })

      userNameUpdated = findUserUpdated?.name ?? ''
    }

    const user = {
      id: userModel.id,
      email: userModel.email,
      name: userModel.name,
      bio: userModel.bio,
      status: userModel.status,
      phoneNumber: userModel.phoneNumber,
      createdAt: userModel.createdAt,
      roleId: userModel.roleId,
      userNameUpdated,
      updatedAt: userModel.updatedAt
    } as UserDto

    return { data: user }
  }

  public async upsertTeam(userRequest: UpsertUserRequest, currentUser: string): Promise<UpsertUserResponse> {
    let userId = userRequest.id
    if (!userId) {
      userId = uuid()
    }
    const countEmailExisting = await Users.count({
      where: {
        isDeleted: false,
        email: {
          [Op.iLike]: userRequest.email
        },
        id: {
          [Op.ne]: userId
        }
      }
    })

    if (countEmailExisting > 0) {
      throw new CustomError('This email already exists in the system. Please enter another email.', 400)
    }

    const randomAvatarNum = random(0, 6)
    const mappedUser = {
      id: userRequest.id,
      name: userRequest.fullName,
      email: userRequest.email,
      roleId: userRequest.roleId,
      status: userRequest.status,
      // phoneNumber: userRequest.phoneNumber,
      updatedAt: new Date(),
      createdBy: !userRequest.id ? currentUser : undefined,
      updatedBy: currentUser,
      avatar: `/img/authorAvatar/c${randomAvatarNum}.png`
    } as Users;

    if(userRequest.password) {
      mappedUser.password = await hashSecret(userRequest.password);
    }

    const [user] = await Users.upsert(mappedUser, {
      returning: true
    })

    if (userRequest.id === user.id) {
      logUpdate(
        currentUser,
        user.id,
        user.name!,
        HistoryEntityType.Team
      );
    } else {
      logCreation(
        currentUser,
        user.id,
        user.name!,
        HistoryEntityType.Team
      );
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber
    }
  }

  public async deleteTeam(userId: string): Promise<void> {
    const user = await Users.findByPk(userId)

    if (!user) {
      throw new CustomError('Not found user', 400)
    }

    user.isDeleted = true
    user.updatedAt = new Date()
    user.save()
  }
}