import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { News, NewsId } from './News';
import type { RaoVats, RaoVatsId } from './RaoVats';
import type { Users, UsersId } from './Users';

export interface CommentsAttributes {
  id: string;
  content?: string;
  newsId?: string;
  userId?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  anonymousEmail?: string;
  anonymousName?: string;
  anonymousAddress?: string;
  raoVatId?: string;
}

export type CommentsPk = "id";
export type CommentsId = Comments[CommentsPk];
export type CommentsOptionalAttributes = "id" | "content" | "newsId" | "userId" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt" | "anonymousEmail" | "anonymousName" | "anonymousAddress" | "raoVatId";
export type CommentsCreationAttributes = Optional<CommentsAttributes, CommentsOptionalAttributes>;

export class Comments extends Model<CommentsAttributes, CommentsCreationAttributes> implements CommentsAttributes {
  id!: string;
  content?: string;
  newsId?: string;
  userId?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  anonymousEmail?: string;
  anonymousName?: string;
  anonymousAddress?: string;
  raoVatId?: string;

  // Comments belongsTo News via newsId
  news!: News;
  getNews!: Sequelize.BelongsToGetAssociationMixin<News>;
  setNews!: Sequelize.BelongsToSetAssociationMixin<News, NewsId>;
  createNews!: Sequelize.BelongsToCreateAssociationMixin<News>;
  // Comments belongsTo RaoVats via raoVatId
  raoVat!: RaoVats;
  getRaoVat!: Sequelize.BelongsToGetAssociationMixin<RaoVats>;
  setRaoVat!: Sequelize.BelongsToSetAssociationMixin<RaoVats, RaoVatsId>;
  createRaoVat!: Sequelize.BelongsToCreateAssociationMixin<RaoVats>;
  // Comments belongsTo Users via userId
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Comments {
    Comments.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    newsId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'news',
        key: 'id'
      },
      field: 'news_id'
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
    },
    anonymousEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'anonymous_email'
    },
    anonymousName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'anonymous_name'
    },
    anonymousAddress: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'anonymous_address'
    },
    raoVatId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'rao_vats',
        key: 'id'
      },
      field: 'rao_vat_id'
    }
  }, {
    sequelize,
    tableName: 'comments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "comments_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Comments;
  }
}
