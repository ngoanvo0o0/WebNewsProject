import { Request } from "express";
import { verifyToken } from "../helpers/token.helper";
import { CustomError } from "../errorHandler";

const HEADER_NAME = "authorization";
const TOKEN_PREFIX = "Bearer ";

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  const token = extractTokenFromHeader(request);
  if (!token) return Promise.reject(new CustomError("Unauthenticated", 401));

  try {
    const decoded = verifyToken(token);

    if (typeof decoded === "string")
      return Promise.reject(new CustomError("Unauthenticated", 401));

    if (scopes && scopes.length > 0) {
      if (scopes.every((scope) => !decoded.scopes.includes(scope))) {
        return Promise.reject(new CustomError("Unauthorized", 403));
      }
    }
    request.authInfo = decoded;

    return Promise.resolve(decoded);
  } catch (_) {
    return Promise.reject(new CustomError("Unauthenticated", 401));
  }
}

function extractTokenFromHeader(request: Request) {
  const tokenBearer = request.header(HEADER_NAME);
  if (!tokenBearer) return null;
  if (!tokenBearer.startsWith(TOKEN_PREFIX)) return null;

  return tokenBearer.substring(TOKEN_PREFIX.length);
}
