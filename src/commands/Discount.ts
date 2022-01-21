import { Message, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { BotClient } from "../types";
import { serverData } from "../models/server_data";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import JuiceboxReader from "../juicebox_reader";
import { Logger } from "../utils/Logger";

export default class discountRate extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "discount",
      description:
        "Get the discount rate set for the current cycle, this means how much the amount of tokens you get per ETH will decrease in the next cycle.",
      category: "DAO Information",
      usage: client.settings.prefix.concat("discount"),
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

    let discount_rate = await JBR.getCycleDiscount(project_id);
    Logger.info(discount_rate);
    let embed = new MessageEmbed()
      .setThumbnail(await JBR.getLogo(project_id))
      .setTitle("Current discount rate")
      .setDescription(
        `The current discount rate is **${discount_rate}%**, this means payment to the project will yield **${discount_rate}% less tokens in the next cycle**.`
      );

    await super.respond(message.channel, embed);
  }
}
