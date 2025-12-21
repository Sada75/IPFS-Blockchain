import { chunkFile } from "../services/chunker.service.js";
import { encryptChunk } from "../services/encryption.service.js";
import { uploadToIPFS } from "../services/ipfs.service.js";
import { createManifest } from "../services/manifest.service.js";
import { registerFileOnChain } from "../services/blockchain.service.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    const chunks = chunkFile(fileBuffer);

    const manifestChunks = [];

    for (let i = 0; i < chunks.length; i++) {
      const { encryptedData, iv, authTag } = encryptChunk(chunks[i]);

      const cid = await uploadToIPFS(encryptedData);

      manifestChunks.push({
        index: i,
        cid,
        iv: iv.toString("hex"),
        authTag: authTag.toString("hex")
      });
    }

    const manifest = createManifest(fileName, manifestChunks);
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
