const Discord = require('discord.js')

module.exports.run = async(client,message,args) =>{
    
    //Öncelikle atılacak kanal linkinin embed(tabela) şeklinde bir şeklini oluşturalım.
    let link = "https://www.youtube.com/channel/UCHgxUgT3pmsGnDTy9Vi6prA";
    const i= "Kanal Linki"
    let embed = new Discord.MessageEmbed()
        .setColor("BLUE")
            .setThumbnail("https://yt3.ggpht.com/a/AATXAJzWtPuHOtP1i3P085ZW5u9b7FeTrn58RbCiUSUY5A=s176-c-k-c0x00ffffff-no-rj")
                .setDescription("Kanalımıza abone olarak bize destek ol işte linki !")
                    .addField('*Kanal Linki* : ' ,link);

                    message.channel.send(embed)
}


module.exports.conf = {
    aliases: ["cyt"],
    permLevel: 0
  }
  exports.help = {
    name: "cousins",
  }