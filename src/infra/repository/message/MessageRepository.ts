import { Client, Message, TextChannel } from 'discord.js';
import IMessageRepository from '../../../domain/interface/infra/repository/message/IMessageRepository';

export default class MessageRepository implements IMessageRepository {
  private bot: Client;

  constructor(bot: Client) {
    this.bot = bot;
  }

  async send(chatId: string, message: string): Promise<Message> {
    const channel: TextChannel = this.bot.channels.cache.get(chatId) as TextChannel;
    return channel.send(message);
  }
}
