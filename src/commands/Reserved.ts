import { Message, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { BotClient } from "../types";
import { serverData } from "../models/server_data";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import JuiceboxReader from "../juicebox_reader";

export default class reservedRate extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "reserved",
      description:
        "Get the percentage of tokens that are reserved in each payment transaction in the current cycle.",
      category: "DAO Information",
      usage: client.settings.prefix.concat("reserved"),
      cooldown: 1000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
  }

  public async run(message: Message): Promise<void> {
    let JBR: JuiceboxReader = new JuiceboxReader();
    dotenv.config();
    mongoose.connect(process.env.MONGO_CONN_STRING);
    let guild_id: string = message.guild?.id || "";
    let { project_id } = await serverData
      .findOne({ server_id: guild_id })
      .exec();

    const thumb = await JBR.getLogo(project_id);
    const rate = await JBR.getCycleReserved(project_id);

    let embed = new MessageEmbed()
      .setThumbnail(thumb)
      .setColor("PURPLE")
      .setTitle("Current reserved rate")
      .setDescription(
        `Reserved rate for this cycle is: ${rate}`
      );

    await super.respond(message.channel, embed);
  }
}
