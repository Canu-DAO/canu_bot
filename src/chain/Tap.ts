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
import { runInThisContext } from "vm";
import { TapEvent } from "@sdk-client/esm/types/FundingCycle";

export default class Ready implements BotEvent {
  JBR: JuiceboxReader;

  constructor(private client: Client) {
    this.JBR = new JuiceboxReader();
    this.client = client;
  }
  public async formatEmbed(data: TapEvent): Promise<MessageEmbed> {
    const { amount, caller, newTappedAmount, projectId } = data.args;
    const payment = utils.formatEther(amount);
    const totalTapped = utils.formatEther(newTappedAmount);
    
    return new MessageEmbed()
      .setTitle("New Tap")
      .setColor(`PURPLE`)
      .addFields(
        { name: 'Amount Payed', value: `Ξ${payment}`},
        { name: 'Total payed this cycle', value: `Ξ${totalTapped}`},
        { name: 'Called by', value: `${caller}`},
        { name: 'DAO', value: `${(await this.JBR.getDaoName(projectId))}`})
      .setThumbnail(await this.JBR.getLogo(projectId))
  }

  public async sendInChannel(message: MessageEmbed, channel: string) {
    const alerts_channel = this.client.channels.cache.get(channel);
    (alerts_channel as TextChannel).send(
      message
    );
  }

  public async run(args: any[]): Promise<void> {
    Logger.info(`Inside Tap`);
    const data: any = args[args.length - 1];
    try {
      // const docs = await serverData.find({ project_id: project_id }).maxTimeMS(10000).exec();
      // docs.forEach((doc) => {
        this.sendInChannel(await this.formatEmbed(data), "875439504096391181"); //doc.alerts_channel.toString());
      // });
    } catch (err) { 
      Logger.error(err);
    } finally {
      Logger.info(`Tap: ${data.projectId}`);
    }
  }
}