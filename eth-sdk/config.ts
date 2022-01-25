import { defineConfig } from "@dethcrypto/eth-sdk";
import * as dotenv from "dotenv";
dotenv.config();

console.log("PROCESS", process.env.INFURA_KEY);

export default defineConfig({
  contracts: {
    mainnet: {
      FundingCycle: "0xf507B2A1dD7439201eb07F11E1d62AfB29216e2E",
      Prices: "0xa9537Cc42555564206D4E57c0eb6943d56E83A30",
      Projects: "0x9b5a4053FfBB11cA9cd858AAEE43cc95ab435418",
      TerminalV1: "0xd569D3CCE55b71a8a3f3C418c329A66e5f714431",
      OpenSea: "0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b", // Just for test, remove it later
    },
  },
  rpc: {
    mainnet: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  },
});
