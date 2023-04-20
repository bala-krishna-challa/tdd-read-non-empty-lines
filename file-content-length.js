import { readFile } from "fs";
import { promisify } from "util";

export const ENCODING = "utf8";

export const countFileContentLines = async (filePath) => {
  const data = await promisify(readFile)(filePath, ENCODING);

  return data.split("\n").filter((text) => text).length;
};
