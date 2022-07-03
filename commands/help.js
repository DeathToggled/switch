const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List of commands/features'),
    async execute(interaction) {
        return interaction.reply({
            embeds: [embed]
        });
    }
}

const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Commands/Features')
    .setDescription('- /avatar (Get the avatar URL of the selected user, or your own avatar.)\n- /ban (Bans a selected user.)\n- /help (List of commands/features)\n- /mute (Mutes a selected user.)\n- /option (Information about the options provided.)\n- /ping (Shows the ping of the bot.)\n- /purge (Purges up to 99 messages.)\n- /pp (shows the true lenght of your PP)\n- /serverinfo (Display info about this server.)\n- /unban (Unbans a selected user.)\n- /unmute (unmutes the provided user)\n- /userinfo (Display info about yourself.)')
    .setTimestamp()
    .setFooter({
        text: 'Switch',
        iconURL: 'https://i.imgur.com/Ff3YPsP.png'
    });