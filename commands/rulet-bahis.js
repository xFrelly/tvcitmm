const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
    const kisi = db.fetch(`money_${message.guild.id}_${message.author.id}`);

    if (!isNaN(args[1])) message.channel.send('Geçerli bir miktar gir.');

    let user = message.mentions.users.first() || message.author;
    if (args[1] > kisi) {
        message.channel.send(`${user} kişisi rulete ${args[1]}$$$ bahis yatırdı!`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])
    } else {
        message.channel.send('Yetersiz bakiye.')
    }


}
module.exports.config = {
    name: "rulet-bahis",
    description: "",
    usage: "",
    accessableby: "",
    aliases: [""],
}