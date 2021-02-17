const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
        let kanallar = message.mentions.channels.first();
    if (message.member.hasPermission('MANAGE_GUILD')) {
    
      if(message.author.bot === true) {
        return;
      }

      if(!message.guild) {
        return message.channel.send("Lütfen özel mesajlarda bu komutu kullanamayınız.")
      } else if(!kanallar) {
          message.channel.send('Lütfen duyuruyu hangi kanala atıcağını etiketle!')
      }
      var metin = args.slice(2).join(" ");
      message.channel.bulkDelete(1);
      const embed = new Discord.MessageEmbed()
      .setTitle(':scroll: Duyuru :')
      .setDescription(metin)
      .setColor(Math.floor(Math.random() * 16777214) + 1)
      .setAuthor(message.guild.name)
      .setFooter(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
      .setTimestamp()
      client.channels.cache.get(kanallar)
      kanallar.send('@everyone' , embed)
    }else{
      return message.reply('Yetkiniz yok.')
    }
};

module.exports.config = {
    name: "duyuru",
    description: "",
    usage: "!duyuru",
    accessableby: "Admins",
    aliases: [""]
    }
