import { Message } from 'discord.js';

export default interface IMessageRepository {
  send(chatId: string, message: string): Promise<Message>;
}
