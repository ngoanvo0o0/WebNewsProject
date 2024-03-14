import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { RolePermissions, RolePermissionsId } from './RolePermissions';

export interface PermissionsAttributes {
  id: string;
  name?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PermissionsPk = "id";
export type PermissionsId = Permissions[PermissionsPk];
export type PermissionsOptionalAttributes = "id" | "name" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type PermissionsCreationAttributes = Optional<PermissionsAttributes, PermissionsOptionalAttributes>;

export class Permissions extends Model<PermissionsAttributes, PermissionsCreationAttributes> implements PermissionsAttributes {
  id!: string;
  name?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Permissions hasMany RolePermissions via permissionId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Permissions {
    Permissions.init({
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
    tableName: 'permissions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "permissions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Permissions;
  }
}
