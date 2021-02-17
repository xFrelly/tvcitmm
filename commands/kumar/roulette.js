const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {
  if(!message.content.startsWith('c!'))return;  

  let user = message.author;

  function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}
    
let colour = args[0];
let money = parseInt(args[1]);
let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)

let random = Math.floor(Math.random() * 37);

let moneyhelp = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(' Kumar oynamak için belirli miktarda para yatır!\n\n`c!rulet <renk> <miktar>`')
.setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic: true}))
    .setFooter(message.client.user.username , message.author.displayAvatarURL({}))
    .setTimestamp()
let moneymore = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(` Sende olandan daha fazla parayla bahis yapıyorsun !`)
.setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic: true}))
    .setFooter(message.client.user.username , message.author.displayAvatarURL({}))
    .setTimestamp()
let colorbad = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(` Bir renk seç | **Kırmızı** [1.5x] **Siyah** [2x] **Yeşil** [15x]`)
.setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic: true}))
    .setFooter(message.client.user.username , message.author.displayAvatarURL({}))
    .setTimestamp()


    if (!colour)  return message.channel.send(colorbad);
    colour = colour.toLowerCase()
    if (!money) return message.channel.send(moneyhelp); 
    if (money > moneydb) return message.channel.send(moneymore);
    
    if (colour == "s" || colour.includes("siyah")) colour = 0;
    else if (colour == "k" || colour.includes("kırmızı")) colour = 1;
    else if (colour == "y" || colour.includes("yeşil")) colour = 2;
    else return message.channel.send(colorbad);
    
    
    
    if (random == 0 && colour == 2) { // Green
        money *= 15
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed1 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` Tebrikler! **${money}** $ kazandın! \n\nÇarpım: 15x`)
        .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic: true}))
        .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
    .setTimestamp()
        message.channel.send(moneyEmbed1)
        console.log(`${message.author.tag} yeşilden ${money} $ para kazandı`)
    } else if (isOdd(random) && colour == 1) { // Red
        money = parseInt(money * 1.5)
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` Tebrikler **${money}** $ kazandın\n\nÇarpım: 1.5x`)
        .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic: true}))
        .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
    .setTimestamp()
        message.channel.send(moneyEmbed2)
    } else if (!isOdd(random) && colour == 0) { // Black
        money = parseInt(money * 2)
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` Tebrikler **${money}** $ kazandın\n\nÇarpım: 2x`)
        .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic: true}))
        .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
    .setTimestamp()
        message.channel.send(moneyEmbed3)
    } else { // Wrong
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed4 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(` Üzgünüm! **${money}** $ para kaybettin\n\nÇarpım: 0x`)
        .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic: true}))
        .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
        .setTimestamp()
        message.channel.send(moneyEmbed4)
    }
}

  
module.exports.conf = {
    aliases: ["rulet"],
    permLevel: 0
  }
  exports.help = {
    name: "roulette",
  }