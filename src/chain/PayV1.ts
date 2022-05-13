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
import { PayEvent } from "@sdk-client/esm/types/TerminalV1";

export default class Pay implements BotEvent {
  JBR: JuiceboxReader;

  constructor(private client: Client) {
    this.JBR = new JuiceboxReader();
    this.client = client;
  }

  public async formatEmbed(data: PayEvent): Promise<MessageEmbed> {
    const { note, caller, amount, projectId } = data.args
    const payment = utils.formatEther(amount);
    const new_balance = await this.JBR.getBalance(projectId, 1);
    const decorator = (await this.JBR.getRawCurrentCycle(projectId)).currency ? 'Ξ' : '$';
    return new MessageEmbed()
      .setTitle("New Pay")
      .setColor(`PURPLE`)
      .addFields(
        { name: 'Amount',  value: `${decorator}${payment}`},
        { name: 'Sent by', value: `${caller}`},
        { name: 'New Balance', value: `${decorator}${new_balance}`},
        { name: 'DAO', value: `${(await this.JBR.getDaoName(projectId))}`}
      )
      .setThumbnail(await this.JBR.getLogo(projectId))
      .setDescription(note)
  }

  public async sendInChannel(message: MessageEmbed, channel: string) {
    const alerts_channel = this.client.channels.cache.get(channel);
    (alerts_channel as TextChannel).send(
      message
    );
  }

  public async run(args: any[]): Promise<void> {
    Logger.info(`Inside PayV1`);
    const data: any = args[args.length - 1];
    
    try {
      // const docs = await serverData.find({ project_id: project_id }).maxTimeMS(10000).exec();
      // docs.forEach((doc) => {
        this.sendInChannel(await this.formatEmbed(data), "875439504096391181"); //doc.alerts_channel.toString());
      // });
    } catch (err) { 
      Logger.error(err);
    } finally {
      Logger.info(`PayV1: ${data.projectId}`);
    }
  }
}