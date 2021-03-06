import Datastore from 'nedb';
import { promisify } from 'util';
import DatastoreFabric from '../DatastoreFabric';

export default class ChatRepository {
  private readonly db: Datastore;

  private readonly promisifyUpdate: any;

  private readonly promisifyRemove: any;

  constructor() {
    this.db = DatastoreFabric.chatsDatastore;
    this.promisifyUpdate = promisify(this.db.update.bind(this.db));
    this.promisifyRemove = promisify(this.db.remove).bind(this.db);
  }

  async insert(chatId: string) {
    await this.promisifyUpdate({ chatId }, { $set: { chatId } }, { upsert: true });
  }

  list(): any[] {
    return this.db.getAllData().map((item: any) => item.chatId);
  }

  async delete(chatId: string) {
    await this.promisifyRemove({ chatId }, {});
  }
}
