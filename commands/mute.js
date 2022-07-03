const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Permissions,
    MessageEmbed
} = require('discord.js');
const {
    PermissionFlagsBits
} = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mutes a selected user.')
        .addUserOption(option => option.setName('target').setRequired(true).setDescription('The user you want to mute.'))
        .addStringOption(option => option.setName('duration').setRequired(true).setDescription('The duration of the  (in minutes)'))
        .addStringOption(option => option.setName('reason').setRequired(true).setDescription('The reason of the mute.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {
        const user = await interaction.options.getUser('target');
        const duration = Number(interaction.options.getString('duration')) * 600 * 100;
        const reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) return await interaction.reply({
            content: 'Mention a valid user please.'
        });
        if (!duration) return await interaction.reply({
            content: 'The duration provided is not valid.'
        });

        const embed = new MessageEmbed()
            .setTitle(`You have been muted in Switch.`)
            .addField(`Duration of mute`, `${duration / 60000} minutes.`)
            .addField(`Reason of the mute`, `${reason}`)
            .setTimestamp()
            .setFooter({
                text: 'Switch',
                iconURL: 'https://i.imgur.com/Ff3YPsP.png'
            });

        try {
            await member.send({
                embeds: [embed]
            });
        } catch (error) {
            console.error(error);
        }
        try {
            await member.timeout(duration, reason);
            interaction.channel.send({
                content: `${user.tag} was successfully muted.`
            })
        } catch (error) {
            console.error(error)
        }
    },
}