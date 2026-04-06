import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = join(__dirname, "..", "data");

const getFilePath = (fileName) => join(dataDir, fileName);

export const readCollection = async (fileName) => {
  const filePath = getFilePath(fileName);
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw);
};

export const writeCollection = async (fileName, items) => {
  const filePath = getFilePath(fileName);
  await writeFile(filePath, JSON.stringify(items, null, 2), "utf-8");
};

export const nextId = (items) =>
  items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
