import {
  TokenDto,
  SignUpRequest,
  AccountCredentialsDto,
  UserSecretTokenDto,
  RefreshTokenRequest,
  AuthenticationInfo,
} from "../../dtos/authentication.dto";
import { Body, Post, Request, Route, Security } from "tsoa";
import * as AuthenticationService from "../../services/authentication.service";
import { Request as ExRequest } from "express";

@Route("auth")
export class AuthenticationController {
  @Post("sign-up")
  public async signUp(@Body() input: SignUpRequest): Promise<TokenDto> {
    return AuthenticationService.signUp(input);
  }

  @Post("sign-in")
  public async signIn(@Body() input: AccountCredentialsDto): Promise<TokenDto> {
    return AuthenticationService.signIn(input);
  }

  @Post("sign-in-with-token")
  public async signInWithToken(@Body() input: UserSecretTokenDto) {
    return AuthenticationService.signInWithToken(input);
  }

  @Post("refresh")
  public async refresh(@Body() input: RefreshTokenRequest) {
    return await AuthenticationService.refreshToken(input.token);
  }

  @Security("")
  @Post("revoke")
  public async revoke(@Request() request: ExRequest) {
    const currentUser = (request.authInfo as AuthenticationInfo)?.userId;
    await AuthenticationService.revoke(currentUser)
  }
}
