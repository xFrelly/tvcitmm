const db = require('quick.db')
const Discord = require('discord.js')

module.exports.run = async (client , message, args) => {


  if (!message.member.hasPermission('ADMINISTRATOR')) {
    return message.reply('Bu komutu kullanmak için gerekli izne sahip değilsin.')
  }

  if (!args[1]) return message.reply('Lütfen geçerli bir sayı girin.')
  if (isNaN(args[1])) return message.reply('Bu geçerli bir sayı değil.')
  if(!args[0])return message.reply('Kime para ekleyeceksin?')

  let user = message.mentions.users.first() || message.author;
  message.channel.send(`${user}` + ` Bakiyenize **${args[1]}¥¥¥** eklendi.`)
  db.add(`money_${message.guild.id}_${user.id}`, args[1]);
  const yeni = db.fetch(`money_${message.guild.id}_${user.id}`)
  const embed = new Discord.MessageEmbed()
    .setAuthor(`${user.tag} Para Eklendi!`, user.displayAvatarURL)
    .setDescription('Yeni Bakiye :`' + `${yeni}¥` + '`\n\nEklenen Miktar :`' + `${args[1]}¥` + "`")
    .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
    .setThumbnail(user.displayAvatarURL({dynamic : true}))
    .setTimestamp()
  message.channel.send(embed);

}
module.exports.conf = {
  aliases: ["paraekle" , "pe" , "addbal" , "addbalance"],
  permLevel: 3
}
exports.help = {
  name: "pekle",
}