import crypto from "crypto";
import { chunkFile } from "../services/chunker.service.js";
import { encryptChunk } from "../services/encryption.service.js";
import { uploadToIPFS } from "../services/ipfs.service.js";
import { createManifest } from "../services/manifest.service.js";
import { registerFileOnChain } from "../services/blockchain.service.js";

export const uploadFile = async (req, res) => {
  try {
    const password = req.body.password;
    const file = req.file;

    if (!file || !password) {
      return res.status(400).json({
        error: "File and password are required"
      });
    }

    const fileBuffer = file.buffer;
    const fileName = file.originalname;

    // 🔐 Generate salt ONCE per file
    const salt = crypto.randomBytes(16);

    const chunks = chunkFile(fileBuffer);
    const manifestChunks = [];

    for (let i = 0; i < chunks.length; i++) {
      const { encryptedData, iv, authTag } = encryptChunk(
        chunks[i],
        password,
        salt
      );

      const cid = await uploadToIPFS(encryptedData);

      manifestChunks.push({
        index: i,
        cid,
        iv: iv.toString("hex"),
        authTag: authTag.toString("hex")
      });
    }

    const manifest = createManifest(fileName, salt, manifestChunks);
    const manifestCID = await uploadToIPFS(
      Buffer.from(JSON.stringify(manifest))
    );

    await registerFileOnChain(manifestCID);

    res.json({
      message: "File uploaded successfully",
      manifestCID,
      totalChunks: chunks.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};
