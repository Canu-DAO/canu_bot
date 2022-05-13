import { Message, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { BotClient } from "../types";

export default class Help extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "help",
      description: "Shows this message.",
      category: "Help",
      usage: client.settings.prefix.concat("help") + " [command name]",
      cooldown: 1000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
  }

  public async run(message: Message, args: string[]): Promise<void> {
    let embed = new MessageEmbed();
    if (args[0]) {
      embed = getCMD(this.client, args[0]);
    } else {
      embed = getAll(this.client);
    }
    await super.respond(message.channel, embed)
  }
}



function getAll(client: BotClient): MessageEmbed {
  const embed = new MessageEmbed()
    .setColor("PURPLE")
    .setTitle("Help Menu")
    .setFooter("To get help for a specific command use !help <command name>")

  const commands = (category: string) => {
    return client.commands
      .filter(cmd => cmd.conf.category === category)
      .map(cmd => `\`${cmd.conf.name}\``)
      .join(", ")
  }

  const info = client.settings.categories
    .map((cat: string) => `**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}\n`)
    .reduce((string: string, category: string) => string + "\n" + category);

  return embed.setDescription(info)
}

function getCMD(client: BotClient, input: string): MessageEmbed {
  const embed = new MessageEmbed()

  // Get the cmd by the name or alias
  const cmd = client.commands.get(input.toLowerCase());
  
  let info = `No command named **${input.toLowerCase()}**`;

  // If no cmd is found, send not found embed
  if (!cmd) {
      return embed.setColor("RED").setDescription(info);
  }

  // Add all cmd info to the embed
  if (cmd.conf.name) embed.addField("Command name", `\`${cmd.conf.name}\``);
  if (cmd.conf.description) embed.addField("Description", cmd.conf.description);
  if (cmd.conf.usage) {
      embed.addField("Usage", cmd.conf.usage);
      embed.setFooter(`Syntax: <> = required, [] = optional`);
  }

  return embed.setTitle("Help").setColor("PURPLE").setDescription(info);
}

