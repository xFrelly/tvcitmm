const db = require('quick.db')
const Discord = require('discord.js')

module.exports.run = async(client, message, args) =>{


  if (!message.member.roles.cache.get('733613559736565841')) {
    return message.reply('Bu komutu kullanmak için gerekli izne sahip değilsin.')
}

if (!args[1]) return message.reply('IQ seviyeni değil ekliyceğin miktarı gir.')
if (isNaN(args[1])) return message.reply('Bu geçerli bir sayı değil.')

let user = message.mentions.users.first() || message.author
message.channel.send(`${user}` +  ` Bakiyenize **${args[1]}** altın eklendi.`)
db.add(`money_${message.guild.id}_${user.id}`, args[1]);

 }
 module.exports.config = {
    name: "pekle",
    description: "",
    usage: "!pekle",
    accessableby: "Admins",
    aliases: ["!altınekle"]
    }
