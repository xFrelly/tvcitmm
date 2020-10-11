const Dicord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
    const ss = '----';
    const embed = new Dicord.MessageEmbed()
        .setColor('RANDOM')
        .setImage('https://miro.medium.com/fit/c/336/336/2*QUJcwNlajvPsLo01H9o7yQ.jpeg')
        .addField('Bir sonraki hamlen ne olacak?', ss)
    message.channel.send(embed);
}

module.exports.config = {
    name: "rulet",
    description: "",
    usage: "!rulet",
    accessableby: "Membes",
    aliases: [""],
}
