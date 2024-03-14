import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AdsAttributes {
  id: string;
  name?: string;
  url?: string;
  order?: number;
  imageurl?: string;
  status?: "active" | "inactive";
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  position: "top" | "left" | "right" | "center" | "bottom";
}

export type AdsPk = "id";
export type AdsId = Ads[AdsPk];
export type AdsOptionalAttributes = "id" | "name" | "url" | "order" | "imageurl" | "status" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt" | "position";
export type AdsCreationAttributes = Optional<AdsAttributes, AdsOptionalAttributes>;

export class Ads extends Model<AdsAttributes, AdsCreationAttributes> implements AdsAttributes {
  id!: string;
  name?: string;
  url?: string;
  order?: number;
  imageurl?: string;
  status?: "active" | "inactive";
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  position!: "top" | "left" | "right" | "center" | "bottom";


  static initModel(sequelize: Sequelize.Sequelize): typeof Ads {
    Ads.init({
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
      type: DataTypes.TEXT,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    imageurl: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("active","inactive"),
      allowNull: true,
      defaultValue: "active"
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
    position: {
      type: DataTypes.ENUM("top","left","right","center","bottom"),
      allowNull: false,
      defaultValue: "top"
    }
  }, {
    sequelize,
    tableName: 'ads',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ads_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Ads;
  }
}
