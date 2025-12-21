import { create } from "ipfs-http-client";

const client = create({
  url: process.env.IPFS_API_URL
});

export const uploadToIPFS = async (data) => {
  const result = await client.add(data);
  return result.cid.toString();
};

export const downloadFromIPFS = async (cid) => {
  const chunks = [];
  for await (const chunk of client.cat(cid)) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};
