import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Menu, MenuId } from './Menu';
import type { News, NewsId } from './News';
import type { RaoVats, RaoVatsId } from './RaoVats';

export interface CategoriesAttributes {
  id: string;
  name?: string;
  parentId?: string;
  slug?: string;
  isDeleted?: boolean;
  type?: "news" | "raovat" | "menu";
  status?: "active" | "inactive";
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  styleShow?: "news1" | "news2" | "news3";
}

export type CategoriesPk = "id";
export type CategoriesId = Categories[CategoriesPk];
export type CategoriesOptionalAttributes = "id" | "name" | "parentId" | "slug" | "isDeleted" | "type" | "status" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt" | "styleShow";
export type CategoriesCreationAttributes = Optional<CategoriesAttributes, CategoriesOptionalAttributes>;

export class Categories extends Model<CategoriesAttributes, CategoriesCreationAttributes> implements CategoriesAttributes {
  id!: string;
  name?: string;
  parentId?: string;
  slug?: string;
  isDeleted?: boolean;
  type?: "news" | "raovat" | "menu";
  status?: "active" | "inactive";
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  styleShow?: "news1" | "news2" | "news3";

  // Categories belongsTo Categories via parentId
  parent!: Categories;
  getParent!: Sequelize.BelongsToGetAssociationMixin<Categories>;
  setParent!: Sequelize.BelongsToSetAssociationMixin<Categories, CategoriesId>;
  createParent!: Sequelize.BelongsToCreateAssociationMixin<Categories>;
  // Categories hasMany Menu via categoryId
  menus!: Menu[];
  getMenus!: Sequelize.HasManyGetAssociationsMixin<Menu>;
  setMenus!: Sequelize.HasManySetAssociationsMixin<Menu, MenuId>;
  addMenu!: Sequelize.HasManyAddAssociationMixin<Menu, MenuId>;
  addMenus!: Sequelize.HasManyAddAssociationsMixin<Menu, MenuId>;
  createMenu!: Sequelize.HasManyCreateAssociationMixin<Menu>;
  removeMenu!: Sequelize.HasManyRemoveAssociationMixin<Menu, MenuId>;
  removeMenus!: Sequelize.HasManyRemoveAssociationsMixin<Menu, MenuId>;
  hasMenu!: Sequelize.HasManyHasAssociationMixin<Menu, MenuId>;
  hasMenus!: Sequelize.HasManyHasAssociationsMixin<Menu, MenuId>;
  countMenus!: Sequelize.HasManyCountAssociationsMixin;
  // Categories hasMany News via categoryId
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
  // Categories hasMany RaoVats via categoryId
  raoVats!: RaoVats[];
  getRaoVats!: Sequelize.HasManyGetAssociationsMixin<RaoVats>;
  setRaoVats!: Sequelize.HasManySetAssociationsMixin<RaoVats, RaoVatsId>;
  addRaoVat!: Sequelize.HasManyAddAssociationMixin<RaoVats, RaoVatsId>;
  addRaoVats!: Sequelize.HasManyAddAssociationsMixin<RaoVats, RaoVatsId>;
  createRaoVat!: Sequelize.HasManyCreateAssociationMixin<RaoVats>;
  removeRaoVat!: Sequelize.HasManyRemoveAssociationMixin<RaoVats, RaoVatsId>;
  removeRaoVats!: Sequelize.HasManyRemoveAssociationsMixin<RaoVats, RaoVatsId>;
  hasRaoVat!: Sequelize.HasManyHasAssociationMixin<RaoVats, RaoVatsId>;
  hasRaoVats!: Sequelize.HasManyHasAssociationsMixin<RaoVats, RaoVatsId>;
  countRaoVats!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Categories {
    Categories.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      },
      field: 'parent_id'
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
    type: {
      type: DataTypes.ENUM("news","raovat","menu"),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("active","inactive"),
      allowNull: true
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
    styleShow: {
      type: DataTypes.ENUM("news1","news2","news3"),
      allowNull: true,
      field: 'style_show'
    }
  }, {
    sequelize,
    tableName: 'categories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "categories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Categories;
  }
}
