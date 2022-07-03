const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Client,
    MessageEmbed,
    Permissions
} = require('discord.js')
const {
    PermissionFlagsBits
} = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announcement')
        .setDescription('sends an announcements')
        .addStringOption(option => option.setName(`announcement`).setDescription(`The Announcement`).setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction, client, message) {
        const messageballs = interaction.options.getString('announcement')

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Switch')
            .addField("**announcement:**", `${messageballs || "**no announcement**"}`)
            .setTimestamp()
            .setFooter({
                text: 'Switch',
                iconURL: 'https://i.imgur.com/Ff3YPsP.png'
            });

        const sent = await interaction.channel.send({
            content: '<@&992769396747550790>',
            embeds: [embed],
            fetchReply: true
        });
    }
};