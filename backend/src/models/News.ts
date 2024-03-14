import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Categories, CategoriesId } from './Categories';
import type { Comments, CommentsId } from './Comments';
import type { NewsTags, NewsTagsId } from './NewsTags';
import type { Users, UsersId } from './Users';

export interface NewsAttributes {
  id: string;
  title?: string;
  description?: string;
  content?: string;
  publishDate?: Date;
  userId?: string;
  categoryId?: string;
  imageurl?: string;
  status?: "draft" | "publish";
  slug?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isHotNews?: boolean;
  metaKeyword?: string;
  view?: string;
  customId?: number;
}

export type NewsPk = "id";
export type NewsId = News[NewsPk];
export type NewsOptionalAttributes = "id" | "title" | "description" | "content" | "publishDate" | "userId" | "categoryId" | "imageurl" | "status" | "slug" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt" | "isHotNews" | "metaKeyword" | "view" | "customId";
export type NewsCreationAttributes = Optional<NewsAttributes, NewsOptionalAttributes>;

export class News extends Model<NewsAttributes, NewsCreationAttributes> implements NewsAttributes {
  id!: string;
  title?: string;
  description?: string;
  content?: string;
  publishDate?: Date;
  userId?: string;
  categoryId?: string;
  imageurl?: string;
  status?: "draft" | "publish";
  slug?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isHotNews?: boolean;
  metaKeyword?: string;
  view?: string;
  customId?: number;

  // News belongsTo Categories via categoryId
  category!: Categories;
  getCategory!: Sequelize.BelongsToGetAssociationMixin<Categories>;
  setCategory!: Sequelize.BelongsToSetAssociationMixin<Categories, CategoriesId>;
  createCategory!: Sequelize.BelongsToCreateAssociationMixin<Categories>;
  // News hasMany Comments via newsId
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
  // News hasMany NewsTags via newsId
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
  // News belongsTo Users via userId
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof News {
    News.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
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
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      },
      field: 'category_id'
    },
    imageurl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("draft","publish"),
      allowNull: true
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
    isHotNews: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_hot_news'
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
    customId: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'custom_id'
    }
  }, {
    sequelize,
    tableName: 'news',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "news_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return News;
  }
}
