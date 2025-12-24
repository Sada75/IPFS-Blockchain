import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "PASTE_DEPLOYED_ADDRESS_HERE";

async function main() {
  const [signer] = await ethers.getSigners();
  const blockStore = await ethers.getContractAt(
    "BlockStore",
    CONTRACT_ADDRESS
  );

  const tx = await blockStore.registerFile("bafyExampleCID");
  await tx.wait();

  console.log("File registered on blockchain");
}

main().catch(console.error);
