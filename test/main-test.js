const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deployment", function () {
  it("Should return the correct token symbol", async function () {
    const contract = await ethers.getContractFactory("ERC20");
    const erc20 = await contract.deploy();
    await erc20.deployed();

    expect(await erc20.symbol()).to.equal("EPT");
  });
});
