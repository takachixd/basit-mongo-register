const Discord = require('discord.js');
const keys = require('./keys.json');
const utils = require('./util.json');
const roles = require('./role.json');
const config = require("../config.yml");
const channels = require('./channels.json')

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {Array<String>} args
 * @param {Guild} guild
 */

run: async(client, msg, args, guild) => {
    if(!message.member.roles.cache.has(roles.botcommands)) !message.member.hasPermission(8); return message.channel.send("Bu komudu kullanabilmek iÃ§in yeterli yetkin bulunmuyor.").filter(x => x.delete(500));
    let takviye = guild.premiumSubscriptionCount
    let level = guild.premiumTier
    

    embed.setDescription(`
   Sunucumuzda toplam **${message.guild.memberCount}** kişi kulunmakta, **${message.guild.members.cache.filter((x) => x.user.presence.status !== "offline").size}** Kişi aktif.
   Sunucumuzda toplam **${message.guild.members.cache.filter((x) => x.user.username.includes(utils.tag)).size} taglı bulunmakta.
   Sunucumuzda toplam **${takviye}** boost bulunmakta, ve sunucumuz **${level}** seviye!
   Ses kanallarında **${message.guild.members.cache.filter((x) => x.voice.channel).size} kişi bulunmakta.
    `);
    message.channel.send(embed)
}


module.exports = {
    name: "say",
    aliases: ["istatistik"]
}