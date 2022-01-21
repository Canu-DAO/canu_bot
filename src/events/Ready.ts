import { Client } from "../Client";
import { Logger } from "../utils/Logger";
import { BotEvent } from "../types";
import JuiceboxReader from "../juicebox_reader";
export default class Ready implements BotEvent {
  JBR: JuiceboxReader;

  constructor(private client: Client) {
    this.JBR = new JuiceboxReader();
  }

  public async run(): Promise<void> {
    if (this.client.user) {
      Logger.info(`${this.client.user.username} is running.`);
      this.client.user.setPresence(this.client.settings.presence);
    }
  }
}
