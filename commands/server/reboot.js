const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
	
    message.channel.send(`Yeniden başlatılıyorum...`).then(message => {
    console.log(`BOT: Bot yeniden başlatılıyor...`);
    process.exit(0);
  })
};

module.exports.conf = {
  aliases : ["yeniden-başlat"],
  permLevel : 6
}
exports.help = {
  name : "reboot"
}