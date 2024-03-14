import { CreateUserDto, UserDto } from "../dtos/user.dto";
import { Users } from "../models/Users";

export async function addUser(input: CreateUserDto): Promise<UserDto> {
  const user = await Users.create({
    email: input.email,
    password: input.hashedPassword,
    name: input.name,
    roleId: input.roleId
  } as any);

  return {
    id: user.id,
    email: user.email!,
    name: user.name!,
    roleId: user.roleId!,
    hashedPassword: ''
  };
}
