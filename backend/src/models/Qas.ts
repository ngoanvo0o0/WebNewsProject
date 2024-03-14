import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Users, UsersId } from './Users';

export interface QasAttributes {
  id: string;
  question?: string;
  answer?: string;
  publishDate?: Date;
  userId?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type QasPk = "id";
export type QasId = Qas[QasPk];
export type QasOptionalAttributes = "id" | "question" | "answer" | "publishDate" | "userId" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type QasCreationAttributes = Optional<QasAttributes, QasOptionalAttributes>;

export class Qas extends Model<QasAttributes, QasCreationAttributes> implements QasAttributes {
  id!: string;
  question?: string;
  answer?: string;
  publishDate?: Date;
  userId?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Qas belongsTo Users via userId
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Qas {
    Qas.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    question: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    publishDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'publish_date'
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
    }
  }, {
    sequelize,
    tableName: 'qas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "qas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Qas;
  }
}
