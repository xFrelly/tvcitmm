
const db = require('quick.db')

const Discord = require('discord.js');

module.exports.run = async(client , message , args) => {
    const miktar = parseInt(args[2])
    const para = await db.fetch(`money_${message.guild.id}_${message.author.id}`)
    const coin = ['Yazı' , 'Tura']
    const coinFlip = coin[Math.floor(Math.random() * coin.length)]

    if(!args[1]) {
        const embed = new Discord.MessageEmbed()
        .setDescription('Yazı mı Tura mı ?')
        .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic : true}))
        .setFooter(message.client.user.username , message.client.user.displayAvatarURL())
        .setTimestamp()
        message.channel.send(embed)
    }
    if(!args[2]) {
        const embed = new Discord.MessageEmbed()
        .setDescription('Kaç para yatıracaksın ?')
        .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic : true}))
        .setFooter(message.client.user.username , message.client.user.displayAvatarURL())
        .setTimestamp()
        message.channel.send(embed)
    }
    if(args[2]) {
        if(args[1] === 'yazı') {
            if(coinFlip === 'Yazı') {
            db.add(`money_${message.guild.id}_${message.author.id}` , miktar)
            const para2 = await db.fetch(`money_${message.guild.id}_${message.author.id}`)
            const embed = new Discord.MessageEmbed()
        .setDescription('Kazandın ! Cousins parayı fırlattı ve sonuç :' + `**Yazı**`)
        .addFields({
            name : 'Yeni bakiye :',
            value : '`' + `${para2}` + '`',
            inline : true
        },
        {
            name : 'Kazanılan para :',
            value : '`' + `${miktar}` + '`',
            inline : true
        }
        )
        .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic : true}))
        .setFooter(message.client.user.username , message.client.user.displayAvatarURL())
        .setTimestamp()
        message.channel.send(embed)
            }
            if(coinFlip === 'Tura') {
                db.subtract(`money_${message.guild.id}_${message.author.id}` , miktar)
                const para1 = await db.fetch(`money_${message.guild.id}_${message.author.id}`)
            const embed = new Discord.MessageEmbed()
        .setDescription('Kaybettin ! Cousins parayı fırlattı ve sonuç :' + `**Tura**`)
        .addFields({
            name : 'Yeni bakiye :',
            value : '`' + `${para1}` + '`',
            inline : true
        },
        {
            name : 'Kaybedilen para :',
            value : '`' + `${miktar}` + '`',
            inline : true
        }
        )
        .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic : true}))
        .setFooter(message.client.user.username , message.client.user.displayAvatarURL())
        .setTimestamp()
        message.channel.send(embed)
            }
        }
        if(args[1] === 'tura') {
                if(coinFlip === 'Tura') {
                db.add(`money_${message.guild.id}_${message.author.id}` , miktar)
                const para3 = await db.fetch(`money_${message.guild.id}_${message.author.id}`)
                const embed = new Discord.MessageEmbed()
            .setDescription('Kazandın ! Cousins parayı fırlattı ve sonuç :' + `**Tura**`)
            .addFields({
                name : 'Yeni bakiye :',
                value : '`' + `${para3}` + '`',
                inline : true
            },
            {
                name : 'Kazanılan para :',
                value : '`' + `${miktar}` + '`',
                inline : true
            }
            )
            .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic : true}))
            .setFooter(message.client.user.username , message.client.user.displayAvatarURL())
            .setTimestamp()
            message.channel.send(embed)
                }
                if(coinFlip === 'Yazı') {
                    db.subtract(`money_${message.guild.id}_${message.author.id}` , miktar)
                    const para4 = await db.fetch(`money_${message.guild.id}_${message.author.id}`)
                const embed = new Discord.MessageEmbed()
            .setDescription('Kaybettin ! Cousins parayı fırlattı ve sonuç :' + `**Yazı**`)
            .addFields({
                name : 'Yeni bakiye :',
                value : '`' + `${para4}` + '`',
                inline : true
            },
            {
                name : 'Kaybedilen para :',
                value : '`' + `${miktar}` + '`',
                inline : true
            }
            )
            .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic : true}))
            .setFooter(message.client.user.username , message.client.user.displayAvatarURL())
            .setTimestamp()
            message.channel.send(embed)
                }

        }
    }
}

module.exports.config = {
    name : 'yazıtura',
    aliases : ['yt']
}