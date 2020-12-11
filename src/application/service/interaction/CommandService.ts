import { Client, Message } from 'discord.js';
import ICommandService from '../../../domain/interface/application/service/interaction/ICommandService';
import News from '../../../domain/model/News';
import ChatService from '../message/ChatService';
import MessageService from '../message/MessageService';

export default class CommandService implements ICommandService {
  private readonly messageService: MessageService;

  private readonly chatService: ChatService;

  constructor(bot: Client) {
    this.messageService = new MessageService(bot);
    this.chatService = new ChatService();
  }

  async addChannel(ctx: Message): Promise<Message> {
    await this.chatService.create(ctx.channel.id);
    console.log(`New channel ${ctx.channel.id} added`);
    return ctx.channel.send(`Gotcha ${ctx.member.displayName}! From now on you guys will receive news about NFL as soon them are published 👌`);
  }

  async removeChannel(ctx: Message): Promise<Message> {
    await this.chatService.delete(ctx.channel.id);
    console.log(`Channel ${ctx.channel.id} removed from list`);
    return ctx.channel.send('Ok then, you will not hear from me anymore 😭\nIf you change your mind, just send me `/firstdown` again 😉');
  }

  async sendLatest(ctx: Message, news: Map<string, News>): Promise<Message> {
    if (news.size > 0) {
      return this.messageService.send(ctx.channel.id, news.values().next().value);
    }

    return ctx.channel.send("Sorry, I don't have news/tweets/fantasy transactions yet 😥");
  }
}
