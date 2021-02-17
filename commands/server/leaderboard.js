const db = require('quick.db')
const Discord = require('discord.js')

module.exports.run = async (client , message , args) => {
    let cash = db.all().filter(data => data.ID.startsWith(`money_${message.guild.id}`)).sort((a , b) => b.data - a.data)
    cash.length = 15;
    var finalLb = "";
    if(!args[1]){
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic : true}))
    .setColor('RANDOM')
    .setDescription('Hangi listeyi istediğini belirtmedin.')
    .addFields({
        name : 'Kullanım : ',
        value : '`c!sıralama <zenginlik> || <level>`',
        inline : true
    })
    .setFooter(message.client.user.username , message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp()
    message.channel.send(embed);

}else if(args[1] === 'zenginlik') {
        for (var i in cash) {
            finalLb += `**${cash.indexOf(cash[i])+1}. <@${message.client.users.cache.get(cash[i].ID.split('_')[2]) ? message.client.users.cache.get(cash[i].ID.split('_')[2]).id : "Bilinmeyen Kullanıcı#0000"}>** •  ${cash[i].data}\n`;
        }
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name} sunucusunun Zenginlik Sıralaması`, 'https://media.discordapp.net/attachments/506838906872922145/506899959816126493/h5D6Ei0.png')
            .setColor("#7289da")
            .setDescription(finalLb)
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed);
    }

}
module.exports.config = {
    name : 'sıralama',
    aliases : ['']
}