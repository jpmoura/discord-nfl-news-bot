import { Message } from 'discord.js';
import News from '../../../../model/News';

export default interface IMessageService {
  send(chatId: string, news: News): Promise<Message>;
}
