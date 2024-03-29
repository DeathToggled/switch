const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    PermissionFlagsBits
} = require('discord-api-types/v9');
const {
    Permissions
} = require('discord.js');
const userinfo = require('./userinfo');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge up to 99 messages.')
        .addIntegerOption(option => option.setName('amount').setDescription('Number of messages to prune'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (amount < 1 || amount > 99) {
            return interaction.reply({
                content: 'you need to input a number between 1 and 99',
                ephemeral: true
            });
        }
        await interaction.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            interaction.reply({
                content: 'there was an error trying to prune messages in this channel',
                ephemeral: true
            });
        });

        return interaction.reply({
            content: `successfully purged \`${amount}\` messages.`,
            ephemeral: true
        });
    },
};