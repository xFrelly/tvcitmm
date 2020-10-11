const Dicord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
    const ss = 'Rulet ; içinde 18 Kırmızı 18 Siyah ve 1 Yeşil kısmın bulunduğu para kazandıran bir çark oyunudur.';
    const sad = '==>0<=='
    const embed = new Dicord.MessageEmbed()
        .setColor('RANDOM')
        .setImage('https://miro.medium.com/fit/c/336/336/2*QUJcwNlajvPsLo01H9o7yQ.jpeg')
        .addField('Rulet Nedir?', ss)
        .setDescription('**Rulet Nasıl Oynanır?**' + 
        'Rulet hem sayılarla ve renklerle oynanabilir. Eğer Renklerle oynanacaksa bir renk seçilir ve dönen çarka bir top atılır.' + 
        'Eğer top seçtiğiniz renge gelirse yatırdığınız bahis kadar para kazanırsınız.')
        .addField('İyi eğlenceler...' , sad)
    message.channel.send(embed);
}

module.exports.config = {
    name: "ruletnedir",
    description: "",
    usage: "!ruletnedir",
    accessableby: "Membes",
    aliases: [""],
}
