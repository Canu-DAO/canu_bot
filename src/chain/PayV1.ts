import { Client } from "../Client";
import { Logger } from "../utils/Logger";
import { BotEvent } from "../types";
import JuiceboxReader from "../juicebox_reader";
import { serverData } from "../models/server_data";
import { send } from "process";
import {
  Channel,
  DiscordAPIError,
  MessageEmbed,
  TextChannel,
} from "discord.js";
export default class Pay implements BotEvent {
  JBR: JuiceboxReader;

  constructor(private client: Client) {
    this.JBR = new JuiceboxReader();
    this.client = client;
  }

  public async sendInChannel(message: String, channel: string) {
    const alerts_channel = this.client.channels.cache.get(channel);
    (alerts_channel as TextChannel).send(
      new MessageEmbed().setTitle("New Payment").setDescription(message)
    );
  }

  public async run(args: any[]): Promise<void> {
    const data: any = args[args.length - 1].args;
    const project_id = data._projectId;

    const docs = serverData.find({ project_id: project_id });
    (await docs).forEach((doc) => {
      //this.sendInChannel(data.toString(), doc.alerts_channel.toString());
      this.sendInChannel(data.toString(), "875439504096391181");
    });
    Logger.info(`PayV1: ${data.projectId}`);
  }
}
