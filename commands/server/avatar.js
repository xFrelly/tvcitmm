const Discord = require('discord.js')

module.exports.run = async(client , message ,args) => {
    const user = message.mentions.users.first()|| message.author;

    if(!user) {
        const embed = new Discord.MessageEmbed()
        .setDescription(`İşte avatarın :`)
        .setImage(message.author.displayAvatarURL({dynamic : true , size : 4096}))
        .setTimestamp()
        .setFooter(message.client.user.username , message.client.user.displayAvatarURL())
        message.channel.send(embed)
    } else {
        const embed = new Discord.MessageEmbed()
        .setDescription(`İşte ${user}'ın avatarı`)
        .setImage(user.displayAvatarURL({dynamic : true , size : 4096}))
        .setTimestamp()
        .setFooter(message.client.user.username , message.client.user.displayAvatarURL())
        message.channel.send(embed)
    }
}
module.exports.conf = {
    aliases: ["av"],
    permLevel: 0
  }
  exports.help = {
    name: "avatar",
  }