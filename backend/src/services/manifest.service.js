export const createManifest = (fileName, salt, chunks) => {
    return {
      fileName,
      createdAt: new Date().toISOString(),
      crypto: {
        kdf: "PBKDF2",
        hash: "SHA-256",
        iterations: 100000
      },
      salt: salt.toString("hex"),
      chunks
    };
  };
  