const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Permissions
} = require('discord.js')
const {
    PermissionFlagsBits
} = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a selected user.')
        .addUserOption(option => option.setName('user').setDescription('the user you want to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('the reason for the ban'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction, client) {
        const banUser = interaction.options.getUser('user')
        const banMember = await interaction.guild.members.fetch(banUser.id);
        if (!banMember) return await interaction.reply({
            content: 'the user is no longer in this server',
            ephemeral: true
        });

        if (!Permissions.FLAGS.MANAGE_MESSAGES) return await interaction.reply(`You do not have permissions to execute this command.`)

        let reason = interaction.options.getString('reason');
        if (!reason) reason = "no reason provided"

        await banMember.send({
                content: `you were banned in ${interaction.guild.name} \nreason: ${reason}`
            })
            .catch(err => console.log(`there was an error while executing this command, contact DeathToggled#4014`))

        await banMember.ban({
                days: 7,
                reason: reason
            })
            .catch(err => console.error(err));

        await interaction.reply({
            content: `you've successfully banned ${banUser.tag}`
        })
    }
}