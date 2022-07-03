const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Client,
    MessageEmbed
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows the ping of the bot.'),
    async execute(interaction) {
        const sent = await interaction.reply({
            content: 'Pinging...',
            fetchReply: true
        });
        interaction.editReply(`Ping: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    }
}