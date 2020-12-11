import { Message } from 'discord.js';
import IGlobalService from '../../../domain/interface/application/service/interaction/IGlobalService';

export default class GlobalService implements IGlobalService {
  help(ctx: Message): void {
    ctx.reply('*Hello there*. I can help you to keep up informed about the NFL.'
        + 'I understand the following actions:\n\n'
        + '`/firstdown` I will put you in my mailing list and will send you every update about the league\n'
        + '`/fumble` I will remove you from my mailing list and you will not receive my updates');
  }
}
