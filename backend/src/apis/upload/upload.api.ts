import { randomUUID } from "crypto"
import { extname, join } from "path"
import { Controller, FormField, Path, Post, Route, Security, Tags, UploadedFile, UploadedFiles } from "tsoa"
import { FileService, removeFile, saveFile } from "../../services/file.service"
import { ImageType } from "../../dtos/common"

@Route('upload')
@Tags('upload')
@Security("")
export class UploadController extends Controller {
  @Post()
  public async uploadFile(
    @UploadedFile('image') image: Express.Multer.File,
    @FormField() type: ImageType,
    @FormField() oldUrl?: string
  ): Promise<string> {
    const fileName = randomUUID() + extname(image.originalname)
    const url = new FileService().getFileUrl(fileName, type)
    const assetDir = (global as any).assetDir
    const raoVatDir = new FileService().getDirectory(assetDir, type)
    saveFile(raoVatDir, fileName, image.buffer)

    if (oldUrl) {
      const oldImagePath = join(assetDir, oldUrl)
      removeFile(oldImagePath)
    }
    return decodeURI(url)
  }

  @Post("{type}")
  public async uploadFiles(
    @Path() type: ImageType,
    @UploadedFiles('images') images: Express.Multer.File[],
  ): Promise<string[]> {
    const urlList: string[] = [];
    images.forEach(x => urlList.push(this.saveFileFromRequest(x, type)));
    return urlList.map(x => decodeURI(x));
  }

  private saveFileFromRequest(image: Express.Multer.File, type: ImageType): string {
    const fileName = randomUUID() + extname(image.originalname)
    const url = new FileService().getFileUrl(fileName, type)
    const assetDir = (global as any).assetDir
    const raoVatDir = new FileService().getDirectory(assetDir, type)
    saveFile(raoVatDir, fileName, image.buffer)
    return url;
  }
}
