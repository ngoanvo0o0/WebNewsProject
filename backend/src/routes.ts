/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminConsoleController } from './apis/admin-console/admin-console.api';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdvertisementController } from './apis/advertisement/advertisement.api';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthenticationController } from './apis/authentication/authentication.api';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestingController } from './apis/testing/testing.api';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UploadController } from './apis/upload/upload.api';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WebsiteApi } from './apis/website/website.api';
import { expressAuthentication } from './middlewares/auth';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler, Router } from 'express';
const multer = require('multer');
const upload = multer({"limits":{"fileSize":5242880}});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "bio": {"dataType":"string"},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}]},
            "createdAt": {"dataType":"string"},
            "hashedPassword": {"dataType":"string"},
            "roleId": {"dataType":"string"},
            "permissions": {"dataType":"array","array":{"dataType":"string"}},
            "phoneNumber": {"dataType":"string"},
            "userNameUpdated": {"dataType":"string"},
            "googleId": {"dataType":"string"},
            "facebookId": {"dataType":"string"},
            "updatedAt": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUsersResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"UserDto"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUsersByIdResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"ref":"UserDto","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpsertUserResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string"},
            "email": {"dataType":"string"},
            "phoneNumber": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpsertUserRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "fullName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}]},
            "roleId": {"dataType":"string"},
            "password": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SelectOption": {
        "dataType": "refObject",
        "properties": {
            "value": {"dataType":"string","required":true},
            "label": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SelectOptionResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"SelectOption"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "categoryParentId": {"dataType":"string"},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}],"required":true},
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["news"]},{"dataType":"enum","enums":["raovat"]},{"dataType":"enum","enums":["menu"]}],"required":true},
            "styleShow": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["news1"]},{"dataType":"enum","enums":["news2"]},{"dataType":"enum","enums":["news3"]}]},
            "createdAt": {"dataType":"string"},
            "slug": {"dataType":"string"},
            "parentCategory": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"id":{"dataType":"string"}}},
            "userNameUpdated": {"dataType":"string"},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"datetime"}]},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetCategoriesResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"CategoryDto"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryQuery": {
        "dataType": "refObject",
        "properties": {
            "slug": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetCategoryByIdResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"ref":"CategoryDto","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpsertCategoryResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "categoryParentId": {"dataType":"string"},
            "categoryParentName": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryStatusEnum": {
        "dataType": "refEnum",
        "enums": ["active","inactive"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryTypeEnum": {
        "dataType": "refEnum",
        "enums": ["news","raovat","menu"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryTypeShowEnum": {
        "dataType": "refEnum",
        "enums": ["news1","news2","news3"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpsertCategoryRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "name": {"dataType":"string","required":true},
            "categoryParentId": {"dataType":"string"},
            "status": {"ref":"CategoryStatusEnum","required":true},
            "type": {"ref":"CategoryTypeEnum","required":true},
            "styleShow": {"dataType":"union","subSchemas":[{"ref":"CategoryTypeShowEnum"},{"dataType":"string"}]},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_NewsDto.Exclude_keyofNewsDto.content-or-updateAt-or-updatedBy-or-createdAt-or-createdBy__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"},"title":{"dataType":"string"},"description":{"dataType":"string"},"publishDate":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"userId":{"dataType":"string"},"categoryId":{"dataType":"string"},"categoryName":{"dataType":"string"},"categoryStyle":{"dataType":"string"},"parentCategoryId":{"dataType":"string"},"parentCategoryName":{"dataType":"string"},"imageUrl":{"dataType":"string"},"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["draft"]},{"dataType":"enum","enums":["publish"]}]},"slug":{"dataType":"string"},"updatedAt":{"dataType":"datetime"},"tagIds":{"dataType":"array","array":{"dataType":"string"}},"isHotNews":{"dataType":"boolean"},"author":{"dataType":"string"},"userNameUpdated":{"dataType":"string"},"metaKeyword":{"dataType":"string"},"view":{"dataType":"string"},"index":{"dataType":"double"},"createdDate":{"dataType":"datetime"},"isPublish":{"dataType":"boolean"},"customId":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_NewsDto.content-or-updateAt-or-updatedBy-or-createdAt-or-createdBy_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_NewsDto.Exclude_keyofNewsDto.content-or-updateAt-or-updatedBy-or-createdAt-or-createdBy__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PagedNewsItemDto": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_NewsDto.content-or-updateAt-or-updatedBy-or-createdAt-or-createdBy_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PagedList_PagedNewsItemDto_": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refAlias","ref":"PagedNewsItemDto"},"required":true},
            "totalCount": {"dataType":"double","required":true},
            "page": {"dataType":"double","required":true},
            "size": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewStatus": {
        "dataType": "refEnum",
        "enums": ["draft","publish"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginationQuery": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double","default":1},
            "size": {"dataType":"double","default":30},
            "status": {"ref":"NewStatus"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewsDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "title": {"dataType":"string"},
            "description": {"dataType":"string"},
            "content": {"dataType":"string"},
            "publishDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},
            "userId": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "categoryName": {"dataType":"string"},
            "categoryStyle": {"dataType":"string"},
            "parentCategoryId": {"dataType":"string"},
            "parentCategoryName": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["draft"]},{"dataType":"enum","enums":["publish"]}]},
            "slug": {"dataType":"string"},
            "createdBy": {"dataType":"string"},
            "updatedBy": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "tagIds": {"dataType":"array","array":{"dataType":"string"}},
            "isHotNews": {"dataType":"boolean"},
            "author": {"dataType":"string"},
            "userNameUpdated": {"dataType":"string"},
            "metaKeyword": {"dataType":"string"},
            "view": {"dataType":"string"},
            "index": {"dataType":"double"},
            "createdDate": {"dataType":"datetime"},
            "isPublish": {"dataType":"boolean"},
            "customId": {"dataType":"double"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewsResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"ref":"NewsDto","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewsRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "title": {"dataType":"string"},
            "description": {"dataType":"string"},
            "content": {"dataType":"string"},
            "publishDate": {"dataType":"datetime"},
            "userId": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["draft"]},{"dataType":"enum","enums":["publish"]}]},
            "tagIds": {"dataType":"array","array":{"dataType":"string"}},
            "isHotNews": {"dataType":"boolean"},
            "metaKeyword": {"dataType":"string"},
            "view": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RaoVatDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string"},
            "content": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "extraImages": {"dataType":"array","array":{"dataType":"string"}},
            "rawExtraImagePaths": {"dataType":"array","array":{"dataType":"string"}},
            "categoryId": {"dataType":"string"},
            "categoryName": {"dataType":"string"},
            "publishDate": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"datetime"}]},
            "createdAt": {"dataType":"string"},
            "createdBy": {"dataType":"string"},
            "updatedAt": {"dataType":"string"},
            "updatedBy": {"dataType":"string"},
            "userNameUpdated": {"dataType":"string"},
            "slug": {"dataType":"string"},
            "facebook": {"dataType":"string"},
            "phoneNumber": {"dataType":"string"},
            "contactName": {"dataType":"string"},
            "metaKeyword": {"dataType":"string"},
            "websiteUrl": {"dataType":"string"},
            "email": {"dataType":"string"},
            "address": {"dataType":"string"},
            "description": {"dataType":"string"},
            "index": {"dataType":"double"},
            "view": {"dataType":"string"},
            "status": {"dataType":"string"},
            "customId": {"dataType":"double"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetRaoVatResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"RaoVatDto"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RaoVatResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"ref":"RaoVatDto","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RaoVatRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "title": {"dataType":"string"},
            "content": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "extraImages": {"dataType":"array","array":{"dataType":"string"}},
            "categoryId": {"dataType":"string"},
            "publishDate": {"dataType":"datetime"},
            "phoneNumber": {"dataType":"string"},
            "facebook": {"dataType":"string"},
            "metaKeyword": {"dataType":"string"},
            "contactName": {"dataType":"string"},
            "websiteUrl": {"dataType":"string"},
            "email": {"dataType":"string"},
            "address": {"dataType":"string"},
            "description": {"dataType":"string"},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["publish"]},{"dataType":"enum","enums":["draft"]}]},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MenuDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "order": {"dataType":"double"},
            "name": {"dataType":"string"},
            "slug": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "categoryName": {"dataType":"string"},
            "createdAt": {"dataType":"string"},
            "createdBy": {"dataType":"string"},
            "updatedAt": {"dataType":"string"},
            "updatedBy": {"dataType":"string"},
            "userNameUpdated": {"dataType":"string"},
            "childCategories": {"dataType":"array","array":{"dataType":"refObject","ref":"CategoryDto"}},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetMenuResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"MenuDto"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MenuResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"ref":"MenuDto","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MenuRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "order": {"dataType":"double"},
            "name": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ConfigDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "key": {"dataType":"string"},
            "value": {"dataType":"string"},
            "type": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ConfigResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"ref":"ConfigDto","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ConfigRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "key": {"dataType":"string"},
            "value": {"dataType":"string"},
            "type": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebsiteDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "logo": {"dataType":"string"},
            "footerContent": {"dataType":"string"},
            "facebookUrl": {"dataType":"string"},
            "twitterUrl": {"dataType":"string"},
            "googleUrl": {"dataType":"string"},
            "linkedinUrl": {"dataType":"string"},
            "createdBy": {"dataType":"string"},
            "updatedBy": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebsiteResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"ref":"WebsiteDto","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebsiteRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "logo": {"dataType":"string"},
            "footerContent": {"dataType":"string"},
            "facebookUrl": {"dataType":"string"},
            "twitterUrl": {"dataType":"string"},
            "googleUrl": {"dataType":"string"},
            "linkedinUrl": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HistoryDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "action": {"dataType":"string","required":true},
            "userName": {"dataType":"string","required":true},
            "entityId": {"dataType":"string","required":true},
            "entityName": {"dataType":"string","required":true},
            "entityType": {"dataType":"string","required":true},
            "createdDate": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TotalCountDto": {
        "dataType": "refObject",
        "properties": {
            "totalNews": {"dataType":"double","required":true},
            "totalUsers": {"dataType":"double","required":true},
            "totalNewsActive": {"dataType":"double","required":true},
            "totalNewsInactive": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DashboardDto": {
        "dataType": "refObject",
        "properties": {
            "totalCount": {"ref":"TotalCountDto","required":true},
            "histories": {"dataType":"array","array":{"dataType":"refObject","ref":"HistoryDto"},"required":true},
            "top10OfNews": {"dataType":"array","array":{"dataType":"refAlias","ref":"PagedNewsItemDto"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DashBoardResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"ref":"DashboardDto","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ToTalNewsOfMonthDto": {
        "dataType": "refObject",
        "properties": {
            "totalNews": {"dataType":"double","required":true},
            "month": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TotalNewsOfMonthResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ToTalNewsOfMonthDto"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewsOfMemberDto": {
        "dataType": "refObject",
        "properties": {
            "month": {"dataType":"string","required":true},
            "userId": {"dataType":"string"},
            "name": {"dataType":"string"},
            "totalNews": {"dataType":"double","required":true},
            "totalViews": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetNewsOfMemberResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"NewsOfMemberDto"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewsDetailsOfMembersDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "view": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetNewsDetailsOfMembersResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"NewsDetailsOfMembersDto"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FileDto": {
        "dataType": "refObject",
        "properties": {
            "url": {"dataType":"string","required":true},
            "createdAt": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"datetime"}],"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdvertisementPosition": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["top"]},{"dataType":"enum","enums":["left"]},{"dataType":"enum","enums":["right"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdvertisementStatus": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdvertisementDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "url": {"dataType":"string","required":true},
            "order": {"dataType":"double","required":true},
            "position": {"ref":"AdvertisementPosition","required":true},
            "status": {"ref":"AdvertisementStatus","required":true},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "userId": {"dataType":"string","required":true},
            "userNameUpdated": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoleDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenDto": {
        "dataType": "refObject",
        "properties": {
            "token": {"dataType":"string","required":true},
            "refreshToken": {"dataType":"string","required":true},
            "role": {"ref":"RoleDto"},
            "userInfo": {"ref":"UserDto"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserTypeEnum": {
        "dataType": "refEnum",
        "enums": ["admin","btv","raovat","editor"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignUpRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "userType": {"ref":"UserTypeEnum","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccountCredentialsDto": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "isRememberMe": {"dataType":"boolean","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSecretTokenDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RefreshTokenRequest": {
        "dataType": "refObject",
        "properties": {
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ImageType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["rao-vat"]},{"dataType":"enum","enums":["categories"]},{"dataType":"enum","enums":["website-config"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetNewsesRequest": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double","default":1},
            "size": {"dataType":"double","default":30},
            "status": {"ref":"NewStatus"},
            "style": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["news1"]},{"dataType":"enum","enums":["news2"]},{"dataType":"enum","enums":["news3"]}]},
            "isHotNews": {"dataType":"boolean"},
            "menuSlug": {"dataType":"string"},
            "search": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_RaoVatDto.Exclude_keyofRaoVatDto.content-or-updateAt-or-updatedBy-or-createdAt-or-createdBy__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true},"title":{"dataType":"string"},"description":{"dataType":"string"},"publishDate":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"datetime"}]},"categoryId":{"dataType":"string"},"categoryName":{"dataType":"string"},"imageUrl":{"dataType":"string"},"status":{"dataType":"string"},"slug":{"dataType":"string"},"updatedAt":{"dataType":"string"},"userNameUpdated":{"dataType":"string"},"metaKeyword":{"dataType":"string"},"view":{"dataType":"string"},"index":{"dataType":"double"},"customId":{"dataType":"double"},"email":{"dataType":"string"},"phoneNumber":{"dataType":"string"},"extraImages":{"dataType":"array","array":{"dataType":"string"}},"rawExtraImagePaths":{"dataType":"array","array":{"dataType":"string"}},"facebook":{"dataType":"string"},"contactName":{"dataType":"string"},"websiteUrl":{"dataType":"string"},"address":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_RaoVatDto.content-or-updateAt-or-updatedBy-or-createdAt-or-createdBy_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_RaoVatDto.Exclude_keyofRaoVatDto.content-or-updateAt-or-updatedBy-or-createdAt-or-createdBy__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PagedRaoVatItemDto": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_RaoVatDto.content-or-updateAt-or-updatedBy-or-createdAt-or-createdBy_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PagedList_PagedRaoVatItemDto_": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refAlias","ref":"PagedRaoVatItemDto"},"required":true},
            "totalCount": {"dataType":"double","required":true},
            "page": {"dataType":"double","required":true},
            "size": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetRaoVatRequest": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double","default":1},
            "size": {"dataType":"double","default":30},
            "status": {"ref":"NewStatus"},
            "categorySlug": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetTagsResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"count":{"dataType":"double","required":true},"name":{"dataType":"string","required":true}}},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCommentRequest": {
        "dataType": "refObject",
        "properties": {
            "newsId": {"dataType":"string"},
            "raoVatId": {"dataType":"string"},
            "content": {"dataType":"string","required":true},
            "anonymousEmail": {"dataType":"string"},
            "anonymousName": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_CommentDto.Exclude_keyofCommentDto.content-or-updateAt-or-updatedBy-or-createdAt-or-createdBy__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"avatar":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_CommentDto.content-or-updateAt-or-updatedBy-or-createdAt-or-createdBy_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_CommentDto.Exclude_keyofCommentDto.content-or-updateAt-or-updatedBy-or-createdAt-or-createdBy__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PagedCommentItemDto": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_CommentDto.content-or-updateAt-or-updatedBy-or-createdAt-or-createdBy_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PagedList_PagedCommentItemDto_": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refAlias","ref":"PagedCommentItemDto"},"required":true},
            "totalCount": {"dataType":"double","required":true},
            "page": {"dataType":"double","required":true},
            "size": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetCommentsRequest": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double","default":1},
            "size": {"dataType":"double","default":30},
            "status": {"ref":"NewStatus"},
            "raoVatId": {"dataType":"string"},
            "newsId": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewsGroupedByCategoryDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "categoryParentId": {"dataType":"string"},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}],"required":true},
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["news"]},{"dataType":"enum","enums":["raovat"]},{"dataType":"enum","enums":["menu"]}],"required":true},
            "styleShow": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["news1"]},{"dataType":"enum","enums":["news2"]},{"dataType":"enum","enums":["news3"]}]},
            "createdAt": {"dataType":"string"},
            "slug": {"dataType":"string"},
            "parentCategory": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"id":{"dataType":"string"}}},
            "userNameUpdated": {"dataType":"string"},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"datetime"}]},
            "newses": {"dataType":"array","array":{"dataType":"refObject","ref":"NewsDto"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/api/admin-console/users',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getUsers)),

            function AdminConsoleController_getUsers(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getUsers.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/users/:userId',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getUsersById)),

            function AdminConsoleController_getUsersById(request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getUsersById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin-console/users',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.upsertUser)),

            function AdminConsoleController_upsertUser(request: any, response: any, next: any) {
            const args = {
                    userRequest: {"in":"body","name":"userRequest","required":true,"ref":"UpsertUserRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.upsertUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin-console/users/:userId',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.deleteUser)),

            function AdminConsoleController_deleteUser(request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.deleteUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/team',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getTeam)),

            function AdminConsoleController_getTeam(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getTeam.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/team/:userId',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getTeamById)),

            function AdminConsoleController_getTeamById(request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getTeamById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin-console/team',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.upsertTeam)),

            function AdminConsoleController_upsertTeam(request: any, response: any, next: any) {
            const args = {
                    userRequest: {"in":"body","name":"userRequest","required":true,"ref":"UpsertUserRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.upsertTeam.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin-console/team/:userId',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.deleteTeam)),

            function AdminConsoleController_deleteTeam(request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.deleteTeam.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/select/roles',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getSelectRoles)),

            function AdminConsoleController_getSelectRoles(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getSelectRoles.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/select/categories/:type',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getSelectCategories)),

            function AdminConsoleController_getSelectCategories(request: any, response: any, next: any) {
            const args = {
                    type: {"in":"path","name":"type","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getSelectCategories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/categories/parents',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getCategoriesParenst)),

            function AdminConsoleController_getCategoriesParenst(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getCategoriesParenst.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/categories',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getCategories)),

            function AdminConsoleController_getCategories(request: any, response: any, next: any) {
            const args = {
                    queries: {"in":"queries","name":"queries","ref":"CategoryQuery"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getCategories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/categories/:categoryId',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getCategoriesById)),

            function AdminConsoleController_getCategoriesById(request: any, response: any, next: any) {
            const args = {
                    categoryId: {"in":"path","name":"categoryId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getCategoriesById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin-console/categories',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.upsertCategory)),

            function AdminConsoleController_upsertCategory(request: any, response: any, next: any) {
            const args = {
                    userRequest: {"in":"body","name":"userRequest","required":true,"ref":"UpsertCategoryRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.upsertCategory.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin-console/categories/:categoryId',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.deleteCategory)),

            function AdminConsoleController_deleteCategory(request: any, response: any, next: any) {
            const args = {
                    categoryId: {"in":"path","name":"categoryId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.deleteCategory.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/news',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getNews)),

            function AdminConsoleController_getNews(request: any, response: any, next: any) {
            const args = {
                    pagination: {"in":"queries","name":"pagination","required":true,"ref":"PaginationQuery"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getNews.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/news/:slug',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getNewsBySlug)),

            function AdminConsoleController_getNewsBySlug(request: any, response: any, next: any) {
            const args = {
                    slug: {"in":"path","name":"slug","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getNewsBySlug.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin-console/news',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.upsertNews)),

            function AdminConsoleController_upsertNews(request: any, response: any, next: any) {
            const args = {
                    newsRequest: {"in":"body","name":"newsRequest","required":true,"ref":"NewsRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.upsertNews.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin-console/news/:newsId',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.deleteNews)),

            function AdminConsoleController_deleteNews(request: any, response: any, next: any) {
            const args = {
                    newsId: {"in":"path","name":"newsId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.deleteNews.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin-console/news/:newsId/change-status',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.changeStatusNews)),

            function AdminConsoleController_changeStatusNews(request: any, response: any, next: any) {
            const args = {
                    newsId: {"in":"path","name":"newsId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.changeStatusNews.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/rao-vat',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getRaoVats)),

            function AdminConsoleController_getRaoVats(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getRaoVats.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/rao-vat/:raoVatId',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getRaoVatsById)),

            function AdminConsoleController_getRaoVatsById(request: any, response: any, next: any) {
            const args = {
                    raoVatId: {"in":"path","name":"raoVatId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getRaoVatsById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin-console/rao-vat',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.upsertRaoVat)),

            function AdminConsoleController_upsertRaoVat(request: any, response: any, next: any) {
            const args = {
                    raoVatRequest: {"in":"body","name":"raoVatRequest","required":true,"ref":"RaoVatRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.upsertRaoVat.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin-console/rao-vat/:raoVatId',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.deleteRaoVat)),

            function AdminConsoleController_deleteRaoVat(request: any, response: any, next: any) {
            const args = {
                    raoVatId: {"in":"path","name":"raoVatId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.deleteRaoVat.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/select/tags',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getSelectTags)),

            function AdminConsoleController_getSelectTags(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getSelectTags.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/menus',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getMenus)),

            function AdminConsoleController_getMenus(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getMenus.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/menus/:menuId',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getMenusById)),

            function AdminConsoleController_getMenusById(request: any, response: any, next: any) {
            const args = {
                    menuId: {"in":"path","name":"menuId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getMenusById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin-console/menus',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.upsertMenu)),

            function AdminConsoleController_upsertMenu(request: any, response: any, next: any) {
            const args = {
                    menuRequest: {"in":"body","name":"menuRequest","required":true,"ref":"MenuRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.upsertMenu.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin-console/menus/:menuId',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.deleteMenu)),

            function AdminConsoleController_deleteMenu(request: any, response: any, next: any) {
            const args = {
                    menuId: {"in":"path","name":"menuId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.deleteMenu.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/configs/:key',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getConfigByKey)),

            function AdminConsoleController_getConfigByKey(request: any, response: any, next: any) {
            const args = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getConfigByKey.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin-console/configs',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.upsertConfig)),

            function AdminConsoleController_upsertConfig(request: any, response: any, next: any) {
            const args = {
                    configRequest: {"in":"body","name":"configRequest","required":true,"ref":"ConfigRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.upsertConfig.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/website',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getWebsite)),

            function AdminConsoleController_getWebsite(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getWebsite.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin-console/website',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.upsertWebsite)),

            function AdminConsoleController_upsertWebsite(request: any, response: any, next: any) {
            const args = {
                    websiteRequest: {"in":"body","name":"websiteRequest","required":true,"ref":"WebsiteRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.upsertWebsite.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/histories',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getHistories)),

            function AdminConsoleController_getHistories(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getHistories.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/dashboard',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getDashboard)),

            function AdminConsoleController_getDashboard(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getDashboard.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/reports/total-news-of-month',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getTotalNewsOfMonth)),

            function AdminConsoleController_getTotalNewsOfMonth(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getTotalNewsOfMonth.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/reports/news-of-members',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getNewsOfMembers)),

            function AdminConsoleController_getNewsOfMembers(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getNewsOfMembers.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/reports/news-details-by/:userId/months/:month',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getNewsDetailsOfMembers)),

            function AdminConsoleController_getNewsDetailsOfMembers(request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                    month: {"in":"path","name":"month","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getNewsDetailsOfMembers.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin-console/image-urls',
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.getAllImageUrl)),

            function AdminConsoleController_getAllImageUrl(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.getAllImageUrl.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin-console/remove-images',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController)),
            ...(fetchMiddlewares<RequestHandler>(AdminConsoleController.prototype.removeImages)),

            function AdminConsoleController_removeImages(request: any, response: any, next: any) {
            const args = {
                    queries: {"in":"queries","name":"queries","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"images":{"dataType":"array","array":{"dataType":"string"},"required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminConsoleController();


              const promise = controller.removeImages.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/advertisements',
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController)),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController.prototype.getAdvertisements)),

            function AdvertisementController_getAdvertisements(request: any, response: any, next: any) {
            const args = {
                    pagination: {"in":"queries","name":"pagination","required":true,"ref":"PaginationQuery"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdvertisementController();


              const promise = controller.getAdvertisements.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/advertisements/:id',
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController)),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController.prototype.getAdvertisement)),

            function AdvertisementController_getAdvertisement(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdvertisementController();


              const promise = controller.getAdvertisement.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/advertisements',
            authenticateMiddleware([{"":[]}]),
            upload.single('image'),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController)),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController.prototype.createAdvertisement)),

            function AdvertisementController_createAdvertisement(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    image: {"in":"formData","name":"image","required":true,"dataType":"file"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdvertisementController();


              const promise = controller.createAdvertisement.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/advertisements/:id',
            authenticateMiddleware([{"":[]}]),
            upload.single('image'),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController)),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController.prototype.updateAdvertisement)),

            function AdvertisementController_updateAdvertisement(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    image: {"in":"formData","name":"image","dataType":"file"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdvertisementController();


              const promise = controller.updateAdvertisement.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/advertisements/:id',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController)),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController.prototype.deleteAdvertisement)),

            function AdvertisementController_deleteAdvertisement(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdvertisementController();


              const promise = controller.deleteAdvertisement.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/sign-up',
            ...(fetchMiddlewares<RequestHandler>(AuthenticationController)),
            ...(fetchMiddlewares<RequestHandler>(AuthenticationController.prototype.signUp)),

            function AuthenticationController_signUp(request: any, response: any, next: any) {
            const args = {
                    input: {"in":"body","name":"input","required":true,"ref":"SignUpRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthenticationController();


              const promise = controller.signUp.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/sign-in',
            ...(fetchMiddlewares<RequestHandler>(AuthenticationController)),
            ...(fetchMiddlewares<RequestHandler>(AuthenticationController.prototype.signIn)),

            function AuthenticationController_signIn(request: any, response: any, next: any) {
            const args = {
                    input: {"in":"body","name":"input","required":true,"ref":"AccountCredentialsDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthenticationController();


              const promise = controller.signIn.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/sign-in-with-token',
            ...(fetchMiddlewares<RequestHandler>(AuthenticationController)),
            ...(fetchMiddlewares<RequestHandler>(AuthenticationController.prototype.signInWithToken)),

            function AuthenticationController_signInWithToken(request: any, response: any, next: any) {
            const args = {
                    input: {"in":"body","name":"input","required":true,"ref":"UserSecretTokenDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthenticationController();


              const promise = controller.signInWithToken.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/refresh',
            ...(fetchMiddlewares<RequestHandler>(AuthenticationController)),
            ...(fetchMiddlewares<RequestHandler>(AuthenticationController.prototype.refresh)),

            function AuthenticationController_refresh(request: any, response: any, next: any) {
            const args = {
                    input: {"in":"body","name":"input","required":true,"ref":"RefreshTokenRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthenticationController();


              const promise = controller.refresh.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/revoke',
            authenticateMiddleware([{"":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AuthenticationController)),
            ...(fetchMiddlewares<RequestHandler>(AuthenticationController.prototype.revoke)),

            function AuthenticationController_revoke(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthenticationController();


              const promise = controller.revoke.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/testing',
            authenticateMiddleware([{"jwt":["ADS_ADD"]}]),
            ...(fetchMiddlewares<RequestHandler>(TestingController)),
            ...(fetchMiddlewares<RequestHandler>(TestingController.prototype.testing)),

            function TestingController_testing(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TestingController();


              const promise = controller.testing.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/upload',
            authenticateMiddleware([{"":[]}]),
            upload.single('image'),
            ...(fetchMiddlewares<RequestHandler>(UploadController)),
            ...(fetchMiddlewares<RequestHandler>(UploadController.prototype.uploadFile)),

            function UploadController_uploadFile(request: any, response: any, next: any) {
            const args = {
                    image: {"in":"formData","name":"image","required":true,"dataType":"file"},
                    type: {"in":"formData","name":"type","required":true,"dataType":"string"},
                    oldUrl: {"in":"formData","name":"oldUrl","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UploadController();


              const promise = controller.uploadFile.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/upload/:type',
            authenticateMiddleware([{"":[]}]),
            upload.array('images'),
            ...(fetchMiddlewares<RequestHandler>(UploadController)),
            ...(fetchMiddlewares<RequestHandler>(UploadController.prototype.uploadFiles)),

            function UploadController_uploadFiles(request: any, response: any, next: any) {
            const args = {
                    type: {"in":"path","name":"type","required":true,"ref":"ImageType"},
                    images: {"in":"formData","name":"images","required":true,"dataType":"array","array":{"dataType":"file"}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UploadController();


              const promise = controller.uploadFiles.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/news',
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi)),
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi.prototype.getNews)),

            function WebsiteApi_getNews(request: any, response: any, next: any) {
            const args = {
                    newsesRequest: {"in":"queries","name":"newsesRequest","required":true,"ref":"GetNewsesRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebsiteApi();


              const promise = controller.getNews.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/rao-vat',
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi)),
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi.prototype.getRaoVats)),

            function WebsiteApi_getRaoVats(request: any, response: any, next: any) {
            const args = {
                    raoVatRequest: {"in":"queries","name":"raoVatRequest","required":true,"ref":"GetRaoVatRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebsiteApi();


              const promise = controller.getRaoVats.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/rao-vat/:slug',
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi)),
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi.prototype.getRaoVatBySlug)),

            function WebsiteApi_getRaoVatBySlug(request: any, response: any, next: any) {
            const args = {
                    slug: {"in":"path","name":"slug","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebsiteApi();


              const promise = controller.getRaoVatBySlug.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/categories',
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi)),
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi.prototype.getCategoriesByType)),

            function WebsiteApi_getCategoriesByType(request: any, response: any, next: any) {
            const args = {
                    type: {"in":"query","name":"type","required":true,"dataType":"union","subSchemas":[{"dataType":"enum","enums":["raovat"]},{"dataType":"enum","enums":["menu"]},{"dataType":"enum","enums":["news"]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebsiteApi();


              const promise = controller.getCategoriesByType.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/tags',
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi)),
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi.prototype.getTags)),

            function WebsiteApi_getTags(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebsiteApi();


              const promise = controller.getTags.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/comments',
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi)),
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi.prototype.addComment)),

            function WebsiteApi_addComment(request: any, response: any, next: any) {
            const args = {
                    commentRequest: {"in":"body","name":"commentRequest","required":true,"ref":"CreateCommentRequest"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebsiteApi();


              const promise = controller.addComment.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/comments',
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi)),
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi.prototype.getComments)),

            function WebsiteApi_getComments(request: any, response: any, next: any) {
            const args = {
                    getCommentRequest: {"in":"queries","name":"getCommentRequest","required":true,"ref":"GetCommentsRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebsiteApi();


              const promise = controller.getComments.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/news/grouped-by-category',
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi)),
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi.prototype.getNewsGroupedByCategory)),

            function WebsiteApi_getNewsGroupedByCategory(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebsiteApi();


              const promise = controller.getNewsGroupedByCategory.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/sitemap',
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi)),
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi.prototype.getSitemap)),

            function WebsiteApi_getSitemap(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebsiteApi();


              const promise = controller.getSitemap.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/ads',
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi)),
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi.prototype.getAds)),

            function WebsiteApi_getAds(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebsiteApi();


              const promise = controller.getAds.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/config',
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi)),
            ...(fetchMiddlewares<RequestHandler>(WebsiteApi.prototype.getLinks)),

            function WebsiteApi_getLinks(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WebsiteApi();


              const promise = controller.getLinks.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny.call(Promise, secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"ignore"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
