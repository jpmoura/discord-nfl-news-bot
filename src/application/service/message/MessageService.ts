import { Client, Message } from 'discord.js';
import News from '../../../domain/model/News';
import MessageRepository from '../../../infra/repository/message/MessageRepository';

export default class MessageService {
  private messageRepository: MessageRepository;

  constructor(bot: Client) {
    this.messageRepository = new MessageRepository(bot);
  }

  send(chatId: string, news: News): Promise<Message> {
    return this.messageRepository.send(chatId, news.toString());
  }
}
