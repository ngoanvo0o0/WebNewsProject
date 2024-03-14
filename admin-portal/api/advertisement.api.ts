import { HttpClient } from "../../frontend/api/http-client";
import { AdvertisementDto } from "~/models/advertisement.model";

export class AdvertisementApi extends HttpClient {
  private readonly baseUrl = "api/advertisements";
  async getAdvertisements(): Promise<AdvertisementDto[]> {
    return await this.call("GET", `${this.baseUrl}`);
  }

  async getAdvertisementById(id: string): Promise<AdvertisementDto> {
    return await this.call("GET", `${this.baseUrl}/${id}`);
  }

  async createAdvertisement(data: FormData): Promise<AdvertisementDto> {
    return await this.call("POST", `${this.baseUrl}`, data);
  }

  async updateAdvertisement(
    id: string,
    data: FormData
  ): Promise<AdvertisementDto> {
    return await this.call("PUT", `${this.baseUrl}/${id}`, data);
  }

  async deleteAdvertisement(id: string): Promise<void> {
    return await this.call("DELETE", `${this.baseUrl}/${id}`);
  }
}
