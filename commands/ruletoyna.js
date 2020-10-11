const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {

    const member = db.fetch(`money_${message.guild.id}_${message.author.id}`);
    const user = message.mentions.users.first() || message.author;
    const miktar = args[1];
    if (args[0] === 'bahis') {
        if (!miktar)
            message.channel.send('*Paran yoksa oynamayalım*');

        if (isNaN(miktar))
            message.channel.send('**Geçerli bir sayı gir.**');

        if (miktar > member) {
            message.channel.send('Sen de o kadar para yok.')
        } if (miktar) {
            if (miktar < member)
                message.channel.send(`${user}` + ` rulete ${miktar} kadar para yatırdı! Şimdi ne yapacaksın Kırmızı mı Siyah mı Yeşil mi?`)
        };
    };
    const kırmızı = 1;
    const yeşil = 3;
    const siyah = 2;
    const renkler = 'Kırmızı , Siyah , Yeşil';
    const çark = () => Math.floor(Math.random() * 3) + 1;

    if (args[0] === 'kırmızı') {
        message.reply('Gelen renk...' + çark)
        if (kırmızı) {
            message.channel.send(`Tebrikler ${miktar}$ para kazandınız.`)
            db.add(`money_${message.guild.id}_${message.author.id}`, miktar);
        } else {
            message.channel.send(`Tüh! ${miktar}$ para kaybettiniz.`)
            db.subtract(`money_${message.guild.id}_${message.author.id}`, miktar);
        };
    }
}


module.exports.config = {
    name: "rulet",
    description: "",
    usage: "!rulet",
    accessableby: "Members",
    aliases: ["rulet"],
}