const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils } = require("ethers");
const { zeroAddress } = require("ethereumjs-util");

const TEST_AMOUNT = 1000;

describe("Deployment", function () {
  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    contract = await ethers.getContractFactory("ERC20");
    token = await contract.deploy();
  });

  it("Should return the correct token name, symbol, supply", async function () {
    expect(await token.name()).to.equal("etherspay");
    expect(await token.symbol()).to.equal("EPT");

    const totalSupply = await token.totalSupply();
    const totalSupplyEther = Math.floor(utils.formatEther(totalSupply));
    expect(totalSupplyEther).to.equal(21000000);
  });

  it("Should return the correct balance off contract owner when deployed", async function () {
    // Expect balance of contract owner to equal 21 million
    expect(
      Math.floor(utils.formatEther(await token.balanceOf(owner.address)))
    ).to.equal(21000000);
  });

  it("approve", async () => {
    await expect(token.approve(addr1.address, TEST_AMOUNT))
      .to.emit(token, "Approval")
      .withArgs(owner.address, addr1.address, TEST_AMOUNT);

    expect(await token.allowance(owner.address, addr1.address)).to.equal(
      TEST_AMOUNT
    );
  });

  it("transfer", async () => {
    await expect(token.transfer(addr1.address, TEST_AMOUNT))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, addr1.address, TEST_AMOUNT);
    expect(
      Math.floor(utils.formatEther(await token.balanceOf(owner.address)))
    ).to.eq(21000000);
    expect(await token.balanceOf(addr1.address)).to.eq(TEST_AMOUNT);
  });

  it("burn", async () => {
    await expect(token.burn(owner.address, TEST_AMOUNT))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, zeroAddress, TEST_AMOUNT);
  });
});
