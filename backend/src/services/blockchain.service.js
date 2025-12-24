import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC);

const wallet = new ethers.Wallet(
  process.env.BLOCKCHAIN_PRIVATE_KEY,
  provider
);

const abi = [
  "function registerFile(string manifestCID)",
];

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  wallet
);

export const registerFileOnChain = async (manifestCID) => {
  const tx = await contract.registerFile(manifestCID);
  await tx.wait();

  console.log("📦 Manifest registered on blockchain:", manifestCID);
};
