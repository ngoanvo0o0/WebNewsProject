export interface AdvertisementDto {
  id: string;
  name: string;
  imageUrl: string;
  order: number;
  position: AdvertisementPosition;
  status: AdvertisementStatus;
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
}

export interface SaveAdvertisementRequest {
  name: string;
  url: string;
  image: string | File;
  order: number;
  position: AdvertisementPosition;
  status: AdvertisementStatus;
  updatedAt?: string
  userNameUpdated?: string
}

export type AdvertisementPosition = "top" | "left" | "right";
export type AdvertisementStatus = "active" | "inactive";
