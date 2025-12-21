import crypto from "crypto";

const ALGO = "aes-256-gcm";
const KEY_LENGTH = 32;
const ITERATIONS = 100_000;
const DIGEST = "sha256";

/**
 * Derive AES key from password + salt
 */
export const deriveKey = (password, salt) => {
  return crypto.pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    DIGEST
  );
};

/**
 * Encrypt a chunk using password-derived key
 */
export const encryptChunk = (data, password, salt) => {
  const key = deriveKey(password, salt);
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(data),
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  return {
    encryptedData: encrypted,
    iv,
    authTag
  };
};

/**
 * Decrypt a chunk using password-derived key
 */
export const decryptChunk = (encrypted, password, salt, iv, authTag) => {
  const key = deriveKey(password, salt);

  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ]);
};
