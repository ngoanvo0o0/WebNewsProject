import { UploadType } from "~/models/common.model";
import { HttpClient } from "./http-client";

export class UploadApi extends HttpClient {
  async uploadFile(file: FormData): Promise<string> {
    return await this.call("POST", "api/upload", file)
  }

  async uploadFiles(type: UploadType,  files: FormData): Promise<string[]> {
    return await this.call("POST", `api/upload/${type}`, files)
  }
}
