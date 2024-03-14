import { PAGE_SIZE_MAX } from "../constants/app.constant";

export enum NewStatus {
  Draft = 'draft',
  Publish = 'publish'
}

export class PaginationQuery {
  page: number = 1;
  size: number = PAGE_SIZE_MAX;
  status?: NewStatus
  // order: string;
}

export class PagedList<T> {
  private hasPrevious: boolean;
  private hasNext: boolean;
  private totalPage: number;

  constructor(
    public items: T[],
    public totalCount: number,
    public page: number,
    public size: number
  ) {
    this.totalPage = Math.ceil(totalCount / size);
    this.hasPrevious = page > 1;
    this.hasNext = page < this.totalPage;
  }
}
