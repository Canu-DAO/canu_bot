import { Message, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { BotClient } from "../types";
import { serverData } from "../models/server_data";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import JuiceboxReader from "../juicebox_reader";
import { Logger } from "../utils/Logger";

export default class bondingCurve extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "bonding",
      description:
        "Get the bonding curve set for the current cycle, this means for what percentage of their value tokens can be redeemed.",
      category: "DAO Information",
      usage: client.settings.prefix.concat("bonding"),
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

    console.log((await JBR.getRawCurrentCycle(project_id)).metadata.toNumber());

    let embed = new MessageEmbed()
      .setThumbnail(await JBR.getLogo(project_id))
      .setTitle("Current reserved rate")
      .setDescription(
        `The bonding curve is set at ${await JBR.getCycleBonding(
          project_id
        )}% for the current cycle.`
      );

    await super.respond(message.channel, embed);
  }
}
