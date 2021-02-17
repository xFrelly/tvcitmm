const Discord = require('discord.js')

module.exports.run = async(client , message , args) => {
    let tepki = ["✅" , "❌"]
let oylama = args.slice(1).join(' ')
let embed = new Discord.MessageEmbed()
.setAuthor(message.author.username , message.author.avatarURL({dynamic : true}))
.setThumbnail(message.guild.iconURL({dynamic : true}))
.setTitle(`${message.author}, bir oylama başlattı.`)
.setDescription(`Oylama içeriği: \n\n${oylama}`)
.addField(`Oylamak için aşağıdaki tepkilere basın.` , tepki)
.setFooter(`ID: ${message.author.id}` , client.user.avatarURL({dynamic : true}))
.setTimestamp()
message.channel.send(embed)
}
module.exports.conf = {
    aliases : ['oylama' , "demokrasi"],
    permLevel: 5
}
exports.help = {
    name : "oyla"
}