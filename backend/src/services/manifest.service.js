import crypto from "crypto";

export const createManifest = (fileName, chunks) => {
  return {
    fileName,
    createdAt: new Date().toISOString(),
    fileHash: crypto.createHash("sha256").update(fileName).digest("hex"),
    chunks
  };
};
