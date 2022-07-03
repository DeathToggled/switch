const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Display info about this server.'),
    async execute(interaction, guild, client) {

        const embed = new MessageEmbed()
            .setColor('#36393e')
            .setTitle(`${interaction.guild.name}`)
            .setThumbnail('https://i.imgur.com/Ff3YPsP.png')
            .setFields({
                name: 'Owners of this server',
                value: `<@744105621204369446> and <@965479242764808252>`
            }, {
                name: 'Origin of this server',
                value: '<t:1647882540:D>'
            }, {
                name: 'Boosts',
                value: `<:boost:991981337932202004> 0 boosts`
            }, {
                name: 'Important channels',
                value: '<#955884217621966898>'
            })
            .setTimestamp()
            .setFooter({
                text: 'Switch',
                iconURL: 'https://i.imgur.com/Ff3YPsP.png'
            });

        return interaction.reply({
            embeds: [embed]
        });
    },
};