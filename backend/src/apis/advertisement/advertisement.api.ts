import {
  AdvertisementDto,
  SaveAdvertisementDto,
} from "../../dtos/advertisement.dto";
import { PaginationQuery } from "../../dtos/pagination.dto";
import * as AdvertisementService from "../../services/advertisement.service";
import {
  Delete,
  Get,
  Path,
  Post,
  Put,
  Queries,
  Request,
  Route,
  Security,
  UploadedFile,
} from "tsoa";
import { randomUUID } from "crypto";
import { extname, join } from "path";
import { removeFile, saveFile } from "../../services/file.service";
import { ADVERTISEMENT_IMAGE_FOLDER } from "../../constants/app.constant";
import { AuthenticationInfo } from "../../dtos/authentication.dto";

@Route("advertisements")
export class AdvertisementController {
  @Get()
  public async getAdvertisements(
    @Queries() pagination: PaginationQuery
  ): Promise<AdvertisementDto[]> {
    return await AdvertisementService.getAdvertisements(pagination);
  }

  @Get("{id}")
  public async getAdvertisement(@Path() id: string): Promise<AdvertisementDto> {
    return await AdvertisementService.getAdvertisement(id);
  }

  @Post()
  @Security("")
  public async createAdvertisement(
    @Request() request: Express.Request,
    @UploadedFile("image") image: Express.Multer.File
  ): Promise<AdvertisementDto> {
    const input = (request as any).body as SaveAdvertisementDto;
    const userId = (request.authInfo as AuthenticationInfo)?.userId || "";
    const fileName = randomUUID() + extname(image.originalname);
    input.userId = userId;
    input.imageUrl = join(ADVERTISEMENT_IMAGE_FOLDER, fileName);
    const advertisement = await AdvertisementService.createAdvertisement(input);

    const assetDir = (global as any).assetDir;
    const advertisementDir = join(assetDir, ADVERTISEMENT_IMAGE_FOLDER);
    saveFile(advertisementDir, fileName, image.buffer);
    return advertisement;
  }

  @Put("{id}")
  @Security("")
  public async updateAdvertisement(
    @Path() id: string,
    @Request() request: Express.Request,
    @UploadedFile("image") image?: Express.Multer.File
  ): Promise<AdvertisementDto> {
    const input = (request as any).body as SaveAdvertisementDto;
    const userId = (request.authInfo as AuthenticationInfo)?.userId || "";
    input.userId = userId;

    const hasImage = !!image;
    let fileName = "";
    if (hasImage) {
      fileName = randomUUID() + extname(image!.originalname);
      input.imageUrl = join(ADVERTISEMENT_IMAGE_FOLDER, fileName);
    } else {
      delete input.imageUrl;
    }
    const { advertisement, oldImageUrl } =
      await AdvertisementService.updateAdvertisement(id, input);
    if (hasImage) {
      const assetDir = (global as any).assetDir;
      const advertisementDir = join(assetDir, ADVERTISEMENT_IMAGE_FOLDER);
      saveFile(advertisementDir, fileName, image!.buffer);
      if (oldImageUrl) {
        const oldImagePath = join(assetDir, oldImageUrl);
        await removeFile(oldImagePath);
      }
    }
    return advertisement;
  }

  @Delete("{id}")
  @Security("")
  public async deleteAdvertisement(
    @Path() id: string,
    @Request() request: Express.Request
  ): Promise<void> {
    const userId = (request.authInfo as AuthenticationInfo)?.userId || "";
    await AdvertisementService.deleteAdvertisement(id, userId);
  }
}
