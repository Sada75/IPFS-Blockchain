import pkg from "hardhat";
const { ethers } = pkg;


async function main() {
  const BlockStore = await ethers.getContractFactory("BlockStore");
  const blockStore = await BlockStore.deploy();

  await blockStore.waitForDeployment();

  console.log("BlockStore deployed to:", await blockStore.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
