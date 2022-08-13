import { Command } from '../../structures/MyCommand';

export default new Command({
	name: 'ping',
	description: 'Responde con la palabra pong',
	run: ({ interaction }) => {
		interaction.followUp('pong');
	},
});
