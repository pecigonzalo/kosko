import fs from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { File } from "./base";

const TEMPLATE_DIR = join(fileURLToPath(import.meta.url), "../../templates");

export async function generateFromTemplateFile(
  path: string,
  template = path
): Promise<File> {
  return {
    path,
    content: await fs.readFile(join(TEMPLATE_DIR, template), "utf8")
  };
}

export function generateReadme() {
  return generateFromTemplateFile("README.md");
}
