const Dicord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client , message , args) => {
    const üst = '________----------________'
    const üstalt = '||'
    const üstaltlt = '|||'
    const üstaltaltalt = '||||'
    const alt1 = '|||'
    const alt2 = '||'
    const alt = '_________----------_________'

    const embed = new Dicord.MessageEmbed()
    .setColor('RANDOM')
    .addField(üst)
    .addField(üstalt)
    .addField(üstaltlt)
    .addField(üstaltaltalt)
    .addField(alt1)
    .addField(alt2)
    .addField(alt)
    message.channel.send(embed);
}

module.exports.config = {
    name : "rulet",
    description : "",
    usage : "!rulet",
    accessableby : "Membes",
    aliases : [""],
}
