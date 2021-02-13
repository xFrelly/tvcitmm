const Discord = require('discord.js')

module.exports.run = async(client , message ,args) => {
 let role = message.mentions.roles.first();
 const member = message.mentions.members.first();
 let user = args.slice(2).join(' ')
 if(!role) {
     message.channel.send('Hangi rolü sileceksin?')
 } else if(!member) {
     message.channel.send('Rolü kimden sileceksin? ?')
 } else if(!message.member.hasPermission('MANAGE_ROLES')) { message.channel.send('Bu komutu kullanmak için gerekli iznin yok!')
} else {
     member.roles.remove(role.id)
     const embed = new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setDescription(`${member} kişisinden ${role} rolü başarıyla silindi!`)
     .setFooter('New role system by Cem Gökmen')
     .setTimestamp()
     message.channel.send(embed)
 }
}

module.exports.config = {
    name : 'rolsil',
    aliases : ['']
}