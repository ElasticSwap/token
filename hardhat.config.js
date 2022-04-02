require("@nomiclabs/hardhat-waffle");
require("hardhat-contract-sizer");
require("hardhat-gas-reporter");
require("hardhat-deploy");
require("solidity-coverage");
require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      deploy: ["deploy/local", "deploy/core", "deploy/tic", "deploy/pools"],
    },
    goerli: {
      deploy: ["deploy"],
      url: process.env.GOERLI_URL,
      accounts:
        process.env.GOERLI_PRIVATE_KEY !== undefined
          ? [process.env.GOERLI_PRIVATE_KEY]
          : [],
    },
    fuji: {
      deploy: ["deploy"],
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43113,
      accounts:
        process.env.FUJI_PRIVATE_KEY !== undefined
          ? [process.env.FUJI_PRIVATE_KEY]
          : [],
    },
    avalanche: {
      deploy: ["deploy"],
      url: "https://api.avax.network/ext/bc/C/rpc",
      gasPrice: 50000000000, // 58 nAVAX (10e9)
      chainId: 43114,
      accounts:
        process.env.AVAX_PRIVATE_KEY !== undefined
          ? [process.env.AVAX_PRIVATE_KEY]
          : [],
    },
  },
  paths: {
    deploy: ["deploy/core"],
    sources: "./src",
  },
  namedAccounts: {
    admin: {
      default: 0,
    },
    governance: {
      default: 1,
      goerli: process.env.GOERLI_GOVERNANCE_ADDRESS,
      mainnet: process.env.MAINNET_GOVERNANCE_ADDRESS,
      fuji: process.env.FUJI_GOVERNANCE_ADDRESS,
      avalanche: process.env.AVAX_GOVERNANCE_ADDRESS,
    },
    staker1: {
      default: 2,
    },
    staker2: {
      default: 3,
    },
    staker3: {
      default: 4,
    },
    feeRecipient: {
      default: 5,
    },
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
  },
};
