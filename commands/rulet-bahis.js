const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
    const member = db.fetch(`money_${message.guild.id}_${message.author.id}`);
    const miktar = args.slice(1).join(' ');
    const user = message.mentions.users.first() || message.author;

        if(!miktar){
            message.channel.send('*Paran yoksa oynamayalım*')
        }
        if(isNaN(miktar)){
            message.channel.send('**Geçerli bir sayı gir.**')
        }
        if(miktar > member){
            message.channel.send('Sende o kadar para yok.')
        }else{
            message.channel.send(`${user}` + ` **${miktar}$** kadar rulete bahis yatırdı! Bol Şans!!`)
            db.subtract(`money_${message.guild.id}_${message.author.id}` , miktar)
        }

}
module.exports.config = {
    name: "ruletbahis",
    description: "",
    usage: "!ruletbahis",
    accessableby: "",
    aliases: ["rulet-bahis"],
}