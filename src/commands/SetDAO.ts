import { Message, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { BotClient } from "../types";
import { serverData } from "../models/server_data";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import JuiceboxReader from "../juicebox_reader";

export default class setDAO extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "setdao",
      description: "Set the DAO for the server.",
      category: "Settings",
      usage: client.settings.prefix.concat("setdao") + " <DAO Name>",
      cooldown: 1000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
  }

  public async run(message: Message, args: string[]): Promise<void> {
    let JBR: JuiceboxReader = new JuiceboxReader();
    dotenv.config();
    mongoose.connect(process.env.MONGO_CONN_STRING);
    let guild_id: string = message.guild?.id || "";
    let id = parseInt(args[0]);
    let name = await JBR.getDaoName(id);
    let data = await serverData.findOne({ server_id: guild_id }).exec();
    if (data != null) {
      await serverData.updateOne(
        { server_id: guild_id },
        { project_id: id, project_name: name }
      );
    } else {
      serverData.create({
        server_id: guild_id,
        project_id: id,
        project_name: name,
        alerts_channel: 99999999,
        latest_block: await JBR.getLatestBlock(),
        cycle_warning: "2:00:00",
      });
    }
    let embed = new MessageEmbed()
      .setThumbnail(await JBR.getLogo(id))
      .setTitle("Current reserved rate")
      .setDescription(`New DAO for the server is ${name}.`);

    await super.respond(message.channel, embed);
  }
}
