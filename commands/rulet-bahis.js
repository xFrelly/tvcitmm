const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
    const member = db.fetch(`money_${message.guild.id}_${message.author.id}`);

    if (!isNaN(args[1])) message.channel.send('Geçerli bir miktar gir.');

    let user = message.mentions.users.first() || message.author;
    if (member < args[1]) {
        message.channel.send('Yetersiz bakiye...')
    }else{
        message.channel.send(`${user} , rulete ${args[1]}$$$ para yatırdı.`)
        db.subtract(`money_${message.guild.id}_${message.author.id}` , args[1])
    }


}
module.exports.config = {
    name: "rulet-bahis",
    description: "",
    usage: "",
    accessableby: "",
    aliases: [""],
}