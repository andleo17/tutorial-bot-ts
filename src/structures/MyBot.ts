import {
	ApplicationCommandDataResolvable,
	Client,
	ClientEvents,
	ClientOptions,
	Collection,
} from 'discord.js';
import * as path from 'path';
import * as fs from 'fs/promises';
import { MyCommand } from './MyCommand';
import { Event } from './MyEvent';

export class MyBot extends Client {
	public commands: Collection<string, MyCommand>;
	private slashCommands: ApplicationCommandDataResolvable[];

	public constructor(options: ClientOptions) {
		super(options);
		this.commands = new Collection();
		this.slashCommands = [];
	}

	public start(): void {
		this.readCommands();
		this.readEvents();
		this.login(process.env.BOT_TOKEN);
	}

	public publishCommand(guildID?: string): void {
		try {
			if (guildID) {
				this.guilds.cache.get(guildID)?.commands.set(this.slashCommands);
				console.log('Comandos registrados en la guild: ', guildID);
			} else {
				this.application.commands.set(this.slashCommands);
				console.log('Comandos registrados de manera global');
			}
		} catch (error) {
			console.error(error);
		}
	}

	private async readCommands(): Promise<void> {
		try {
			const commandsPath = path.join(__dirname, '../commands');
			const commandsFolder = await fs.readdir(commandsPath);
			for (const commandsFile of commandsFolder) {
				const commandsSubFolder = path.join(commandsPath, commandsFile);
				const files = await fs.readdir(commandsSubFolder);
				for (const file of files) {
					const command: MyCommand = (
						await import(path.join(commandsSubFolder, file))
					).default;
					if (!command.name) return;
					this.commands.set(command.name, command);
					this.slashCommands.push(command);
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	private async readEvents(): Promise<void> {
		try {
			const eventsPath = path.join(__dirname, '../events');
			const eventsFolder = await fs.readdir(eventsPath);
			for (const eventFile of eventsFolder) {
				const event: Event<keyof ClientEvents> = (
					await import(path.join(eventsPath, eventFile))
				).default;
				this.on(event.name, (...args) => event.run(this, ...args));
			}
		} catch (error) {
			console.error(error);
		}
	}
}
