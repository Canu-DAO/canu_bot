import { Message, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { BotClient } from "../types";
import { serverData } from "../models/server_data";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import JuiceboxReader from "../juicebox_reader";
import { Logger } from "../utils/Logger";

export default class getBalance extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "balance",
      description:
        "Tells you how much the DAO has in treasury at the moment, both in USD and ETH.",
      category: "DAO Information",
      usage: client.settings.prefix.concat("balance"),
      cooldown: 1000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
  }

  public async run(message: Message): Promise<void> {
    let JBR = new JuiceboxReader();
    dotenv.config();
    mongoose.connect(process.env.MONGO_CONN_STRING);
    let guild_id: string = message.guild?.id || "";
    const { project_id, server_id, project_name } = await serverData
      .findOne({ server_id: guild_id })
      .exec();

    let current_cycle = await JBR.getRawCurrentCycle(project_id);
    let raw_balance = parseInt(await JBR.getBalance(project_id));
    let formatter = Math.floor(
      parseInt(
        (await JBR.sdk.Prices.getETHPriceFor(current_cycle[11])).toString()
      ) /
        10 ** 18
    );
    let tresury_amount = (raw_balance * formatter).toFixed(2);
    Logger.info(
      `Raw: ${raw_balance}\n\tFormatter: ${formatter}\n\tTreasury: ${tresury_amount}`
    );
    let decorator: string;
    if (current_cycle[11].toString() != "0") {
      decorator = "$";
    } else {
      decorator = "Ξ";
    }

    let embed = new MessageEmbed()
      .setTitle("Treasury")
      .setThumbnail(await JBR.getLogo(project_id))
      .setDescription(
        `The ${project_name} tresury holds ${decorator}${tresury_amount}`
      );
    await super.respond(message.channel, embed);
  }
}
