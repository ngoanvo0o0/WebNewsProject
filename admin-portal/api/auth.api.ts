import {
  AccountCredentials,
  RefreshTokenRequest,
  RegisterRequest,
  TokenDto,
} from "~/models/auth.model";
import { HttpClient } from "./http-client";

export class AuthApi extends HttpClient {
  private readonly baseUrl = "api/auth";

  async signIn(input: AccountCredentials): Promise<TokenDto> {
    return await this.call("POST", `${this.baseUrl}/sign-in`, input);
  }

  async signUp(input: RegisterRequest): Promise<TokenDto> {
    return await this.call("POST", `${this.baseUrl}/sign-up`, input);
  }

  async refreshToken(input: RefreshTokenRequest): Promise<TokenDto> {
    return await this.call("POST", `${this.baseUrl}/refresh`, input);
  }

  async revoke() {
    await this.call("POST", `${this.baseUrl}/revoke`);
  }

  async testing(): Promise<void> {
    return await this.call("POST", "api/testing");
  }
}
