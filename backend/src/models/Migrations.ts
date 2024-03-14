import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MigrationsAttributes {
  id: number;
  name: string;
  hash: string;
  executedAt?: Date;
}

export type MigrationsPk = "id";
export type MigrationsId = Migrations[MigrationsPk];
export type MigrationsOptionalAttributes = "id" | "executedAt";
export type MigrationsCreationAttributes = Optional<MigrationsAttributes, MigrationsOptionalAttributes>;

export class Migrations extends Model<MigrationsAttributes, MigrationsCreationAttributes> implements MigrationsAttributes {
  id!: number;
  name!: string;
  hash!: string;
  executedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Migrations {
    Migrations.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "migrations_name_key"
    },
    hash: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    executedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'executed_at'
    }
  }, {
    sequelize,
    tableName: 'migrations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "migrations_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "migrations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Migrations;
  }
}
