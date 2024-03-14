import { floor, min } from "lodash";
import { PaginationQuery } from "../dtos/pagination.dto";
import { PAGE_SIZE_MAX } from "../constants/app.constant";

export function handlePaginationRequest(query: PaginationQuery) {
  const firstPage = 1;
  const page =
    query.page && query.page >= firstPage
      ? min([floor(query.page, firstPage)])
      : firstPage;
  const size =
    query.size && query.size >= 1
      ? min([floor(query.size), PAGE_SIZE_MAX])
      : PAGE_SIZE_MAX;
  return { page, size };
}
