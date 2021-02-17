const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

module.exports.run = async(client ,message , args) => {
    let kutu = await db.fetch(`kutu_${message.guild.id}_${user.id}`);
    if(args[2] === '1'){
        const timeout = 43200000;
        const Para1 = [200 , 300 , 400 , 500 , 600 , 700 , 800 , 900 , 1000 , 1100 , 1200 , 1300 , 1400 , 1500]
        const randomPara1 = para1[Math.floor(Math.random() * Para1.length)]
    const embed = new Discord.MessageEmbed()
    .setDescription('📦 1. Kutu açıldı ve içinden çıkan ödül :' + `${randomPara1} $ Tebrikler!`)
    .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic : true}))
    .setFooter(message.client.user.username , message.client.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed)

    }
}
module.exports.config = {
    name : 'kutu',
    aliases : [""]
}