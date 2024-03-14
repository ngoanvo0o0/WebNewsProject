import { FindOptions } from "sequelize/types";
import { Users } from "../models/Users";

export async function getUser(condition: FindOptions<Users>): Promise<Users | null> {
  return await Users.findOne(condition);
}

export async function getUserByEmail(email: string): Promise<Users | null> {
  return await Users.findOne({ where: { email } });
}

export async function createUser(user: Users): Promise<Users> {
  return await Users.create(user);
}
