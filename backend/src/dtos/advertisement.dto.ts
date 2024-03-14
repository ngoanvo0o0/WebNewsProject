export interface AdvertisementDto {
  id: string;
  name: string;
  imageUrl: string;
  url: string;
  order: number;
  position: AdvertisementPosition;
  status: AdvertisementStatus;
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
  userNameUpdated?: string
}

export interface SaveAdvertisementDto {
  name: string;
  imageUrl?: string;
  url: string;
  order: number;
  position: AdvertisementPosition;
  status: AdvertisementStatus;
  userId: string;
}

type AdvertisementPosition = "top" | "left" | "right";
type AdvertisementStatus = "active" | "inactive";
