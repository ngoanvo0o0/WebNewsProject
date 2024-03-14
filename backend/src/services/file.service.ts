import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { CATEGORIES_IMAGE_FOLDER, RAOVAT_IMAGE_FOLDER, WEBSITE_CONFIG_IMAGE_FOLDER, ADVERTISEMENT_IMAGE_FOLDER } from "../constants/app.constant"
import { FileDto, ImageType } from "../dtos/common";

export function removeFile(path: string): void {
  if (existsSync(path)) {
    unlinkSync(path);
  }
}

export function saveFile(
  folderPath: string,
  fileName: string,
  data: Buffer
): void {
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath, { recursive: true });
  }
  writeFileSync(join(folderPath, `/${fileName}`), data);
}

export class FileService {
  public getFileUrl (fileName: string, type: ImageType): string {
    switch (type) {
      case 'rao-vat':
        return join(RAOVAT_IMAGE_FOLDER, fileName)
      case 'categories':
        return join(CATEGORIES_IMAGE_FOLDER, fileName)
      case 'website-config':
        return join(WEBSITE_CONFIG_IMAGE_FOLDER, fileName)
      default:
        return join(fileName)
    }
  }

  public getDirectory (assetDir: any, type: ImageType): string {
    switch (type) {
      case 'rao-vat':
        return join(assetDir, RAOVAT_IMAGE_FOLDER)
      case 'categories':
        return join(assetDir, CATEGORIES_IMAGE_FOLDER)
      case 'website-config':
        return join(assetDir, WEBSITE_CONFIG_IMAGE_FOLDER)
      default:
        return join(assetDir)
    }
  }

  public getAllImageUrls (assetDir: any): {categoriesImages: FileDto[], adImages: FileDto[], raoVatImages: FileDto[]} {
    const fs = require('fs');

    const fileUrls: {categoriesImages: FileDto[], adImages: FileDto[], raoVatImages: FileDto[]} = {
      categoriesImages: [],
      adImages: [],
      raoVatImages: []
    }
    const configIMageFolder = join(assetDir, WEBSITE_CONFIG_IMAGE_FOLDER)
    const categoriesImageFolder = join(assetDir, CATEGORIES_IMAGE_FOLDER)
    const adImageFolder = join(assetDir, ADVERTISEMENT_IMAGE_FOLDER)
    const raoVatImageFolder = join(assetDir, RAOVAT_IMAGE_FOLDER)
    // if (fs.existsSync(configIMageFolder)) {
    //   fs.readdirSync(configIMageFolder).forEach((file: any) => {
    //     fileUrls..push(`${configIMageFolder}/${file}`);
    //   });
    // }

    if (fs.existsSync(categoriesImageFolder)) {
      fs.readdirSync(categoriesImageFolder).forEach((file: any) => {
        fileUrls.categoriesImages.push({
          url: `${categoriesImageFolder}/${file}`,
          createdAt: fs.statSync(`${categoriesImageFolder}/${file}`).ctime
        });
      });
    }

    if (fs.existsSync(adImageFolder)) {
      fs.readdirSync(adImageFolder).forEach((file: any) => {
        fileUrls.categoriesImages.push({
          url: `${adImageFolder}/${file}`,
          createdAt: fs.statSync(`${adImageFolder}/${file}`).ctime
        });
      });
    }

    if (fs.existsSync(raoVatImageFolder)) {
      fs.readdirSync(raoVatImageFolder).forEach((file: any) => {
        fileUrls.categoriesImages.push({
          url: `${raoVatImageFolder}/${file}`,
          createdAt: fs.statSync(`${raoVatImageFolder}/${file}`).ctime
        });
      });
    }


    return fileUrls
  }

  public async removeImages(images: string[]): Promise<void> {
    const fs = require('fs');
    const assetDir = (global as any).assetDir
    images.map(async (link) => {
      fs.unlinkSync(join(assetDir,link));
    }) 
  }
}
