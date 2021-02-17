const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('c!'))return;  

  let user = message.author;

  let timeout = 86400000;
  let miktar = [200 , 250 , 300 , 350 , 400 , 450 , 500]
  let amount = miktar[Math.floor(Math.random() * miktar.length)]

  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`${user} Çoktan günlük maaşını aldın !\n\n ${time.hours}s ${time.minutes}dk ${time.seconds}saniye sonra yeniden topla! `)
    .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic : true}))
    .setFooter(message.client.user.username , message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp()
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`${user} bugünkü günlük gelirin **${amount}$** kadar!`)
  .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic : true}))
  .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
  .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp()
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${message.author.id}`, amount)
  db.set(`daily_${message.guild.id}_${message.author.id}`, Date.now())


  }
};


module.exports.config = {
  name:"günlük",
  aliases: ["day , daily"]
}