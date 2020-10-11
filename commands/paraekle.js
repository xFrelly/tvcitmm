const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client , message , args) =>{
    if(!message.member.roles.cache.get('764751515201175562'))
    message.channel.send('*Aynen bak şu an para ekledin .d*')
    let kişi = message.mentions.users.first() || message.author;

    if(!args[1]) message.channel.send('*IQ seviyeni değil gireceğin miktarı yaz.*')
    if(isNaN(args[1])) message.channel.send('*Geçerli bir sayı yaz.*')


    let bakiye = db.fetch(`money${message.guild.id}_${kişi.id}`)
    message.channel.send(`Başarıyla ${kişi}` + `**${args[1]}** kadar **$$$** gönderildi. Bu kullanıcının yeni bakiyesi şu anda **${bakiye}$$$**`)
    db.add(`money_${message.guild.id}_${kişi.id}` , args[1])
}
module.exports.config = {
    name : "!pekle",
    description : "",
    usage : "!pekle",
    accesableby : "Admins",
    aliases : ["!paraekle"],
}