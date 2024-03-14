import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { News, NewsId } from './News';
import type { Tags, TagsId } from './Tags';

export interface NewsTagsAttributes {
  id: string;
  newsId?: string;
  tagId?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type NewsTagsPk = "id";
export type NewsTagsId = NewsTags[NewsTagsPk];
export type NewsTagsOptionalAttributes = "id" | "newsId" | "tagId" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type NewsTagsCreationAttributes = Optional<NewsTagsAttributes, NewsTagsOptionalAttributes>;

export class NewsTags extends Model<NewsTagsAttributes, NewsTagsCreationAttributes> implements NewsTagsAttributes {
  id!: string;
  newsId?: string;
  tagId?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // NewsTags belongsTo News via newsId
  news!: News;
  getNews!: Sequelize.BelongsToGetAssociationMixin<News>;
  setNews!: Sequelize.BelongsToSetAssociationMixin<News, NewsId>;
  createNews!: Sequelize.BelongsToCreateAssociationMixin<News>;
  // NewsTags belongsTo Tags via tagId
  tag!: Tags;
  getTag!: Sequelize.BelongsToGetAssociationMixin<Tags>;
  setTag!: Sequelize.BelongsToSetAssociationMixin<Tags, TagsId>;
  createTag!: Sequelize.BelongsToCreateAssociationMixin<Tags>;

  static initModel(sequelize: Sequelize.Sequelize): typeof NewsTags {
    NewsTags.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    tagId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'tags',
        key: 'id'
      },
      field: 'tag_id'
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
    tableName: 'news_tags',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "news_tags_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return NewsTags;
  }
}
