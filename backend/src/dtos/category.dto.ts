
export enum CategoryStatusEnum {
    Active='active',
    Inactive='inactive',
}

export enum CategoryTypeEnum {
    News='news',
    RaoVat='raovat',
    Menu='menu'
}

export enum CategoryTypeShowEnum {
    News1='news1',
    News2='news2',
    News3='news3'
}

export interface CategoryDto {
    id: string
    name: string
    categoryParentId?: string
    status: 'active' | 'inactive'
    type: 'news' | 'raovat' | 'menu'
    styleShow?: 'news1' | 'news2' | 'news3'
    createdAt?: string
    slug?: string
    parentCategory?: {
        id?: string
        name?: string
    }
    userNameUpdated?: string
    updatedAt?: string | Date
}

export interface CategoryQuery {
    slug?: string
}
