import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { NewsTags, NewsTagsId } from './NewsTags';

export interface TagsAttributes {
  id: string;
  name?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TagsPk = "id";
export type TagsId = Tags[TagsPk];
export type TagsOptionalAttributes = "id" | "name" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type TagsCreationAttributes = Optional<TagsAttributes, TagsOptionalAttributes>;

export class Tags extends Model<TagsAttributes, TagsCreationAttributes> implements TagsAttributes {
  id!: string;
  name?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Tags hasMany NewsTags via tagId
  newsTags!: NewsTags[];
  getNewsTags!: Sequelize.HasManyGetAssociationsMixin<NewsTags>;
  setNewsTags!: Sequelize.HasManySetAssociationsMixin<NewsTags, NewsTagsId>;
  addNewsTag!: Sequelize.HasManyAddAssociationMixin<NewsTags, NewsTagsId>;
  addNewsTags!: Sequelize.HasManyAddAssociationsMixin<NewsTags, NewsTagsId>;
  createNewsTag!: Sequelize.HasManyCreateAssociationMixin<NewsTags>;
  removeNewsTag!: Sequelize.HasManyRemoveAssociationMixin<NewsTags, NewsTagsId>;
  removeNewsTags!: Sequelize.HasManyRemoveAssociationsMixin<NewsTags, NewsTagsId>;
  hasNewsTag!: Sequelize.HasManyHasAssociationMixin<NewsTags, NewsTagsId>;
  hasNewsTags!: Sequelize.HasManyHasAssociationsMixin<NewsTags, NewsTagsId>;
  countNewsTags!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Tags {
    Tags.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
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
    }
  }, {
    sequelize,
    tableName: 'tags',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tags_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Tags;
  }
}
