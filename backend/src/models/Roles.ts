import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { RolePermissions, RolePermissionsId } from './RolePermissions';
import type { Users, UsersId } from './Users';

export interface RolesAttributes {
  id: string;
  name?: string;
  key?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type RolesPk = "id";
export type RolesId = Roles[RolesPk];
export type RolesOptionalAttributes = "id" | "name" | "key" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type RolesCreationAttributes = Optional<RolesAttributes, RolesOptionalAttributes>;

export class Roles extends Model<RolesAttributes, RolesCreationAttributes> implements RolesAttributes {
  id!: string;
  name?: string;
  key?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Roles hasMany RolePermissions via roleId
  rolePermissions!: RolePermissions[];
  getRolePermissions!: Sequelize.HasManyGetAssociationsMixin<RolePermissions>;
  setRolePermissions!: Sequelize.HasManySetAssociationsMixin<RolePermissions, RolePermissionsId>;
  addRolePermission!: Sequelize.HasManyAddAssociationMixin<RolePermissions, RolePermissionsId>;
  addRolePermissions!: Sequelize.HasManyAddAssociationsMixin<RolePermissions, RolePermissionsId>;
  createRolePermission!: Sequelize.HasManyCreateAssociationMixin<RolePermissions>;
  removeRolePermission!: Sequelize.HasManyRemoveAssociationMixin<RolePermissions, RolePermissionsId>;
  removeRolePermissions!: Sequelize.HasManyRemoveAssociationsMixin<RolePermissions, RolePermissionsId>;
  hasRolePermission!: Sequelize.HasManyHasAssociationMixin<RolePermissions, RolePermissionsId>;
  hasRolePermissions!: Sequelize.HasManyHasAssociationsMixin<RolePermissions, RolePermissionsId>;
  countRolePermissions!: Sequelize.HasManyCountAssociationsMixin;
  // Roles hasMany Users via roleId
  users!: Users[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<Users>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<Users, UsersId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<Users, UsersId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<Users, UsersId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<Users>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<Users, UsersId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<Users, UsersId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<Users, UsersId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<Users, UsersId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Roles {
    Roles.init({
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
    key: {
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
    }
  }, {
    sequelize,
    tableName: 'roles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "roles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Roles;
  }
}
