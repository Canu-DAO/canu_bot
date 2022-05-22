import { Message, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { BotClient } from "../types";
import { serverData } from "../models/server_data";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import JuiceboxReader from "../juicebox_reader";

export default class getCyceEnd extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "cycleend",
      description: "Get the date for when the cycle will end.",
      category: "DAO Information",
      usage: client.settings.prefix.concat("cycleend"),
      cooldown: 1000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
  }

  public async run(message: Message): Promise<void> {
    let JBR = new JuiceboxReader();
    dotenv.config();
    mongoose.connect(process.env.MONGO_CONN_STRING);
    let guild_id: string = message.guild?.id || "";
    let { project_id } = await serverData
      .findOne({ server_id: guild_id })
      .exec();

    let timestamp = Date.parse(await JBR.getCycleEnd(project_id));
    let thumb = await JBR.getLogo(project_id)
    const embed = new MessageEmbed()
      .setThumbnail(thumb)
      .setTitle("End of Cycle")
      .setDescription(`The current cycle ends on <t:${timestamp / 1000}>`);

    await super.respond(message.channel, embed);
  }
}
