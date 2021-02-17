const slotItems = ["🍇", "🍉", "🍊", "🍎", "<:7_:618765717499805706>", "🍓", "🍒"];
const db = require("quick.db");
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!message.content.startsWith('c!'))return;  

    let user = message.author;
    let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

    let moneymore = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❎ Sende olan paradan daha fazlasını yatıramazsın!`)
    .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic: true}))
    .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
    .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp()

    let moneyhelp = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❎ Bir miktar gir.`)
    .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic: true}))
    .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
    .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp()

    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nTebrikler! **${money}** $ para kazandın`)
            .setColor("#FFFFFF")
            .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic: true}))
            .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
            .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp()
        message.channel.send(slotsEmbed1)
        db.add(`money_${message.guild.id}_${user.id}`, money)
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nÜzgünüm! **${money}** $ para kaybettin. `)
            .setColor("#FFFFFF")
            .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic: true}))
            .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
            .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp()
        message.channel.send(slotsEmbed)
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
    }

}
  
module.exports.conf = {
    aliases: ["slot"],
    permLevel: 0
  }
  exports.help = {
    name: "slot--oyna",
  }