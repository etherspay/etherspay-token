/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.7.3",
  networks: {
    truffle: {
      url: "http://localhost:7545",
      accounts: ["458327ea710da0f65168481a6e956815eb4427019dd976b4ef0b3948f6ce8672"]
    } 
  }
};
