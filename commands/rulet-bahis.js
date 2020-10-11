const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
    const member = db.fetch(`money_${message.guild.id}_${message.author.id}`);
    let miktar = args.slice(1).join(' ');
    if (!isNaN(miktar)) message.channel.send('Geçerli bir miktar gir.');

    let user = message.mentions.users.first() || message.author;
    if (member < miktar) {
        message.channel.send('Yetersiz bakiye...')
    }else{
        message.channel.send(`${user} ` + `rulete ${miktar}$$$ para yatırdı.`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, miktar)
    }


}
module.exports.config = {
    name: "rulet-bahis",
    description: "",
    usage: "",
    accessableby: "",
    aliases: [""],
}