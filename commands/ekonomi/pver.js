const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, message, args) => {

    
    let user = message.mentions.users.first(); 
    let role = message.mentions.roles.first();
    let miktar = args.slice(1).join(' ');
    let member = db.fetch(`money_${message.guild.id}_${message.author.id}`);
    let altın = await db.fetch(`money_${message.guild.id}_${user.id}`);
        if(altın === null) altın = 0;
    if (!user) {
      if(!role){
        return message.channel.send('Parayı kime atacaksın?')
      }
      
      //for()
        
    }
    if (!args[1]) {
        return message.channel.send('Göndereceğiniz miktarı giriniz')
    }
    if (message.content.includes('-')) {
        return message.channel.send('IQ seviyeni değil göndereceğin miktarı yaz.')
    }


    if (member < miktar) {
        return message.channel.send(`Yetersiz Bakiye.`)


    }


    message.channel.send(`${message.author}, Başarıyla ${user} kişisine **${miktar}¥¥¥** gönderdin.`)
    db.subtract(`money_${message.guild.id}_${message.author.id}`, miktar)
    db.add(`money_${message.guild.id}_${user.id}`, miktar);
    const yeni = db.fetch(`money_${message.guild.id}_${user.id}`)
    const embed = new Discord.MessageEmbed()
    .setDescription("Kullanıcının Yeni Bakiyesi :`" + `${yeni}¥` + "`\n\n Gönderilen Miktar :`" + `${miktar}¥` + "`")
    .setAuthor(`${user.tag}` , user.displayAvatarURL({dynamic : true}))
    .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
    .setThumbnail(user.displayAvatarURL({dynamic : true}))
    .setTimestamp()
    message.channel.send(embed);
}

module.exports.conf = {
    aliases: ["pv" , "paraver"],
    permLevel: 3
  }
  exports.help = {
    name: "pekle",
  }