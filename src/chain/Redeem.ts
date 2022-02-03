import { Client } from "../Client";
import { Logger } from "../utils/Logger";
import { BotEvent } from "../types";
import JuiceboxReader from "../juicebox_reader";
export default class Ready implements BotEvent {
  JBR: JuiceboxReader;

  constructor(private client: Client) {
    this.JBR = new JuiceboxReader();
  }

  public async run(args: any[]): Promise<void> {
    Logger.info(`entered Redeem`);
    const data: any = args[args.length - 1];
    console.log(data.args);
  }
}