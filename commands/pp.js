const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Client,
    MessageEmbed
} = require('discord.js')
const Math = require('math')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pp')
        .setDescription('Shows the true length of your PP.'),
    async execute(interaction) {
        return interaction.reply({
            embeds: [embed]
        });
    }
}

const rating = Math.floor(Math.random() * 15);

const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('PP predictor 69')
    .setDescription(`:straight_ruler: ${rating} inches`)
    .setTimestamp()
    .setFooter({
        text: 'Switch',
        iconURL: 'https://i.imgur.com/Ff3YPsP.png'
    });