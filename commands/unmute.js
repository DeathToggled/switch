const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    PermissionFlagsBits
} = require('discord-api-types/v9');
const {
    Permissions,
    MessageEmbed
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmutes a selected user.')
        .addUserOption(option => option.setName('target').setRequired(true).setDescription('The user you want to mute.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {
        const user = await interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) return await interaction.reply({
            content: 'Mention a valid user please.'
        });

        const embed = new MessageEmbed()
            .setTitle(`You have been unmuted in Switch.`)

        try {
            await member.send({
                embeds: [embed]
            });
        } catch (error) {
            console.error(error);
        }
        try {
            await member.remove.timeout();
            interaction.channel.send({
                content: `${user.tag} was successfully muted.`
            })
        } catch (error) {
            console.error(error)
        }
    },
}