import {
  Controller,
  Route,
  Tags,
  Post,
  Request,
  Security,
} from "tsoa";
import { Request as ExRequest } from "express";
import { PermissionEnum } from "../../dtos/authentication.dto";

@Route("testing")
@Tags("testing")
export class TestingController extends Controller {
  @Security("jwt", [PermissionEnum.Ads_Add])
  @Post("")
  public async testing(@Request() request: ExRequest): Promise<void> {
    const body = request.body;
  }
}
