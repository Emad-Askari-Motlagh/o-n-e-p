import fs from "node:fs/promises";
import path from "node:path";

const uploadResolver = {
  async readTextFile(_, { file }: { file: File }) {
    const textContent = await file.text();
    return textContent;
  },
  async saveFile(_, { file }: { file: File }) {
    try {
      const fileStream = file.stream();
      await fs.writeFile(path.join(__dirname, file.name), fileStream);
      return true;
    } catch {
      return false;
    }
  },
};
export default uploadResolver;
