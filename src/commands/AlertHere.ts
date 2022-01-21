import { Message, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { BotClient } from "../types";
import { serverData } from "../models/server_data";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import JuiceboxReader from "../juicebox_reader";

export default class alertsHere extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "alertshere",
      description: "Set the channel for alerts to be sent in.",
      category: "DAO Information",
      usage: client.settings.prefix.concat("alertshere"),
      cooldown: 1000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
  }

  public async run(message: Message): Promise<void> {
    let JBR: JuiceboxReader = new JuiceboxReader();
    dotenv.config();
    mongoose.connect(process.env.MONGO_CONN_STRING);
    let guild_id: string = message.guild?.id || "";

    let data = await serverData.findOne({ server_id: guild_id }).exec();
    if (data != null) {
      await serverData.updateOne(
        { server_id: guild_id },
        { alerts_channel: message.channel.id }
      );
    } else {
      serverData.create({
        server_id: guild_id,
        project_id: 1,
        project_name: await JBR.getDaoName(1),
        alerts_channel: message.channel.id,
        latest_block: await JBR.getLatestBlock(),
        cycle_warning: "2:00:00",
      });
    }
    const embed = new MessageEmbed()
      .setTitle("Alets Channel")
      .setDescription(`Set alerts to be sent here.`);
    await super.respond(message.channel, embed);
  }
}
