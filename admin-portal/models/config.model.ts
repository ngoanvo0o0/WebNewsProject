export interface ConfigDto {
  id?: string
  key?: string
  value?: string
  type?: string
}

export interface ConfigResponse {
  data: ConfigDto
}

export interface ConfigRequest {
  id?: string
  key?: string
  value?: string
  type?: string
}
