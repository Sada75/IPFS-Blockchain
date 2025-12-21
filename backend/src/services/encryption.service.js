import crypto from "crypto";

const ALGO = "aes-256-gcm";
const KEY = crypto.randomBytes(32);

export const encryptChunk = (data) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(data),
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  return { encryptedData: encrypted, iv, authTag };
};

export const decryptChunk = (encrypted, iv, authTag) => {
  const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ]);
};
