const Discord = require('discord.js')

module.exports.run = async(client , message ,args) => {
 let role = message.mentions.roles.first();
 const member = message.mentions.members.first();
 let user = args.slice(1).join(' ')
 if(!role) {
     message.channel.send('Hangi rolü ekleyeceksin?')
 } else if(!member) {
     message.channel.send('Rolü kime ekleyeceksin ?')
 } else if(!message.member.hasPermission('MANAGE_ROLES')) { message.channel.send('Bu komutu kullanmak için gerekli iznin yok!')
}else {
     member.roles.add(role.id)
     const embed = new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setDescription(`${member} kişisine ${role} rolü başarıyla eklendi!`)
     .setFooter('Yapımcım : Cem❦#6575' , client.user.avatarURL({dynamic : true}))
     .setTimestamp()
     message.channel.send(embed)
 }
}

module.exports.conf = {
    aliases : ["rolekle" , "addrole" , "rol"],
    permLevel : 3
  }
  exports.help = {
    name : "rol"
  }