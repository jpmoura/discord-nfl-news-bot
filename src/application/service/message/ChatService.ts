import ChatRepository from '../../../infra/repository/chat/ChatRepository';

export default class ChatService {
  private readonly chatRepository: ChatRepository = new ChatRepository();

  async create(chatId: string): Promise<void> {
    await this.chatRepository.insert(chatId);
  }

  list(): Array<string> {
    return this.chatRepository.list();
  }

  async delete(chatId: string): Promise<void> {
    await this.chatRepository.delete(chatId);
  }
}
