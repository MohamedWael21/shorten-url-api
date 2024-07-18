import { redisClient } from "..";
import { ALLOWED_SYMBOL, URL_PATH_LENGTH } from "../constant";
import AppError from "../utils/app-error";

export async function createShortUrl(url: string) {
  let uniqueSuffix = getUniqueSuffix();
  let isExist = true;
  while (isExist) {
    isExist = Boolean(await redisClient.get(uniqueSuffix));
    uniqueSuffix = getUniqueSuffix();
  }
  const shorterUrl = `${process.env.HOST}/${uniqueSuffix}`;
  await redisClient.set(shorterUrl, url);
  return shorterUrl;
}

export async function getUrl(shorterUrl: string) {
  const url = await redisClient.get(shorterUrl);

  if (!url) throw new AppError("This url not found", 404);

  return url;
}

function getUniqueSuffix() {
  let suffix = "";
  for (let i = 0; i < URL_PATH_LENGTH; i++) {
    suffix += ALLOWED_SYMBOL[Math.floor(Math.random() * ALLOWED_SYMBOL.length)];
  }
  return suffix;
}
