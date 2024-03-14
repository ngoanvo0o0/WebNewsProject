import { RoleDto } from "./role.dto";
import { UserDto } from "./user.dto";

export enum UserTypeEnum {
    Admin='admin',
    BTV='btv',
    Rao_Vat='raovat',
    Editor='editor'
}

export enum PermissionEnum {
    Manage_Member_View = 'MANAGE_MEMBER_VIEW',
    Manage_Member_Add = 'MANAGE_MEMBER_ADD',
    Manage_Member_Edit = 'MANAGE_MEMBER_EDIT',
    Manage_Member_Delete = 'MANAGE_MEMBER_DELETE',
    Manage_Member_Disable = 'MANAGE_MEMBER_DISABLE',
    Manage_Member_Enable = 'MANAGE_MEMBER_ENABLE',
    Manage_User_View = 'MANAGE_USERS_VIEW',
    Manage_User_Disable = 'MANAGE_USERS_DISABLE',
    Manage_Users_Enable = 'MANAGE_USERS_ENABLE',
    Manage_Post_View = 'MANAGE_POST_VIEW',
    Manage_Post_Add = 'MANAGE_POST_ADD',
    Manage_Post_Edit = 'MANAGE_POST_EDIT',
    Manage_Post_Delete = 'MANAGE_POST_DELETE',
    Ads_view = 'ADS_VIEW',
    Ads_Add = 'ADS_ADD',
    Ads_Edit = 'ADS_EDIT',
    Ads_Delete = 'ADS_DELETE',
    Rao_Vat_View = 'RAOVAT_VIEW',
    Rao_Vat_Add = 'RAOVAT_ADD',
    Rao_Vat_Edit = 'RAOVAT_EDIT',
    Rao_Vat_Delete = 'RAOVAT_DELETE',
    QAS_View = 'QAS_VIEW',
    QAS_Add = 'QAS_ADD',
    QAS_Edit = 'QAS_EDIT',
    QAS_Delete = 'QAS_DELETE',
    Manage_Media_View = 'MANAGE_MEDIA_VIEW',
    Config_SEO_View = 'CONFIG_SEO_VIEW',
    Config_SEO_Edit = 'CONFIG_SEO_EDIT',
    Report_View = 'REPORT_VIEW',
    Report_Export = 'REPORT_EXPORT',
    History_Activity_Team = 'HISTORY_ACTIVITY_TEAM',
    Manage_Category_View = 'MANAGE_CATEGORY_VIEW',
    Manage_Category_Add = 'MANAGE_CATEGORY_ADD',
    Manage_Category_Edit = 'MANAGE_CATEGORY_EDIT',
    Manage_Category_Delete = 'MANAGE_CATEGORY_DELETE',
    Config_Menu_View = 'CONFIG_MENU_VIEW',
    Config_Menu_Add = 'CONFIG_MENU_ADD',
    Config_Menu_Edit = 'CONFIG_MENU_EDIT',
    Config_Menu_Delete = 'CONFIG_MENU_DELETE',
}

export interface SignUpRequest {
    email: string;
    password: string;
    name: string;
    userType: UserTypeEnum
}

export interface AccountCredentialsDto {
    email: string;
    password: string;
    isRememberMe: boolean;
}

export interface RefreshTokenRequest {
    token: string;
}

export interface TokenDto {
    token: string;
    refreshToken: string;
    role?: RoleDto;
    userInfo?: UserDto
}

export interface AuthenticationInfo {
    userId: string;
    sub: string;
    scopes: string[];
}

export interface UserSecretTokenDto {
    id: string;
    token: string;
}
