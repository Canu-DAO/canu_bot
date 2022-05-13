import { BotSettings } from "../types/bot/Bot";

export const settings: BotSettings = {
  presence: {
    activity: {
      name: "!help for commands",
      type: "PLAYING",
    },
  },
  prefix: "!",
  paths: {
    commands: "src/commands",
    events: "src/events",
    chainEvents: "src/chain",
  },
  categories: ["DAO Information", "Help", "Settings"]
};
