import { join } from "path";
import {
  FOOTER_CONTENT_CONFIG,
  ICON_CONFIG,
  LOGO_CONFIG,
  LOGO_NAME,
} from "../constants/config.constant";
import { Configs } from "../models/Configs";
import { removeFile, saveFile } from "./file.service";
import { uuid } from "uuidv4";

const host = process.env.HOST || "";

export async function updateLogo(
  extension: string,
  buffer: Buffer
): Promise<string> {
  return await updateImageConfig(
    LOGO_CONFIG,
    `/${join(LOGO_NAME, extension)}`,
    buffer
  );
}

export async function updateIcon(extension: string, buffer: Buffer) {
  return await updateImageConfig(
    ICON_CONFIG,
    `${join(ICON_CONFIG, extension)}`,
    buffer
  );
}

async function updateImageConfig(
  key: string,
  fullImageName: string,
  buffer: Buffer
) {
  const assetDir = (global as any).assetDir;
  const config = await Configs.findOne({
    where: {
      key: key,
    },
  });
  if (config?.value) {
    removeFile(join(assetDir, config.value));
  }
  removeFile(join(assetDir, fullImageName));
  saveFile(assetDir, fullImageName, buffer);
  Configs.upsert({
    id: config?.id || uuid(),
    key: LOGO_CONFIG,
    value: fullImageName,
    updatedAt: new Date(),
  });

  return join(host, fullImageName);
}

export async function updateFooter(content: string) {
  const footerContent = await Configs.findOne({
    where: {
      key: FOOTER_CONTENT_CONFIG,
    },
  });
  Configs.upsert({
    id: footerContent?.id || uuid(),
    key: LOGO_CONFIG,
    value: content || "",
    updatedAt: new Date(),
  });
}
