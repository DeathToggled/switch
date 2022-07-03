const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    PermissionFlagsBits
} = require('discord-api-types/v9');
const {
    Permissions
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a selected user. (USE IDS)')
        .addStringOption(option => option.setName('user').setDescription('the user id you want to unban').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction, client) {
        const userID = interaction.options.getString('user');

        await interaction.guild.bans.fetch()
            .then(async bans => {
                if (bans.size == 0) return await interaction.reply({
                    content: `this user isn't banned`,
                    ephemeral: true
                });
                let bannedID = await bans.find(ban => ban.user.id == userID);
                if (!bannedID) return await interaction.reply({
                    content: `the ID stated isn't banned in this server`,
                    ephemeral: true
                });
                await interaction.guild.bans.remove(userID).catch(err => console.error(err))
                await interaction.reply({
                    content: `<@${userID}> unbanned successfully`,
                    ephemeral: false
                })
            })
            .catch(err => console.err(err));
    }
}