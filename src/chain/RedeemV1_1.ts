import { Client } from "../Client";
import { Logger } from "../utils/Logger";
import { BotEvent } from "../types";
import JuiceboxReader from "../juicebox_reader";
import { serverData } from "../models/server_data";
import {
  Channel,
  DiscordAPIError,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import { utils } from "ethers";
import { RedeemEvent, RedeemEventFilter } from "@sdk-client/esm/types/TerminalV11";

export default class RedeemV1_1 implements BotEvent {
  JBR: JuiceboxReader;

  constructor(private client: Client) {
    this.JBR = new JuiceboxReader();
    this.client = client;
  }

  public async formatEmbed(data: RedeemEvent): Promise<MessageEmbed> {
    const {amount, returnAmount, caller, _projectId} = data.args
    let eth_value = utils.formatEther(returnAmount)

    const name = await this.JBR.getDaoName(_projectId);
    const thumb = await this.JBR.getLogo(_projectId);

    return new MessageEmbed()
      .setTitle("New Redeem")
      .setColor(`PURPLE`)
      .addFields(
        { name: "Ether Redeemed", value: `Ξ${eth_value}` },
        { name: "Amount of Tokens", value: amount},
        { name: "Redeemed by", value: caller},
        { name: "DAO", value: name}
      )
      .setThumbnail(thumb)
  }

  public async sendInChannel(message: MessageEmbed, channel: string) {
    const alerts_channel = this.client.channels.cache.get(channel);
    (alerts_channel as TextChannel).send(
      message
    );
  }

  public async run(args: any[]): Promise<void> {
    Logger.info(`Inside RedeemV1.1`);
    const data: any = args[args.length - 1];
    const _embed = await this.formatEmbed(data);

    Logger.info('trying')      
    this.sendInChannel(_embed, "874810209367908413");
    Logger.info('sent in JB')
    this.sendInChannel(_embed, "875439504096391181");
    Logger.info('sent in CTG')
    try {
      const docs = await serverData.find({ project_id: parseInt(data.args.projectId) }).maxTimeMS(10000).exec();
      docs.forEach((doc) => {
        this.sendInChannel(_embed, doc.alerts_channel.toString());
      });
    } catch (err) { 
      Logger.error(err);
    } finally {
      Logger.info(`RedeemV1.1: ${data.projectId}`);
    }
  }
}