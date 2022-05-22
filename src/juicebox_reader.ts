import axios from "axios";
import * as dotenv from "dotenv";
import { getMainnetSdk } from "@sdk-client/index"; // yay, our SDK! It's tailored especially for our needs
import {
  FundingCycle,
  // OpenSea,
  Prices,
  Projects,
  TerminalV1,
  TerminalV11,
} from "@sdk-client/types"; // yay, our SDK! It's tailored especially for our needs
import { BigNumber, BigNumberish, ethers, utils } from "ethers";
import { format, formatDistanceToNowStrict } from "date-fns";
import { dec2bin } from "./utils";
import { FundingCycleStructOutput } from "@sdk-client/esm/types/FundingCycle";
import { Logger } from "./utils/Logger";
dotenv.config();
export default class JuiceboxReader {
  sdk: {
    FundingCycle: FundingCycle;
    Prices: Prices;
    Projects: Projects;
    TerminalV1: TerminalV1;
    TerminalV1_1: TerminalV11;
    // OpenSea: OpenSea;
  };
  provider: ethers.providers.BaseProvider;

  constructor() {
    this.provider = ethers.providers.InfuraProvider.getWebSocketProvider(
      "homestead",
      process.env.INFURA_KEY
    );
    const defaultSigner = ethers.Wallet.createRandom().connect(this.provider);

    this.sdk = getMainnetSdk(defaultSigner);
  }

  //#region TerminalV1 methods
  async getBalance(projectId: BigNumberish, version: number): Promise<string> {
    let value = (version == 1) ? this.sdk.TerminalV1.balanceOf(projectId) : this.sdk.TerminalV1_1.balanceOf(projectId);    
    return utils.formatEther((await value).toString());
  }

  async getOverflow(projectId: BigNumberish, version: number): Promise<string> {
    let value = (version == 1) ? this.sdk.TerminalV1.currentOverflowOf(projectId) : this.sdk.TerminalV1_1.currentOverflowOf(projectId);
    return utils.formatEther(value.toString());
  }

  //#endregion TerminalV1 methods
  getLatestBlock(): Promise<number> {
    return this.provider.getBlockNumber();
  }

  async getFullBalance(projectId: BigNumberish, version: number): Promise<number> {
    return (
      parseFloat(await this.getBalance(projectId, version)) +
      parseFloat(await this.getCycleTapped(projectId))
    );
  }
  //#endregion TerminalV1 methods

  //#region Projects methods
  async getLogo(projectId: BigNumberish): Promise<string> {
    let contractURI = await this.sdk.Projects.uriOf(projectId);
    const {
      data: { logoUri: ipfsURI },
    } = await axios.get(`https://ipfs.io/ipfs/${contractURI}`);
    return ipfsURI;
  }

  async getDaoName(projectId: BigNumberish): Promise<string> {
    let raw = await this.sdk.Projects.handleOf(projectId);
    let clean = raw.toString().replace(/00/g, '');
    return utils.toUtf8String(clean);
  }

  async getCount(): Promise<string> {
    return (await this.sdk.Projects.count()).toString();
  }

  //#endregion Projects methods

  //#region FundingCycle methods
  async getRawCurrentCycle(
    projectId: BigNumberish
  ): Promise<FundingCycleStructOutput> {
    return await this.sdk.FundingCycle.currentOf(projectId);
  }

  async getRawNextCycle(projectId: BigNumberish): Promise<FundingCycleStructOutput> {
    return await this.sdk.FundingCycle.queuedOf(projectId);
  }

  async getCycleReserved(projectId: BigNumberish): Promise<number> {
    const { metadata } = await this.sdk.FundingCycle.currentOf(projectId);
    return parseInt(dec2bin(metadata.toNumber()).slice(17, 23), 2);
  }

  async getCycleBonding(projectId: BigNumberish): Promise<number> {
    const { metadata } = await this.sdk.FundingCycle.currentOf(projectId);
    return parseInt(dec2bin(metadata.toNumber()).slice(0, 7), 2);
  }

  async getCycleTarget(projectId: BigNumberish): Promise<string> {
    let { target } = await this.getRawCurrentCycle(projectId);
    return utils.formatEther(target.toString());
  }

  async getCycleDiscount(projectId: BigNumberish): Promise<number> {
    let { discountRate } = await this.getRawCurrentCycle(projectId);
    return discountRate.toNumber() / 10;
  }

  async getCycleTapped(projectId: BigNumberish): Promise<string> {
    let { tapped } = await this.getRawCurrentCycle(projectId);
    return utils.formatEther(tapped);
  }

  async getCycleStart(projectId: BigNumberish): Promise<string> {
    let { start } = await this.getRawCurrentCycle(projectId);
    return format(start.toNumber() * 1000, "yyyy-MM-dd'T'HH:mm");
  }

  async getCycleEnd(projectId: BigNumberish): Promise<string> {
    let { start } = await this.getRawNextCycle(projectId);
    return format(start.toNumber() * 1000, "yyyy-MM-dd'T'HH:mm");
  }

  async getTimeLeft(projectId: BigNumberish): Promise<string> {
    let { start } = await this.getRawNextCycle(projectId);
    return formatDistanceToNowStrict(start.toNumber() * 1000, {
      addSuffix: true,
      roundingMethod: "floor",
    });
  }

  //#endregion FundingCycle methods
  //   async getNewEvents(projectId: BigNumberish, lastBlockAlerted: number): Promise<Object> {
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
