import axios from "axios";
import * as dotenv from "dotenv";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Ens } from "web3-eth-ens";
import { provider } from "web3-core";
import { format, formatDistanceToNowStrict } from "date-fns";
import { dec2bin } from "./utils";
dotenv.config();
export default class JuiceboxReader {
  w3: Web3;
  ns: Ens;
  fundingCycles: Contract;
  prices: Contract;
  projects: Contract;
  terminal: Contract;

  constructor() {
    const provider: provider = new Web3.providers.HttpProvider(
      process.env.INFURA_URL
    );
    this.w3 = new Web3(provider);
    this.ns = this.w3.eth.ens;
    const Contract = this.w3.eth.Contract;

    this.fundingCycles = new Contract(
      require("./contracts/FundingCycles.abi.json"),
      "0xf507B2A1dD7439201eb07F11E1d62AfB29216e2E"
    );

    this.prices = new Contract(
      require("./contracts/Prices.abi.json"),
      "0xa9537Cc42555564206D4E57c0eb6943d56E83A30"
    );

    this.projects = new Contract(
      require("./contracts/Projects.abi.json"),
      "0x9b5a4053FfBB11cA9cd858AAEE43cc95ab435418"
    );

    this.terminal = new Contract(
      require("./contracts/TerminalV1.abi.json"),
      "0xd569D3CCE55b71a8a3f3C418c329A66e5f714431"
    );
  }

  //#region TerminalV1 methods
  async getBalance(projectId: number): Promise<string> {
    let value = await this.terminal.methods.balanceOf(projectId).call();
    return this.w3.utils.fromWei(value.toString(), "ether");
  }

  async getOverflow(projectId: number): Promise<string> {
    let value = await this.terminal.methods.currentOverflowOf(projectId).call();
    return this.w3.utils.fromWei(value.toString(), "ether");
  }

  getLatestBlock(): Promise<number> {
    return this.w3.eth.getBlockNumber();
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
    let contract_uri = await this.projects.methods.uriOf(projectId).call();
    const {
      data: { logoUri: uri },
    } = await axios.get(`https://ipfs.io/ipfs/${contract_uri}`);
    return uri;
  }

  async getDaoName(projectId: number): Promise<string> {
    let raw = await this.projects.methods.handleOf(projectId).call();
    return this.w3.utils.hexToAscii(raw);
  }

  async getCount(): Promise<string> {
    let count = await this.projects.methods.count().call();
    return count;
  }
  //#endregion Projects methods

  //#region FundingCycle methods
  async getRawCurrentCycle(projectId: number): Promise<any> {
    //TODO: Create specific FundingCycle type to promise
    let funding_cyle = await this.fundingCycles.methods
      .currentOf(projectId)
      .call();
    return funding_cyle;
  }

  async getRawNextCycle(projectId: number): Promise<any> {
    //TODO: Create specific FundingCycle type to promise
    return await this.fundingCycles.methods.queuedOf(projectId).call();
  }

  async getCycleReserved(projectId: number): Promise<number> {
    const { metadata } = await this.fundingCycles.methods
      .currentOf(projectId)
      .call();
    return parseInt(dec2bin(metadata).slice(-16, -9), 2);
  }

  async getCycleBonding(projectId: number): Promise<number> {
    const { metadata } = await this.fundingCycles.methods
      .currentOf(projectId)
      .call();
    return parseInt(dec2bin(metadata).slice(-23, -17), 2);
  }

  async getCycleTarget(projectId: number): Promise<string> {
    const { target } = await this.getRawCurrentCycle(projectId);
    return this.w3.utils.fromWei(target.toString(), "ether");
  }

  async getCycleDiscount(projectId: number): Promise<number> {
    const { discountRate } = await this.getRawCurrentCycle(projectId);
    return discountRate;
  }

  async getCycleTapped(projectId: number): Promise<string> {
    const { tapped } = await this.getRawCurrentCycle(projectId);
    return this.w3.utils.fromWei(tapped, "ether");
  }

  async getCycleStart(projectId: number): Promise<string> {
    const { start } = await this.getRawCurrentCycle(projectId);
    return format(<number>start * 1000, "yyyy-MM-dd'T'HH:mm");
  }

  async getCycleEnd(projectId: number): Promise<string> {
    const { start } = await this.getRawNextCycle(projectId);
    return format(<number>start * 1000, "yyyy-MM-dd'T'HH:mm");
  }

  async getTimeLeft(projectId: number): Promise<string> {
    const { start } = await this.getRawNextCycle(projectId);
    return formatDistanceToNowStrict(<number>start * 1000, {
      addSuffix: true,
      roundingMethod: "floor",
    });
  }

  //#region Event listener
  async getNewEvents(
    projectId: number,
    lastBlockAlerted: number
  ): Promise<Object> {
    const startBlock = lastBlockAlerted + 1;
    const latestBlock = await this.getLatestBlock();

    const pastTaps = await this.fundingCycles.getPastEvents("Tap", {
      filter: { projectId: projectId },
      fromBlock: startBlock,
      toBlock: latestBlock,
    });
    const pastRedeems = await this.terminal.getPastEvents("Redeem", {
      filter: { projectId: projectId },
      fromBlock: startBlock,
      toBlock: latestBlock,
    });
    const pastPays = await this.terminal.getPastEvents("Pay", {
      filter: { projectId: projectId },
      fromBlock: startBlock,
      toBlock: latestBlock,
    });

    return {
      pastTaps: pastTaps,
      pastRedeems: pastRedeems,
      pastPays: pastPays,
      latestBlock: latestBlock,
    };
  }
  ////#endregion Event listener
}
