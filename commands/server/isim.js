const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_NICKNAMES")) return message.channel.send("Bu komutu kullanabilmek için `Yetkili` rolüne sahip olmanız gerek.");
    let isim = args.slice(1).join(' ');
    let kullanici = message.mentions.members.first();
    if(!kullanici) return message.reply(`Lütfen bir kullanıcı girin.`)
    if(!isim) return message.reply(`Lütfen bir kullanıcı adı girin.`)
    if(isim.length > 32) return message.reply(`:warning: Lütfen \`32\` karakteri geçmeyecek şekilde bir isim giriniz!`)
    message.guild.members.cache.get(kullanici.id).setNickname(`${isim}`)
    message.react('✅')
}

module.exports.conf = {
    aliases: ["isimdeğiştir" , "nick" , "nickname"],
    permLevel: 4
  }
  exports.help = {
    name: "isim",
  }