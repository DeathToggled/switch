const fs = require('node:fs');
const path = require('node:path');
const {
    Client,
    Collection,
    Intents,
    MessageCreate
} = require('discord.js');
const {
    token
} = require('./config.json');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
    disableMentions: 'everyone'
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'there was an error while executing this command, contact ``DeathToggled#4014``',
            ephemeral: true
        });
    }
});


client.on('interactionCreate', interaction => {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
});


const welcomeChannelId = "955875957854588948"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})

client.login(token);