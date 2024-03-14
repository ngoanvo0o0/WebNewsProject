import { SelectOptionResponse } from "../../apis/admin-console"
import { SelectOption } from "../../dtos/common"
import { Roles } from "../../models/init-models"

export class AdminConsoleRoleService {
  public async getSelectRoles(): Promise<SelectOptionResponse> {
    const roles = await Roles.findAll({
      where: {
        isDeleted: false
      },
      order: [
        ['name', 'ASC']
      ]
    })

    const rolesMapped = roles.map((role) => {
      return {
        label: role.name,
        value: role.id
      } as SelectOption
    })

    return { data: rolesMapped }
  }
}
