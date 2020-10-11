const Dicord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client , message , args) => {
 const renk = '*!rulet-kırmızı*'
 const ss = '=>||<='
 const embed = new Dicord.MessageEmbed()

 .setColor('RANDOM')
 .setTitle('Ruleti Renklere göre oynamaya karar verdin işte kurallar...')
 .setDescription('!rulet-bahis (gireceğin miktar) ile bir bahis yatır ve ardından kırmızı ' + 
 'siyah' + ' veya yeşil renklerinden birini seç örnek olarak' , '```!rulet-kırmızı```')
 .addField('Başarılar...', ss)

 message.channel.send(embed);
 
}
module.exports.config = {
    name : "rulet-renk",
    description : "",
    usage : "!rulet-renk",
    accessableby : "Members",
    aliases : [""],
}