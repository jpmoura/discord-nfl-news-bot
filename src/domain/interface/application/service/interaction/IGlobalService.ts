import { Message } from 'discord.js';

export default interface IGlobalService {
  help(ctx: Message): void;
}
