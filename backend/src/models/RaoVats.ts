import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Categories, CategoriesId } from './Categories';
import type { Comments, CommentsId } from './Comments';

export interface RaoVatsAttributes {
  id: string;
  title?: string;
  content?: string;
  imageurl?: string;
  categoryId?: string;
  publishDate?: Date;
  slug?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  facebook?: string;
  phoneNumber?: string;
  contactName?: string;
  metaKeyword?: string;
  view?: string;
  extraImages?: string[];
  websiteUrl?: string;
  email?: string;
  address?: string;
  description?: string;
  status?: "draft" | "publish";
  customId?: number;
}

export type RaoVatsPk = "id";
export type RaoVatsId = RaoVats[RaoVatsPk];
export type RaoVatsOptionalAttributes = "id" | "title" | "content" | "imageurl" | "categoryId" | "publishDate" | "slug" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt" | "facebook" | "phoneNumber" | "contactName" | "metaKeyword" | "view" | "extraImages" | "websiteUrl" | "email" | "address" | "description" | "status" | "customId";
export type RaoVatsCreationAttributes = Optional<RaoVatsAttributes, RaoVatsOptionalAttributes>;

export class RaoVats extends Model<RaoVatsAttributes, RaoVatsCreationAttributes> implements RaoVatsAttributes {
  id!: string;
  title?: string;
  content?: string;
  imageurl?: string;
  categoryId?: string;
  publishDate?: Date;
  slug?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  facebook?: string;
  phoneNumber?: string;
  contactName?: string;
  metaKeyword?: string;
  view?: string;
  extraImages?: string[];
  websiteUrl?: string;
  email?: string;
  address?: string;
  description?: string;
  status?: "draft" | "publish";
  customId?: number;

  // RaoVats belongsTo Categories via categoryId
  category!: Categories;
  getCategory!: Sequelize.BelongsToGetAssociationMixin<Categories>;
  setCategory!: Sequelize.BelongsToSetAssociationMixin<Categories, CategoriesId>;
  createCategory!: Sequelize.BelongsToCreateAssociationMixin<Categories>;
  // RaoVats hasMany Comments via raoVatId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof RaoVats {
    RaoVats.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageurl: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      },
      field: 'category_id'
    },
    publishDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'publish_date'
    },
    slug: {
      type: DataTypes.STRING(255),
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
    facebook: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'phone_number'
    },
    contactName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'contact_name'
    },
    metaKeyword: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'meta_keyword'
    },
    view: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    extraImages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      field: 'extra_images'
    },
    websiteUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'website_url'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("draft","publish"),
      allowNull: true
    },
    customId: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'custom_id'
    }
  }, {
    sequelize,
    tableName: 'rao_vats',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "rao_vats_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return RaoVats;
  }
}
