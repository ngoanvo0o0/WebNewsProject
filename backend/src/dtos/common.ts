export interface SelectOption {
  value: string;
  label: string;
}

export type ImageType = "rao-vat" | "categories" | "website-config";

export interface FileDto {
  url: string
  createdAt: string | Date
}