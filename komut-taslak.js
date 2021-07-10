const Discord = require('discord.js');
const keys = require('./keys.json');
const utils = require('./util.json');
const roles = require('./role.json');
const channels = require('./channels.json')

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {Array<String>} args
 * @param {Guild} guild
 */

run: async(client, msg, args, guild) => {
    const embed = new Discord.MessageEmbed();
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
//kodlari yazmaya baslayin

}

module.exports = {
    name: "",
    aliases: [""]
}