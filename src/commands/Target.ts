import { Message, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { BotClient } from "../types";
import { serverData } from "../models/server_data";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import JuiceboxReader from "../juicebox_reader";

export default class target extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "target",
      description: "Get the funding target for the current cycle.",
      category: "DAO Information",
      usage: client.settings.prefix.concat("cycleend"),
      cooldown: 1000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
  }

  public async run(message: Message): Promise<void> {
    let decorator: string;
    let JBR: JuiceboxReader = new JuiceboxReader();
    dotenv.config();
    mongoose.connect(process.env.MONGO_CONN_STRING);
    let guild_id: string = message.guild?.id || "";
    let { project_id } = await serverData
      .findOne({ server_id: guild_id })
      .exec();

    let target_amnt: number = parseInt(await JBR.getCycleTarget(project_id));

    if ((await JBR.getRawCurrentCycle(project_id))[11].toString() != "0") {
      decorator = "$";
    } else {
      decorator = "Ξ";
    }

    let embed = new MessageEmbed()
      .setThumbnail(await JBR.getLogo(project_id))
      .setTitle("Funding Target")
      .setDescription(
        `The funding target for this cycle is: ${decorator}${target_amnt}`
      );

    await super.respond(message.channel, embed);
  }
}
