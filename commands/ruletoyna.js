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
        }
        client.on("miktar", async _miktar => {
            let commandFile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
            if (commandFile) commandFile.run(client, message, args)
        });
    
  }
}


module.exports.config = {
    name: "rulet",
    description: "",
    usage: "!rulet",
    accessableby: "Members",
    aliases: ["rulet"],
}