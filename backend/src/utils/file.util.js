import fs from "fs-extra";

export const saveTempFile = async (path, data) => {
  await fs.outputFile(path, data);
};
