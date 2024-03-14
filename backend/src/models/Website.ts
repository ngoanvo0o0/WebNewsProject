import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface WebsiteAttributes {
  id: string;
  logo?: string;
  footerContent?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  googleUrl?: string;
  linkedinUrl?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type WebsitePk = "id";
export type WebsiteId = Website[WebsitePk];
export type WebsiteOptionalAttributes = "id" | "logo" | "footerContent" | "facebookUrl" | "twitterUrl" | "googleUrl" | "linkedinUrl" | "isDeleted" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type WebsiteCreationAttributes = Optional<WebsiteAttributes, WebsiteOptionalAttributes>;

export class Website extends Model<WebsiteAttributes, WebsiteCreationAttributes> implements WebsiteAttributes {
  id!: string;
  logo?: string;
  footerContent?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  googleUrl?: string;
  linkedinUrl?: string;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Website {
    Website.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    footerContent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'footer_content'
    },
    facebookUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'facebook_url'
    },
    twitterUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'twitter_url'
    },
    googleUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'google_url'
    },
    linkedinUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'linkedin_url'
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
    tableName: 'website',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "website_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Website;
  }
}
