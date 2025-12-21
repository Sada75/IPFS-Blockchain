import { getFileFromChain } from "../services/blockchain.service.js";
import { downloadFromIPFS } from "../services/ipfs.service.js";
import { decryptChunk } from "../services/encryption.service.js";

export const retrieveFile = async (req, res) => {
  try {
    const { manifestCID } = req.body;

    const manifestRaw = await downloadFromIPFS(manifestCID);
    const manifest = JSON.parse(manifestRaw.toString());

    const buffers = [];

    for (const chunk of manifest.chunks) {
      const encryptedData = await downloadFromIPFS(chunk.cid);

      const decrypted = decryptChunk(
        encryptedData,
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
    res.status(500).json({ error: "Retrieval failed" });
  }
};
