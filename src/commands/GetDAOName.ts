import { Message, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { BotClient } from "../types";
import { serverData } from "../models/server_data";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import JuiceboxReader from "../juicebox_reader";
export default class getDAOName extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "getname",
      description: "Get the name of the DAO.",
      category: "DAO Information",
      usage: client.settings.prefix.concat("getname"),
      cooldown: 1000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
  }

  public async run(message: Message): Promise<void> {
    let JBR = new JuiceboxReader();
    dotenv.config();
    mongoose.connect(process.env.MONGO_CONN_STRING);
    let guild_id: string = message.guild?.id || "";
    let { project_name } = await serverData
      .findOne({ server_id: guild_id })
      .exec();

    let embed = new MessageEmbed()
      .setTitle("Current DAO")
      .setDescription(`The current DAO is ${project_name}`);
    await super.respond(message.channel, embed);
  }
}
