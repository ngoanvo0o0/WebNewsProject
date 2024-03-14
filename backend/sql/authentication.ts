import axios from "axios"
import { Request } from "express"
import jwkToPem from "jwk-to-pem"
import jsonwebtoken from "jsonwebtoken"
import {
  CurrentUser,
  AuthScope,
  UserPermission,
  TokenHeader,
  PublicKeys,
  MapOfKidToPublicKey,
  Claim
} from "./dtos/auth.dto"
import { CustomError } from "./errorHandler"
import {UserInfo, EducationProvider, UserRoles, RolePermissions, Permissions, Roles} from "./models/init-models"
import { QueryTypes } from 'sequelize'
import { ConfigSequelize } from './sequelize'
import { uuid } from 'aws-sdk/clients/customerprofiles'
const region = process.env.AWS_REGION || ''
const poolId = process.env.USER_POOL_ID || ''
const cognitoIssuer = `https://cognito-idp.${region}.amazonaws.com/${poolId}`
let cacheKeys: MapOfKidToPublicKey | undefined

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  const { scope, userPermission } = getAuthScopesRequest(scopes)
  try {
    /*----- AUTHENTICATE FOR WEB & MOBILE -----*/
    if (securityName === "jwt") {
      const platform = request.headers['platform'] || ""

      if (platform === 'retool') {
        const secretKey = request.headers['secret-key'] || ""
        const userId = request.headers['user-id'] || ""
        const user = await UserInfo.findByPk(userId as uuid)
        if (!user || secretKey !== process.env.RETOOL_SECRET) {
          return Promise.reject({})
        }

        if (!user.userType || user.userType !== 'agora_admin') {
          return Promise.reject(new CustomError("Forbidden", 403))
        }
        request.currentUser = {
          sub: user.id,
          email: user.email || '',
          username: user.fullname || '',
          userType: user.userType || ''
        }
        return Promise.resolve({})
      }

      const bearerToken = request.headers["authorization"]
      const tokenSections = (bearerToken || "").split(" ")
      if (tokenSections.length < 2) {
        throw new CustomError("Invalid token", 401)
      }
      const keys = await getPublicKeys()
      const token = tokenSections[1]
      const headerJSON = jsonwebtoken.decode(token, { complete: true })
      const header = headerJSON?.header as TokenHeader
      const key = keys[header.kid]

      if (key === undefined) {
        throw new CustomError("Invalid key", 401)
      }

      const claim = jsonwebtoken.verify(token!, key.pem) as Claim
      const currentUser = { sub: claim.sub } as CurrentUser
      let allowPermissionAccess = false
      if (scopes && scopes.length > 0) {
        allowPermissionAccess = await checkPermission(currentUser.sub, scopes.map(s => s.split(':')[1]))
      }

      if ( claim.iss !== cognitoIssuer || claim.token_use !== "access") {
        throw new CustomError("Invalid claim", 401)
      }

      if (scope === AuthScope.Private || allowPermissionAccess) {
        /* Check user permission here before return current user or throw error if user doesn't have access privileges */
        const permissionActual = (userPermission as string).split(":")[1]
        const apiPermissions: string[] = permissionActual.split('-') // user_type list
        const userInfo = await UserInfo.findByPk(
          currentUser.sub,
          { include: [
              { model: EducationProvider , as: 'educationProvider', required: false }
            ]
          }
        )
        if (!userInfo || !userInfo.userType || (!apiPermissions.includes(userInfo.userType!) && !allowPermissionAccess)) { // allow user type or permission role access api
          return Promise.reject(new CustomError("Forbidden", 403))
        }
        currentUser.username = userInfo.fullname || ''
        currentUser.firstName = userInfo.firstName || ''
        currentUser.lastName = userInfo.lastName || ''
        currentUser.email = userInfo.email || ''
        currentUser.userType = userInfo.userType || ''
        currentUser.providerId = userInfo.educationProvider?.id
      }

      request.currentUser = currentUser
      return Promise.resolve({ claim })
    }

    if (securityName === "refresh") {
      const bearerToken = request.headers["authorization"]
      const tokenSections = (bearerToken || "").split(" ")
      if (tokenSections.length < 2) {
        throw new CustomError("Invalid token", 401)
      }
      const keys = await getPublicKeys()
      const token = tokenSections[1]
      const headerJSON = jsonwebtoken.decode(token, { complete: true })
      const header = headerJSON?.header as TokenHeader
      const key = keys[header.kid]

      if (key === undefined) {
        throw new CustomError("Invalid key", 401)
      }

      const claim = jsonwebtoken.decode(token!) as Claim
      const currentUser = { sub: claim.sub } as CurrentUser
      const userInfo = await UserInfo.findByPk(
        currentUser.sub
      )
      currentUser.email = userInfo?.email || ''
      request.currentUser = currentUser
      return Promise.resolve({ claim })
    }
    return Promise.resolve({})
  } catch (error) {
    if (scope === AuthScope.Private) {
      console.log("Auth middleware error:", error.message)
      return Promise.reject({})
    } else {
      return Promise.resolve({})
    }
  }
}

const getAuthScopesRequest = (scopes?: string[]) => {
  let scope = AuthScope.Private
  let userPermission: string = UserPermission.Parent
  const permissionsRequest = scopes?.filter(e => e.includes('permission')) || []
  const scopeRequest = scopes?.filter(e => e.includes('scope')) || []
  if(scopeRequest.length > 0 ){
    scope = scopeRequest[0] as AuthScope
  }

  if(permissionsRequest.length === 1){
    userPermission = permissionsRequest[0] as UserPermission
  }

  if(permissionsRequest.length >= 2) {
    const result = permissionsRequest.map(e => e.replace('permission:',''))
    userPermission = `permission:${result.join('-')}`
  }

  return {
    scope,
    userPermission
  }
}

const getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`
    const publicKeys = await axios.get<PublicKeys>(url)
    cacheKeys = publicKeys.data.keys.reduce((agg: any, current: any) => {
      const pem = jwkToPem(current)
      agg[current.kid] = { instance: current, pem }
      return agg
    }, {} as MapOfKidToPublicKey)
  }
  return cacheKeys!
}


const checkPermission = async (userId: string, permissions: string[]): Promise<boolean> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const query = 'Select * from user_roles ur ' +
                'INNER JOIN role_permissions rp ON ur.role_id = rp.role_id ' +
                'INNER JOIN permissions p ON rp.permission_id = p.id ' +
                'WHERE ur.user_id = :userId and p.name IN(:permissions)'
  const result = await ConfigSequelize.getInstance()?.sequelize?.query(query,
      { type: QueryTypes.SELECT, replacements: { userId, permissions } })

  if (result && result.length > 0) {
    return true
  }

  return false
}
