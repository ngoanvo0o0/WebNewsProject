import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface DocumentsAttributes {
  id: string;
  name?: string;
  url?: string;
  type?: "pdf";
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type DocumentsPk = "id";
export type DocumentsId = Documents[DocumentsPk];
export type DocumentsOptionalAttributes = "id" | "name" | "url" | "type" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type DocumentsCreationAttributes = Optional<DocumentsAttributes, DocumentsOptionalAttributes>;

export class Documents extends Model<DocumentsAttributes, DocumentsCreationAttributes> implements DocumentsAttributes {
  id!: string;
  name?: string;
  url?: string;
  type?: "pdf";
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Documents {
    Documents.init({
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
    url: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM("pdf"),
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
    tableName: 'documents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "documents_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Documents;
  }
}
