import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Comments, CommentsId } from './Comments';
import type { News, NewsId } from './News';
import type { Qas, QasId } from './Qas';
import type { Roles, RolesId } from './Roles';
import type { UserHistories, UserHistoriesId } from './UserHistories';

export interface UsersAttributes {
  id: string;
  name?: string;
  email?: string;
  bio?: string;
  roleId?: string;
  status?: "active" | "inactive";
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  password?: string;
  googleId?: string;
  facebookId?: string;
  phoneNumber?: string;
  avatar?: string;
  refreshToken?: string;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id" | "name" | "email" | "bio" | "roleId" | "status" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt" | "password" | "googleId" | "facebookId" | "phoneNumber" | "avatar" | "refreshToken";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: string;
  name?: string;
  email?: string;
  bio?: string;
  roleId?: string;
  status?: "active" | "inactive";
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  password?: string;
  googleId?: string;
  facebookId?: string;
  phoneNumber?: string;
  avatar?: string;
  refreshToken?: string;

  // Users belongsTo Roles via roleId
  role!: Roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<Roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<Roles, RolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<Roles>;
  // Users hasMany Comments via userId
  comments!: Comments[];
  getComments!: Sequelize.HasManyGetAssociationsMixin<Comments>;
  setComments!: Sequelize.HasManySetAssociationsMixin<Comments, CommentsId>;
  addComment!: Sequelize.HasManyAddAssociationMixin<Comments, CommentsId>;
  addComments!: Sequelize.HasManyAddAssociationsMixin<Comments, CommentsId>;
  createComment!: Sequelize.HasManyCreateAssociationMixin<Comments>;
  removeComment!: Sequelize.HasManyRemoveAssociationMixin<Comments, CommentsId>;
  removeComments!: Sequelize.HasManyRemoveAssociationsMixin<Comments, CommentsId>;
  hasComment!: Sequelize.HasManyHasAssociationMixin<Comments, CommentsId>;
  hasComments!: Sequelize.HasManyHasAssociationsMixin<Comments, CommentsId>;
  countComments!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany News via userId
  newsses!: News[];
  getNewsses!: Sequelize.HasManyGetAssociationsMixin<News>;
  setNewsses!: Sequelize.HasManySetAssociationsMixin<News, NewsId>;
  addNewss!: Sequelize.HasManyAddAssociationMixin<News, NewsId>;
  addNewsses!: Sequelize.HasManyAddAssociationsMixin<News, NewsId>;
  createNewss!: Sequelize.HasManyCreateAssociationMixin<News>;
  removeNewss!: Sequelize.HasManyRemoveAssociationMixin<News, NewsId>;
  removeNewsses!: Sequelize.HasManyRemoveAssociationsMixin<News, NewsId>;
  hasNewss!: Sequelize.HasManyHasAssociationMixin<News, NewsId>;
  hasNewsses!: Sequelize.HasManyHasAssociationsMixin<News, NewsId>;
  countNewsses!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany Qas via userId
  qas!: Qas[];
  getQas!: Sequelize.HasManyGetAssociationsMixin<Qas>;
  setQas!: Sequelize.HasManySetAssociationsMixin<Qas, QasId>;
  addQa!: Sequelize.HasManyAddAssociationMixin<Qas, QasId>;
  addQas!: Sequelize.HasManyAddAssociationsMixin<Qas, QasId>;
  createQa!: Sequelize.HasManyCreateAssociationMixin<Qas>;
  removeQa!: Sequelize.HasManyRemoveAssociationMixin<Qas, QasId>;
  removeQas!: Sequelize.HasManyRemoveAssociationsMixin<Qas, QasId>;
  hasQa!: Sequelize.HasManyHasAssociationMixin<Qas, QasId>;
  hasQas!: Sequelize.HasManyHasAssociationsMixin<Qas, QasId>;
  countQas!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany UserHistories via userId
  userHistories!: UserHistories[];
  getUserHistories!: Sequelize.HasManyGetAssociationsMixin<UserHistories>;
  setUserHistories!: Sequelize.HasManySetAssociationsMixin<UserHistories, UserHistoriesId>;
  addUserHistory!: Sequelize.HasManyAddAssociationMixin<UserHistories, UserHistoriesId>;
  addUserHistories!: Sequelize.HasManyAddAssociationsMixin<UserHistories, UserHistoriesId>;
  createUserHistory!: Sequelize.HasManyCreateAssociationMixin<UserHistories>;
  removeUserHistory!: Sequelize.HasManyRemoveAssociationMixin<UserHistories, UserHistoriesId>;
  removeUserHistories!: Sequelize.HasManyRemoveAssociationsMixin<UserHistories, UserHistoriesId>;
  hasUserHistory!: Sequelize.HasManyHasAssociationMixin<UserHistories, UserHistoriesId>;
  hasUserHistories!: Sequelize.HasManyHasAssociationsMixin<UserHistories, UserHistoriesId>;
  countUserHistories!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    Users.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'id'
      },
      field: 'role_id'
    },
    status: {
      type: DataTypes.ENUM("active","inactive"),
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'is_deleted'
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'created_by'
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'updated_by'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'updated_at'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    googleId: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'google_id'
    },
    facebookId: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'facebook_id'
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'phone_number'
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    refreshToken: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'refresh_token'
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Users;
  }
}
