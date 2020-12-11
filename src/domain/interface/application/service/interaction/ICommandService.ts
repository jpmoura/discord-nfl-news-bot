import { Message } from 'discord.js';
import News from '../../../../model/News';

export default interface ICommandService {
  addChannel(ctx: Message): Promise<Message>
  removeChannel(ctx: Message): Promise<Message>
  sendLatest(ctx: Message, news: Map<string, News>): Promise<Message>
}
