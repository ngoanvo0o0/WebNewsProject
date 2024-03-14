import type { Sequelize, Model } from "sequelize";
import { Ads } from "./Ads";
import type { AdsAttributes, AdsCreationAttributes } from "./Ads";
import { Categories } from "./Categories";
import type { CategoriesAttributes, CategoriesCreationAttributes } from "./Categories";
import { Comments } from "./Comments";
import type { CommentsAttributes, CommentsCreationAttributes } from "./Comments";
import { Configs } from "./Configs";
import type { ConfigsAttributes, ConfigsCreationAttributes } from "./Configs";
import { Documents } from "./Documents";
import type { DocumentsAttributes, DocumentsCreationAttributes } from "./Documents";
import { Media } from "./Media";
import type { MediaAttributes, MediaCreationAttributes } from "./Media";
import { Menu } from "./Menu";
import type { MenuAttributes, MenuCreationAttributes } from "./Menu";
import { Migrations } from "./Migrations";
import type { MigrationsAttributes, MigrationsCreationAttributes } from "./Migrations";
import { News } from "./News";
import type { NewsAttributes, NewsCreationAttributes } from "./News";
import { NewsTags } from "./NewsTags";
import type { NewsTagsAttributes, NewsTagsCreationAttributes } from "./NewsTags";
import { Permissions } from "./Permissions";
import type { PermissionsAttributes, PermissionsCreationAttributes } from "./Permissions";
import { Qas } from "./Qas";
import type { QasAttributes, QasCreationAttributes } from "./Qas";
import { RaoVats } from "./RaoVats";
import type { RaoVatsAttributes, RaoVatsCreationAttributes } from "./RaoVats";
import { RolePermissions } from "./RolePermissions";
import type { RolePermissionsAttributes, RolePermissionsCreationAttributes } from "./RolePermissions";
import { Roles } from "./Roles";
import type { RolesAttributes, RolesCreationAttributes } from "./Roles";
import { Tags } from "./Tags";
import type { TagsAttributes, TagsCreationAttributes } from "./Tags";
import { UserHistories } from "./UserHistories";
import type { UserHistoriesAttributes, UserHistoriesCreationAttributes } from "./UserHistories";
import { Users } from "./Users";
import type { UsersAttributes, UsersCreationAttributes } from "./Users";
import { Website } from "./Website";
import type { WebsiteAttributes, WebsiteCreationAttributes } from "./Website";

export {
  Ads,
  Categories,
  Comments,
  Configs,
  Documents,
  Media,
  Menu,
  Migrations,
  News,
  NewsTags,
  Permissions,
  Qas,
  RaoVats,
  RolePermissions,
  Roles,
  Tags,
  UserHistories,
  Users,
  Website,
};

export type {
  AdsAttributes,
  AdsCreationAttributes,
  CategoriesAttributes,
  CategoriesCreationAttributes,
  CommentsAttributes,
  CommentsCreationAttributes,
  ConfigsAttributes,
  ConfigsCreationAttributes,
  DocumentsAttributes,
  DocumentsCreationAttributes,
  MediaAttributes,
  MediaCreationAttributes,
  MenuAttributes,
  MenuCreationAttributes,
  MigrationsAttributes,
  MigrationsCreationAttributes,
  NewsAttributes,
  NewsCreationAttributes,
  NewsTagsAttributes,
  NewsTagsCreationAttributes,
  PermissionsAttributes,
  PermissionsCreationAttributes,
  QasAttributes,
  QasCreationAttributes,
  RaoVatsAttributes,
  RaoVatsCreationAttributes,
  RolePermissionsAttributes,
  RolePermissionsCreationAttributes,
  RolesAttributes,
  RolesCreationAttributes,
  TagsAttributes,
  TagsCreationAttributes,
  UserHistoriesAttributes,
  UserHistoriesCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
  WebsiteAttributes,
  WebsiteCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  Ads.initModel(sequelize);
  Categories.initModel(sequelize);
  Comments.initModel(sequelize);
  Configs.initModel(sequelize);
  Documents.initModel(sequelize);
  Media.initModel(sequelize);
  Menu.initModel(sequelize);
  Migrations.initModel(sequelize);
  News.initModel(sequelize);
  NewsTags.initModel(sequelize);
  Permissions.initModel(sequelize);
  Qas.initModel(sequelize);
  RaoVats.initModel(sequelize);
  RolePermissions.initModel(sequelize);
  Roles.initModel(sequelize);
  Tags.initModel(sequelize);
  UserHistories.initModel(sequelize);
  Users.initModel(sequelize);
  Website.initModel(sequelize);

  Categories.belongsTo(Categories, { as: "parent", foreignKey: "parentId"});
  Categories.hasMany(Categories, { as: "categories", foreignKey: "parentId"});
  Menu.belongsTo(Categories, { as: "category", foreignKey: "categoryId"});
  Categories.hasMany(Menu, { as: "menus", foreignKey: "categoryId"});
  News.belongsTo(Categories, { as: "category", foreignKey: "categoryId"});
  Categories.hasMany(News, { as: "newss", foreignKey: "categoryId"});
  RaoVats.belongsTo(Categories, { as: "category", foreignKey: "categoryId"});
  Categories.hasMany(RaoVats, { as: "raoVats", foreignKey: "categoryId"});
  Comments.belongsTo(News, { as: "news", foreignKey: "newsId"});
  News.hasMany(Comments, { as: "comments", foreignKey: "newsId"});
  NewsTags.belongsTo(News, { as: "news", foreignKey: "newsId"});
  News.hasMany(NewsTags, { as: "newsTags", foreignKey: "newsId"});
  RolePermissions.belongsTo(Permissions, { as: "permission", foreignKey: "permissionId"});
  Permissions.hasMany(RolePermissions, { as: "rolePermissions", foreignKey: "permissionId"});
  Comments.belongsTo(RaoVats, { as: "raoVat", foreignKey: "raoVatId"});
  RaoVats.hasMany(Comments, { as: "comments", foreignKey: "raoVatId"});
  RolePermissions.belongsTo(Roles, { as: "role", foreignKey: "roleId"});
  Roles.hasMany(RolePermissions, { as: "rolePermissions", foreignKey: "roleId"});
  Users.belongsTo(Roles, { as: "role", foreignKey: "roleId"});
  Roles.hasMany(Users, { as: "users", foreignKey: "roleId"});
  NewsTags.belongsTo(Tags, { as: "tag", foreignKey: "tagId"});
  Tags.hasMany(NewsTags, { as: "newsTags", foreignKey: "tagId"});
  Comments.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Comments, { as: "comments", foreignKey: "userId"});
  News.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(News, { as: "newss", foreignKey: "userId"});
  Qas.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Qas, { as: "qas", foreignKey: "userId"});
  UserHistories.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(UserHistories, { as: "userHistories", foreignKey: "userId"});

  return {
    Ads: Ads,
    Categories: Categories,
    Comments: Comments,
    Configs: Configs,
    Documents: Documents,
    Media: Media,
    Menu: Menu,
    Migrations: Migrations,
    News: News,
    NewsTags: NewsTags,
    Permissions: Permissions,
    Qas: Qas,
    RaoVats: RaoVats,
    RolePermissions: RolePermissions,
    Roles: Roles,
    Tags: Tags,
    UserHistories: UserHistories,
    Users: Users,
    Website: Website,
  };
}
