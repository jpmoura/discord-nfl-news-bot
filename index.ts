import Discord, { Client } from 'discord.js';
import BotManager from './src/application/BotManager';

const bot: Client = new Discord.Client();
const botManager: BotManager = new BotManager(bot);

botManager.start();
