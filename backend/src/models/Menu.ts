import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Categories, CategoriesId } from './Categories';

export interface MenuAttributes {
  id: string;
  order?: number;
  name?: string;
  categoryId?: string;
  slug?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MenuPk = "id";
export type MenuId = Menu[MenuPk];
export type MenuOptionalAttributes = "id" | "order" | "name" | "categoryId" | "slug" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type MenuCreationAttributes = Optional<MenuAttributes, MenuOptionalAttributes>;

export class Menu extends Model<MenuAttributes, MenuCreationAttributes> implements MenuAttributes {
  id!: string;
  order?: number;
  name?: string;
  categoryId?: string;
  slug?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Menu belongsTo Categories via categoryId
  category!: Categories;
  getCategory!: Sequelize.BelongsToGetAssociationMixin<Categories>;
  setCategory!: Sequelize.BelongsToSetAssociationMixin<Categories, CategoriesId>;
  createCategory!: Sequelize.BelongsToCreateAssociationMixin<Categories>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Menu {
    Menu.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
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
    }
  }, {
    sequelize,
    tableName: 'menu',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "menu_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Menu;
  }
}
