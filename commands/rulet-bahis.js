const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
    const member = db.fetch(`money_${message.guild.id}_${message.author.id}`);
    const user = message.mentions.users.first() || message.author;

        if(!args[0]){
            message.channel.send('*Paran yoksa oynamayalım*')
        }
        if(isNaN(args[0])){
            message.channel.send('**Geçerli bir sayı gir.**')
        }
        if(args[0] > member){
            message.channel.send('Sende o kadar para yok.')
        }else{
            message.channel.send(`${user}` + ` **${args[0]}$** kadar rulete bahis yatırdı! Bol Şans!!`)
            db.subtract(`money_${message.guild.id}_${message.author.id}` , args[0])
        }

}
module.exports.config = {
    name: "ruletbahis",
    description: "",
    usage: "!ruletbahis",
    accessableby: "",
    aliases: ["rulet-bahis"],
}