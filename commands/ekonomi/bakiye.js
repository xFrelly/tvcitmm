const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client , message , args) => {
    let user = message.mentions.users.first() || message.author;

    let para = await db.fetch(`money_${message.guild.id}_${user.id}`);
    if(para === null) para = 0;

    const embed = new Discord.MessageEmbed()
    .setDescription(`${user}` + ' bakiyeniz `'+ `${para}$` + '`miktarında.')
    .setAuthor(`${user.tag}`, user.displayAvatarURL({dynamic : true}))
    .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
    .setThumbnail(user.displayAvatarURL({dynamic : true}))
    .setTimestamp()
        message.channel.send(embed);
}
module.exports.conf = {
    aliases : ["para" , "bal" , "money" , "b" , "ceplik"],
    permLevel: 0
}
exports.help = {
    name : 'bakiye',
}