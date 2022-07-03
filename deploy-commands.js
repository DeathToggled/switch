const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const {
    token
} = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const clientId = '991436579585413303';
const guildId = '955529670646956072';

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({
    version: '9'
}).setToken(token);

(async () => {
    try {
        console.log('started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId, guildId), {
                body: commands
            },
        );

        console.log('successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();