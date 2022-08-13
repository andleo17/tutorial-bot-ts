import { Event } from '../structures/MyEvent';

export default new Event('ready', (client) => {
	client.publishCommand(process.env.GUILD_ID);
	console.log('Bot listo');
});
