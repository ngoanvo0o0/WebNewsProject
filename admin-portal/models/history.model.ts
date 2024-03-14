export type HistoryAction =
  | "get"
  | "create"
  | "update"
  | "delete"
  | "login"
  | "logout";

export enum HistoryEntityType {
  RaoVat = "raovat",
  User = 'user',
  Team = 'team',
  Category = "category",
  News = "news",
  Menu = "menu",
  Configuration = "configuration",
  WebsiteContent = "website-content",
  Advertisement = "advertisement"
}

export interface HistoryDto {
  id: string;
  action: string;
  userName: string;
  entityId: string;
  entityName: string;
  entityType: HistoryEntityType;
  createdDate: Date;
}
