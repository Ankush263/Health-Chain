import ethers from "@nomiclabs/hardhat-ethers"
const hre = require("hardhat")

async function main() {

  const Healthcare = await hre.ethers.getContractFactory("Healthcare");
  const healthcare = await Healthcare.deploy();

  await healthcare.deployed();

  console.log(`Healthcare deployed to ${healthcare.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0x2a2D6a534Fab584A10A1d09BAeCF81E0977bC124