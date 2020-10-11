const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client , message , args , miktar) =>{
    const kırmızı = 1;
        const yeşil = 3;
        const siyah = 2;
        const renkler = 'Kırmızı , Siyah , Yeşil';
        const çark = () => Math.floor(Math.random() * 3) + 1;

    if(args[0] === 'kırmızı'){
        message.reply('Gelen renk...' + çark)
    if(kırmızı){
        message.channel.send(`Tebrikler ${miktar}$ para kazandınız.`)
        db.add(`money_${message.guild.id}_${message.author.id}` , miktar);
    }else{
        message.channel.send(`Tüh! ${miktar}$ para kaybettiniz.`)
        db.subtract(`money_${message.guild.id}_${message.author.id}` , miktar);
    };
}
}