const Discord = require('discord.js');
const keys = require('./keys.json');
const utils = require('./util.json');
const roles = require('./role.json');
const channels = require('./channels.json')
const data = require('../models/names');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {Array<String>} args
 * @param {Guild} guild
 */

run: async(client, msg, args, guild) => {
    if(!message.member.roles.cache.has()) !message.member.hasPermission(8); return message.channel.send("Bu komudu kullanabilmek için yeterli yetkin bulunmuyor.").filter(x => x.delete(500));
    const embed = new Discord.MessageEmbed();
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.error(message, "Bir üye belirtmelisin!");
    const untag = utils.untag
    const tag = utils.tag
    const name = args.slice(1).filter((x) => isNaN(x)).map((x) => x.charAt(0).replace(/i/g, "İ").toUpperCase() + x.slice(1)).join(" ");
    const age =  args.filter((x) => !isNaN(x) && member.id !== x)[0] || undefined;
    if (!name) return message.channel.error(message, "Geçerli bir isim belirtmelisin!");
    if (!age) return message.channel.error(message, "Geçerli bir yaş belirtmelisin!");
    if (name.length + age.length >= 30) return message.channel.error(message, "İsim ve yaşın uzunluğu 30 karakteri geçtiği için kayıt edemiyorum!");
    member.roles.remove(roles.unregister);
    member.roles.add(roles.erkek)
    member.setNickName(`${untag} ${name} | ${age}`)
    if((member.username).includes(tag)) {
        await member.setNickname((member.displayName).replace(untag, tag));
    } else {
        message.channel.send(embed.setDescription(`${member.toString()} üyesini başarıyla *erkek* olarak kayıt ettim.`));
    }
    
    await data.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { names: { name: member.displayName, rol: "İsim Komutu", date: Date.now() } } }, { upsert: true });
}

module.exports = {
    name: "erkek",
    aliases: ["e", "man"]
}