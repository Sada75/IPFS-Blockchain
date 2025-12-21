import { downloadFromIPFS } from "../services/ipfs.service.js";
import { decryptChunk } from "../services/encryption.service.js";

export const retrieveFile = async (req, res) => {
  try {
    const { manifestCID, password } = req.body;

    if (!manifestCID || !password) {
      return res.status(400).json({
        error: "manifestCID and password are required"
      });
    }

    const manifestRaw = await downloadFromIPFS(manifestCID);
    const manifest = JSON.parse(manifestRaw.toString());

    const salt = Buffer.from(manifest.salt, "hex");
    const buffers = [];

    for (const chunk of manifest.chunks) {
      const encryptedData = await downloadFromIPFS(chunk.cid);

      const decrypted = decryptChunk(
        encryptedData,
        password,
        salt,
        Buffer.from(chunk.iv, "hex"),
        Buffer.from(chunk.authTag, "hex")
      );

      buffers.push(decrypted);
    }

    const fileBuffer = Buffer.concat(buffers);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${manifest.fileName}"`
    );
    res.send(fileBuffer);
  } catch (err) {
    console.error(err);
    res.status(403).json({
      error: "Decryption failed (wrong password or corrupted data)"
    });
  }
};
