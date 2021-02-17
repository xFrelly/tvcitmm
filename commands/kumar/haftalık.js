const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {
  if(!message.content.startsWith('c!'))return;  

  let user = message.author;
  let timeout = 604800000;
  let amount = 1500;

  let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

  if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`✅ Zaten haftalık paranı topladın!\n\n **${time.days}***gün* **${time.hours}***saat* **${time.minutes}***dk* **${time.seconds}***saniye* sonra yeniden topla ! `)
    .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic : true}))
  .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
  .setTimestamp()
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`✅ Haftalık paranı topladın! **${amount}** $ Kazandın!`)
  .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic : true}))
  .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
  .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
  .setTimestamp()
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.conf = {
  aliases: ["haftalık" , "weekly"],
  permLevel: 0
}
exports.help = {
  name: "haftalık-topla",
}