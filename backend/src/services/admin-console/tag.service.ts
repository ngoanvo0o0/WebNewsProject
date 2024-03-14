import {GetTagsResponse, SelectOptionResponse} from "../../apis/admin-console"
import { SelectOption } from "../../dtos/common"
import { Tags } from "../../models/init-models"
import {random} from "lodash";

export class AdminConsoleTagsService {
  public async getSelectTags(): Promise<SelectOptionResponse> {
    const tags = await Tags.findAll({
      where: {
        isDeleted: false
      },
      order: [
        ['name', 'ASC']
      ]
    })

    const tagsMapped = tags.map((category) => {
      return {
        label: category.name,
        value: category.id
      } as SelectOption
    })

    return { data: tagsMapped }
  }

  public async getTags(): Promise<GetTagsResponse> {
    const tags = await Tags.findAll({
      where: {
        isDeleted: false
      }
    })

    const tagsMapped = tags.map((tag) => {
      return {
        name: tag.name!,
        count: random(1, 30)
      }
    })

    return { data: tagsMapped }
  }
}
