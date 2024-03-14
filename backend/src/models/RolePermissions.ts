import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Permissions, PermissionsId } from './Permissions';
import type { Roles, RolesId } from './Roles';

export interface RolePermissionsAttributes {
  id: string;
  roleId?: string;
  permissionId?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type RolePermissionsPk = "id";
export type RolePermissionsId = RolePermissions[RolePermissionsPk];
export type RolePermissionsOptionalAttributes = "id" | "roleId" | "permissionId" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type RolePermissionsCreationAttributes = Optional<RolePermissionsAttributes, RolePermissionsOptionalAttributes>;

export class RolePermissions extends Model<RolePermissionsAttributes, RolePermissionsCreationAttributes> implements RolePermissionsAttributes {
  id!: string;
  roleId?: string;
  permissionId?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // RolePermissions belongsTo Permissions via permissionId
  permission!: Permissions;
  getPermission!: Sequelize.BelongsToGetAssociationMixin<Permissions>;
  setPermission!: Sequelize.BelongsToSetAssociationMixin<Permissions, PermissionsId>;
  createPermission!: Sequelize.BelongsToCreateAssociationMixin<Permissions>;
  // RolePermissions belongsTo Roles via roleId
  role!: Roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<Roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<Roles, RolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<Roles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof RolePermissions {
    RolePermissions.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'id'
      },
      field: 'role_id'
    },
    permissionId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'permissions',
        key: 'id'
      },
      field: 'permission_id'
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
    tableName: 'role_permissions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "role_permissions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return RolePermissions;
  }
}
