export interface WebsiteDto {
  id?: string
  logo?: string
  footerContent?: string
  facebookUrl?: string
  twitterUrl?: string
  googleUrl?: string
  linkedinUrl?: string
  createdBy?: string
  updatedBy?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface WebsiteResponse {
  data: WebsiteDto
}

export interface WebsiteRequest {
  id?: string
  logo?: string
  footerContent?: string
  facebookUrl?: string
  twitterUrl?: string
  googleUrl?: string
  linkedinUrl?: string
}
