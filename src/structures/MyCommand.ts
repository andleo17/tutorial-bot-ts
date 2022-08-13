import {
	ChatInputApplicationCommandData,
	CommandInteraction,
	PermissionResolvable,
} from 'discord.js';
import { MyBot } from './MyBot';

type RunOptions = {
	client: MyBot;
	interaction: CommandInteraction<'cached'>;
};

export type MyCommand = {
	userPermissions?: PermissionResolvable[];
	cooldown?: number;
	run: (options: RunOptions) => any;
} & ChatInputApplicationCommandData;

export class Command {
	public constructor(options: MyCommand) {
		Object.assign(this, options);
	}
}
