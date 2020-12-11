import { Client, Message } from 'discord.js';
import * as schedule from 'node-schedule';
import CommandService from './service/interaction/CommandService';
import GlobalService from './service/interaction/GlobalService';
import HearingService from './service/interaction/HearingService';
import UpdateService from './service/update/UpdateService';
import MessageService from './service/message/MessageService';
import News from '../domain/model/News';
import ChatService from './service/message/ChatService';

export default class BotManager {
  private news = new Map<string, News>();

  private readonly bot: Client;

  private readonly globalService: GlobalService;

  private readonly commandService: CommandService;

  private readonly hearingService: HearingService;

  private readonly updateService: UpdateService;

  private readonly messageService: MessageService;

  private readonly chatService: ChatService;

  constructor(bot: Client) {
    this.bot = bot;
    this.globalService = new GlobalService();
    this.commandService = new CommandService(bot);
    this.hearingService = new HearingService();
    this.updateService = new UpdateService();
    this.messageService = new MessageService(bot);
    this.chatService = new ChatService();
  }

  private async behaviourRouter(message: Message): Promise<void> {
    switch (message.content) {
      case '/help':
        this.globalService.help(message);
        break;
      case '/firstdown':
        this.commandService.addChannel(message);
        break;
      case '/fumble':
        this.commandService.removeChannel(message);
        break;
      case '/latest':
        this.commandService.sendLatest(message, this.news);
        break;
      case 'Da Bears':
        this.hearingService.daBears(message);
        break;
      default:
        if (message.author.id !== this.bot.user.id) {
          await message.reply('I\'m sorry, are you speaking the language of Gods?');
        }
        break;
    }
  }

  private setup() {
    this.bot.on('message', async (message: Message) => this.behaviourRouter(message));
    schedule.scheduleJob('* * * * *', (fireDate: Date) => this.update(fireDate));
  }

  private getDiffNews(updatedNews: Array<News>): Array<News> {
    const diffNews = [];

    updatedNews.forEach((element: News) => {
      if (!this.news.has(element.hashCode)) {
        diffNews.push(element);
      }
    });

    return diffNews;
  }

  private async broadcast(news: Array<News>): Promise<void> {
    console.log(`Sending new ${news.length} itens`);
    const promises: Array<Promise<Message>> = [];
    const chats = this.chatService.list();
    console.log(chats);

    news.forEach((specificNews) => {
      chats.forEach((chat) => {
        promises.push(this.messageService.send(chat, specificNews));
      });
    });

    await Promise.all(promises);
  }

  async update(firedAt: Date): Promise<void> {
    const updatedNews = await this.updateService.update(firedAt);
    const diffNews: Array<News> = this.getDiffNews(updatedNews);
    await this.broadcast(diffNews);
    this.news = new Map<string, News>(updatedNews.map((news: News) => [news.hashCode, news]));
  }

  async start(): Promise<void> {
    this.setup();
    const loginMessage: string = await this.bot.login(process.env.BOT_TOKEN);
    console.log(`Bot started: ${loginMessage}`);
  }
}
