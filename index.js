const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const mongoose = require('mongoose');
const ms = require('ms');
const moment = require('moment');
require('moment-duration-format');
const utils = require('./util.json');
const roles = require('./role.json');
const channels = require('./channels.json')
const config = require('./config.json')
mongoose.connect(utils.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

client.on('ready', async() => {
    client.channels.cache.get(config.voiceChannel).join()
    client.user.setPresence({
        status: "dnd",
        activity: {
            name: "Cool Down, This is Takachi!",
            type: "WATCHING"
        }
    })
})

     client.on('message', msg => {
        if (msg.content === '.tag') {
          msg.channel.send(utils.tag);
        }
      });


      client.on('message', msg => {
        if (msg.content === '!tag') {
          msg.channel.send(utils.tag);
        }
      });


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}


client.on('userUpdate', async(oldTaka, newTaka) => {
    var sunucu = client.guilds.cache.get(config.guildID);
    var member = sunucu.members.cache.get(newTaka.id);
    var normalTag = utils.untag
    var tag = utils.tag
    var tagli = roles.family
    var logkanal = channels.taglog

    if(!sunucu.member.cache.has(newTaka.id) || newTaka.bot || oldTaka.username === newTaka.username) return;

    if((newTaka.username).includes(tag) && !member.roles.cache.has(tagli)) {
            await member.roles.add(tagli);
            await member.setNickname((member.displayName).replace(normalTag, tag));
            await client.channels.cache.get(logkanal).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${newTaka} uyesi tagimizi aldigi icin ona tagli rolunu verdim`))
        }


    if(!(newTaka.username).includes(tag) && member.roles.cache.has(tagli)) {
            await member.roles.remove(tagli);
            await member.setNickname((member.displayName).replace(tag, normalTag));
            await client.channels.cache.get(logkanal).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${newTaka} uyesi tagimizi saldigi icin ondan tagli rolunu aldim`))
    }
});

client.on('guildMemberAdd', async (member, yeni, old) => {
    await member.roles.add(roles.unregister);
    await member.setNickname("• İsim | Yaş")
    var sunucu = client.guilds.cache.get(config.guildID);
    var member = sunucu.members.cache.get(yeni.id);
    var welcome = channels.welcome
    var normalTag = utils.untag
    var tag = utils.tag
    var tagli = roles.family
    const uye = guild.memberCount
    var register = roles.register


    const tarih = moment(member.user.createdTimestamp).format("LLL")
    const tarih2 = + moment(member.user.createdTimestamp).fromNow() 
    if(!sunucu.member.cache.has(yeni.id) || yeni.bot || old.username === yeni.username) return;

    if((yeni.username).includes(tag) && !member.roles.cache.has(tagli)) {
            await member.roles.add(tagli);
            await member.setNickname((member.displayName).replace(normalTag, tag));
        }

        if(Data.now() - member.user.createdTimestamp < ms("5d")) {
            welcome.send(new Discord.MessageEmbed().setFooter(moment(Date.now()).format("LLL")).setColor("RANDOM").setDescription(`
            Şüpheli Kişi: ${member} - **${member.id}**
            Kişinin hesabı 5 günden önce açıldığı için Şüpheliye atıldı.
            `))
            member.roles.add(roles.supheli);
        }
        welcome.send(`Sunucumuza hoşgeldin ${yeni} - (${yeni.id}) Hesabın ${tarih} ${tarih2} önce kurulmuş,

Seninle beraber ${uye} kişi olduk! Tagımıza ulaşmak için (`.tag/!tag`) Yazabilirsin,

Kayıt olman için <&${register}> rolündeki yetkililer seninle ilgilenecektir, İyi eğlenceler!`)
})

client.login(config.Bot);
