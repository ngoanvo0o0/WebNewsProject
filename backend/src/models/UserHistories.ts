import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Users, UsersId } from './Users';

export interface UserHistoriesAttributes {
  id: string;
  userId?: string;
  history?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  action: "get" | "create" | "update" | "delete" | "login" | "logout";
  entityId?: string;
  entityName?: string;
  entityType?: string;
}

export type UserHistoriesPk = "id";
export type UserHistoriesId = UserHistories[UserHistoriesPk];
export type UserHistoriesOptionalAttributes = "id" | "userId" | "history" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt" | "entityId" | "entityName" | "entityType";
export type UserHistoriesCreationAttributes = Optional<UserHistoriesAttributes, UserHistoriesOptionalAttributes>;

export class UserHistories extends Model<UserHistoriesAttributes, UserHistoriesCreationAttributes> implements UserHistoriesAttributes {
  id!: string;
  userId?: string;
  history?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  action!: "get" | "create" | "update" | "delete" | "login" | "logout";
  entityId?: string;
  entityName?: string;
  entityType?: string;

  // UserHistories belongsTo Users via userId
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserHistories {
    UserHistories.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    history: {
      type: DataTypes.STRING(100),
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
    action: {
      type: DataTypes.ENUM("get","create","update","delete","login","logout"),
      allowNull: false
    },
    entityId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'entity_id'
    },
    entityName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'entity_name'
    },
    entityType: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'entity_type'
    }
  }, {
    sequelize,
    tableName: 'user_histories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_histories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return UserHistories;
  }
}
