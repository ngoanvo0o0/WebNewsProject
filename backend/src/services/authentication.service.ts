import { compare, hash } from "bcrypt";
import {
  AccountCredentialsDto,
  AuthenticationInfo,
  SignUpRequest,
  TokenDto,
  UserSecretTokenDto,
} from "../dtos/authentication.dto";
import { CustomError } from "../errorHandler";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
} from "../helpers/token.helper";
import { RolePermissions, Permissions, Users } from "../models/init-models";
import { uuid } from "uuidv4";
import { randomBytes } from "crypto";
import { logHistory } from "./admin-console/histories.service";

const secretTokens: UserSecretTokenDto[] = [];

export async function signUp(input: SignUpRequest): Promise<TokenDto> {
  const foundUser = await Users.findOne({
    where: {
      email: input.email,
    },
  });
  if (foundUser && !foundUser.isDeleted) {
    throw new CustomError("User already exists", 400);
  }

  const hashedPassword = await hashSecret(input.password);
  // const findRole = await Roles.findOne({
  //   where: {
  //     key: input.userType,
  //   },
  // });

  // if (!findRole) {
  //   throw new CustomError("User type does not exits", 400);
  // }
  const [user] = await Users.upsert({
    id: foundUser?.id || uuid(),
    email: input.email,
    password: hashedPassword,
    name: input.name,
    isDeleted: false,
    // roleId: findRole.id,
  });

  // const findPermissions = await RolePermissions.findAll({
  //   where: {
  //     roleId: findRole.id,
  //   },
  //   include: {
  //     model: Permissions,
  //     as: "permission",
  //   },
  // });

  const authInfo: AuthenticationInfo = {
    userId: user.id,
    sub: user.email!,
    scopes: [], //findPermissions?.map((e) => e.permission.name || ""),
  };
  return {
    token: generateToken(authInfo),
    refreshToken: "",
    userInfo: user && {
      id: user.id!,
      name: user.name!,
      email: user.email!,
    },
  };
}

export async function signIn(input: AccountCredentialsDto): Promise<TokenDto> {
  const foundUser = await Users.findOne({
    where: {
      email: input.email,
      isDeleted: false,
    },
  });
  if (!foundUser) {
    throw new CustomError("Invalid Credentials", 400);
  }

  const isPasswordValid = await comparePasswords(
    input.password,
    foundUser.password!
  );
  if (!isPasswordValid) {
    throw new CustomError("Invalid Credentials", 400);
  }

  if (foundUser.roleId) {
    logHistory(foundUser.id, "login");
  }

  const userPrincipal = await getUserPrincipal(foundUser);
  const userToken = await generateUserToken(foundUser, userPrincipal);
  if (input.isRememberMe) {
    const refreshToken = generateRefreshToken(userPrincipal);
    await foundUser.update({ refreshToken });
    userToken.refreshToken = refreshToken;
  }

  return userToken;
}

export async function refreshToken(token: string) {
  try {
    const decoded = verifyRefreshToken(token);
    if (typeof decoded === "string")
      throw new CustomError("Unauthenticated", 401);

    const userInfo = decoded as AuthenticationInfo;
    const foundUser = await Users.findByPk(userInfo.userId);
    if (!foundUser) {
      throw new CustomError("Unauthenticated", 401);
    }

    if (foundUser.refreshToken !== token) {
      await foundUser.update({ refreshToken: null! });
      throw new CustomError("Unauthenticated", 401);
    }

    return await generateUserToken(foundUser);
  } catch (_) {
    throw new CustomError("Unauthenticated", 401);
  }
}

export async function revoke(userId: string) {
  const user = await Users.findByPk(userId);
  if (user) {
    await user.update({ refreshToken: null! });
  }
}

export async function signInWithToken(input: UserSecretTokenDto) {
  const secretIndex = secretTokens.findIndex((x) => x.token === input.token);
  if (secretIndex < 0) {
    throw new CustomError("Invalid Credentials", 400);
  }
  const secret = secretTokens[secretIndex];
  secretTokens.splice(secretIndex, 1);
  if (secret.id !== input.id) {
    throw new CustomError("Invalid Credentials", 400);
  }

  const foundUser = await Users.findOne({
    where: {
      id: input.id,
      isDeleted: false,
    },
  });
  if (!foundUser) {
    throw new CustomError("Invalid Credentials", 400);
  }

  if (secret.token !== input.token) {
    throw new CustomError("Invalid Credentials", 400);
  }

  return await generateUserToken(foundUser);
}

async function generateUserToken(user: Users, authInfo?: AuthenticationInfo) {
  if (!authInfo) {
    authInfo = await getUserPrincipal(user);
  }
  const role = await user.getRole();

  return {
    token: generateToken(authInfo),
    refreshToken: "",
    role: role && {
      id: role.id,
      name: role.name || "",
    },
    userInfo: user && {
      id: user.id!,
      name: user.name!,
      email: user.email!,
    },
  };
}

async function getUserPrincipal(user: Users) {
  const findPermissions = await RolePermissions.findAll({
    where: {
      roleId: user.roleId,
    },
    include: {
      model: Permissions,
      as: "permission",
    },
  });

  return {
    userId: user.id,
    sub: user.email!,
    scopes: findPermissions?.map((e) => e.permission.name || ""),
  } as AuthenticationInfo;
}

export async function generateUserSecret(userId: string) {
  const token = await generateSecretToken();
  const secret = {
    id: userId,
    token,
  };
  secretTokens.push(secret);
  return secret;
}

async function generateSecretToken() {
  const token = randomBytes(32).toString("hex");
  return await hashSecret(token);
}

export async function hashSecret(value: string): Promise<string> {
  const saltRounds = 16;
  return await hash(value, saltRounds);
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await compare(plainPassword, hashedPassword);
}
