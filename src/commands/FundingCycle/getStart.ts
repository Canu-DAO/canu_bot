import { Message } from 'discord.js';
import { Command } from '../../Command';
import { BotClient } from '../../types';

export default class getStart extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'getStart',
            description: 'Returns when the current funding cycle started.',
            category: 'FundingCycle',
            usage: client.settings.prefix.concat('getStart'),
            cooldown: 0,
            requiredPermissions: ['SEND_MESSAGES']
        });
    }

    public async run(message: Message, args: string[]): Promise<void> {
        super.client.JBReader.getCycleStart(parseInt(args[0])).then(async result => {
            await super.respond(message.channel, result.toString());
        });
    }
}
