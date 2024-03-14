import { Algorithm, SignOptions, sign, verify } from "jsonwebtoken";

const env = process.env;
const jwtOptions: SignOptions = {
  expiresIn: env.TOKEN_LIFETIME,
  algorithm: (env.TOKEN_ALGORITHM as Algorithm) || "HS256",
  issuer: env.TOKEN_ISSUER,
  audience: env.TOKEN_AUDIENCE,
};

const refreshTokenOptions: SignOptions = {
  expiresIn: env.REFRESH_TOKEN_LIFETIME,
  algorithm: (env.TOKEN_ALGORITHM as Algorithm) || "HS256",
  issuer: env.TOKEN_ISSUER,
  audience: env.TOKEN_AUDIENCE,
};

export function generateToken(payload: string | object | Buffer): string {
  const secret = process.env.TOKEN_SECRET || "";
  return sign(payload, secret, jwtOptions);
}

export function generateRefreshToken(
  payload: string | object | Buffer
): string {
  const secret = process.env.REFRESH_TOKEN_SECRET || "";
  return sign(payload, secret, refreshTokenOptions);
}

export function verifyToken(token: string) {
  const secret = process.env.TOKEN_SECRET || "";
  return verify(token, secret, jwtOptions);
}

export function verifyRefreshToken(token: string) {
  const secret = process.env.REFRESH_TOKEN_SECRET || "";
  return verify(token, secret, refreshTokenOptions);
}
