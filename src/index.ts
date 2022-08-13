import * as dotenv from 'dotenv';
dotenv.config();

import { MyBot } from './structures/MyBot';

new MyBot({ intents: ['GUILDS'] }).start();
