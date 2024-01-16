import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "paris",
      metadata: {
        bytecodeHash: "none",
      }
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    imx: {
      url: "https://rpc.testnet.immutable.com",
      accounts: ["ecfee21a35a63e5d22e4712ce06a578377f7afefae88ce9a2df1543e5dd63ac1"],
    },
  }
};

export default config;
