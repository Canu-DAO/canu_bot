import axios from "axios";
import * as dotenv from "dotenv";
import { getMainnetSdk } from "@dethcrypto/eth-sdk-client"; // yay, our SDK! It's tailored especially for our needs
import {
  FundingCycle,
  Prices,
  Projects,
  TerminalV1,
} from "@dethcrypto/eth-sdk-client/types/index"; // yay, our SDK! It's tailored especially for our needs
import { ethers, utils } from "ethers";
import { format, formatDistanceToNowStrict } from "date-fns";
import { dec2bin } from "./utils";
import { FundingCycleStructOutput } from ".dethcrypto/eth-sdk-client/esm/types/FundingCycle";
import { Logger } from "./utils/Logger";
dotenv.config();
export default class JuiceboxReader {
  sdk: {
    FundingCycle: FundingCycle;
    Prices: Prices;
    Projects: Projects;
    TerminalV1: TerminalV1;
  };
  provider: ethers.providers.BaseProvider;

  constructor() {
    this.provider = new ethers.providers.InfuraProvider(
      "homestead",
      process.env.INFURA_KEY
    );
    const defaultSigner = ethers.Wallet.createRandom().connect(this.provider);

    this.sdk = getMainnetSdk(defaultSigner);
  }

  //#region TerminalV1 methods
  async getBalance(projectId: number): Promise<string> {
    let value = await this.sdk.TerminalV1.balanceOf(projectId);
    return utils.formatEther(value.toString());
  }

  async getOverflow(projectId: number): Promise<string> {
    let value = await this.sdk.TerminalV1.currentOverflowOf(projectId);
    return utils.formatEther(value.toString());
  }

  getLatestBlock(): Promise<number> {
    return this.provider.getBlockNumber();
  }

  async getFullBalance(projectId: number): Promise<number> {
    return (
      parseFloat(await this.getBalance(projectId)) +
      parseFloat(await this.getCycleTapped(projectId))
    );
  }
  //#endregion TerminalV1 methods

  //#region Projects methods
  async getLogo(projectId: number): Promise<string> {
    let contractURI = await this.sdk.Projects.uriOf(projectId);
    const {
      data: { logoUri: ipfsURI },
    } = await axios.get(`https://ipfs.io/ipfs/${contractURI}`);
    return ipfsURI;
  }

  async getDaoName(projectId: number): Promise<string> {
    let raw = await this.sdk.Projects.handleOf(projectId);
    return utils.toUtf8String(raw);
  }

  async getCount(): Promise<string> {
    return (await this.sdk.Projects.count()).toString();
  }

  //#endregion Projects methods

  //#region FundingCycle methods
  async getRawCurrentCycle(
    projectId: number
  ): Promise<FundingCycleStructOutput> {
    return await this.sdk.FundingCycle.currentOf(projectId);
  }

  async getRawNextCycle(projectId: number): Promise<FundingCycleStructOutput> {
    return await this.sdk.FundingCycle.queuedOf(projectId);
  }

  async getCycleReserved(projectId: number): Promise<number> {
    const { metadata } = await this.sdk.FundingCycle.currentOf(projectId);
    return parseInt(dec2bin(metadata.toNumber()).slice(17, 23), 2);
  }

  async getCycleBonding(projectId: number): Promise<number> {
    const { metadata } = await this.sdk.FundingCycle.currentOf(projectId);
    return parseInt(dec2bin(metadata.toNumber()).slice(0, 7), 2);
  }

  async getCycleTarget(projectId: number): Promise<string> {
    let { target } = await this.getRawCurrentCycle(projectId);
    return utils.formatEther(target.toString());
  }

  async getCycleDiscount(projectId: number): Promise<number> {
    let { discountRate } = await this.getRawCurrentCycle(projectId);
    return discountRate.toNumber() / 10;
  }

  async getCycleTapped(projectId: number): Promise<string> {
    let { tapped } = await this.getRawCurrentCycle(projectId);
    return utils.formatEther(tapped);
  }

  async getCycleStart(projectId: number): Promise<string> {
    let { start } = await this.getRawCurrentCycle(projectId);
    return format(start.toNumber() * 1000, "yyyy-MM-dd'T'HH:mm");
  }

  async getCycleEnd(projectId: number): Promise<string> {
    let { start } = await this.getRawNextCycle(projectId);
    return format(start.toNumber() * 1000, "yyyy-MM-dd'T'HH:mm");
  }

  async getTimeLeft(projectId: number): Promise<string> {
    let { start } = await this.getRawNextCycle(projectId);
    return formatDistanceToNowStrict(start.toNumber() * 1000, {
      addSuffix: true,
      roundingMethod: "floor",
    });
  }

  //#endregion FundingCycle methods
  //   async getNewEvents(projectId: number, lastBlockAlerted: number): Promise<Object> {
  //     const startBlock = lastBlockAlerted + 1;
  //     const latestBlock = await this.getLatestBlock();

  //     const pastTaps = await this.sdk.FundingCycle.getPastEvents('Tap', {
  //         filter: { projectId: projectId },
  //         fromBlock: startBlock,
  //         toBlock: latestBlock
  //     });
  //     const pastRedeems = await this.terminal.getPastEvents('Redeem', {
  //         filter: { projectId: projectId },
  //         fromBlock: startBlock,
  //         toBlock: latestBlock
  //     });
  //     const pastPays = await this.terminal.getPastEvents('Pay', {
  //         filter: { projectId: projectId },
  //         fromBlock: startBlock,
  //         toBlock: latestBlock
  //     });

  //     return {
  //         pastTaps: pastTaps,
  //         pastRedeems: pastRedeems,
  //         pastPays: pastPays,
  //         latestBlock: latestBlock
  //     };
  // }
}
