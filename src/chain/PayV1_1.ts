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
import { PayEvent } from "@sdk-client/esm/types/TerminalV11";

export default class Pay implements BotEvent {
  JBR: JuiceboxReader;

  constructor(private client: Client) {
    this.JBR = new JuiceboxReader();
    this.client = client;
  }

  public async formatEmbed(data: PayEvent): Promise<MessageEmbed> {
    const { note, caller, amount, projectId } = data.args
    const payment = utils.formatEther(amount);
    const new_balance = await this.JBR.getBalance(projectId, 1.1);
    const decorator = (await this.JBR.getRawCurrentCycle(projectId)).currency ? 'Ξ' : '$';
    const name = await this.JBR.getDaoName(projectId);
    const thumb = await this.JBR.getLogo(projectId);
    return new MessageEmbed()
      .setTitle("New Pay")
      .setColor(`PURPLE`)
      .addFields(
        { name: 'Amount',  value: `${decorator}${payment}`},
        { name: 'Sent by', value: `${caller}`},
        { name: 'New Balance', value: `${decorator}${new_balance}`},
        { name: 'DAO', value: `${name}`})
      .setThumbnail(thumb)
      .setDescription(note)
  }

  public async sendInChannel(message: MessageEmbed, channel: string) {
    const alerts_channel = this.client.channels.cache.get(channel);
    (alerts_channel as TextChannel).send(
      message
    );
  }

  public async run(args: any[]): Promise<void> {
    Logger.info(`Inside PayV1.1`);
    const data: any = args[args.length-1];
    const _embed = await this.formatEmbed(data);
    try {
      Logger.info('trying')      
      this.sendInChannel(_embed, "874810209367908413");
      Logger.info('sent in JB')
      this.sendInChannel(_embed, "875439504096391181");
      Logger.info('sent in CTG')
      const docs = await serverData.find({ "project_id": parseInt(data.args.projectId)}).maxTimeMS(100000).exec();
      docs.forEach((doc) => {
        console.log(doc)
        this.sendInChannel(_embed, doc.alerts_channel.toString()); //doc.alerts_channel.toString());
        Logger.info('sent successfully to listener')
      });
    } catch (err) { 
      Logger.error(err);
    } finally {
      Logger.info(`PayV1.1: ${data}`);
    }
  }
}
