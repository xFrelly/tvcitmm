const Discord = require('discord.js')
const client = new Discord.Client();
const command = require('./command')
const ayarlar = require('./config.json');
const poll = require('./poll')
const fs = require('fs')
const mongoose = require('mongoose')
const Levels = require('discord-xp')


mongoose.connect(ayarlar.mongoPass,
  { useNewUrlParser: true, useUnifiedTopology: true })

Levels.setURL(ayarlar.mongoPass)

client.once('ready', () => {
  console.log(`${client.user.tag} aktif !`)
  client.user.setActivity('c!yardım')

  command(client, ['ping', 'test'], (message) => {
    message.channel.send('Pong!')
  })

  command(client, 'sunucular', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `**${guild.name}** sunucusu şu anda **${guild.memberCount}** kadar üyeye sahip`
      )
    })
  })

  command(client, ['cc', 'kanaltemizle'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })
  command(client, 'kanaloluştur', (message) => {
    if (message.member.hasPermission('MANAGE_GUILD')) {
      const isim = message.content.replace('c!kanaloluştur ', '')

      message.guild.channels
        .create(isim, {
          type: 'text',
        })
        .then((channel) => {
          console.log(channel)
          message.delete();
        })
    }
  })
  command(client, 'temizle', (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      let args = message.content.substring(ayarlar.prefix.length).split(' ');
      if (!args) {
        message.channel.send('Kaç mesaj temizlemek istiyorsun?')
      } else {
        message.channel.bulkDelete(args[1], args[1])
      }
    }
  })
  command(client, 'seskanalıoluştur', (message) => {
    if (message.member.hasPermission('MANAGE_GUILD')) {
      const isim = message.content.replace('c!seskanalıoluştur ', '')
      message.guild.channels
        .create(isim, {
          type: 'voice'
        })
        .then((channel) => {
          console.log(channel)
          channel.setUserLimit(10)
          message.delete();
        })
    } else {
      message.channel.send('Bunun için yetkiye sahip değilsin.')
    }
  })
  command(client, 'sunucuinfo', (message) => {
    const { guild } = message;

    const { name, region, memberCount, owner, afkTimeout } = guild;
    const icon = guild.iconURL();

    const embed = new Discord.MessageEmbed()

      .setTitle(`İşte ${name} sunucusunun bilgileri`)
      .setColor('RANDOM')
      .setThumbnail(icon)
      .addFields(
        {
          name: 'Bölge',
          value: region,
        },
        {
          name: 'İsim',
          value: name
        },
        {
          name: 'AFK Süresi',
          value: afkTimeout
        },
        {
          name: 'Kişi Sayısı',
          value: memberCount
        },
        {
          name: 'Sahip',
          value: owner
        }
      )
    message.channel.send(embed)

  })
  command(client, 'yardım', message => {
    const Davet = 'https://discord.com/oauth2/authorize?client_id=764404717601292318&scope=bot&permissions=2084043839'
    const embed = new Discord.MessageEmbed()
      .setDescription('**İşte Komutlarım : **')
      .addFields(
        {
          name: 'Sunucu Bilgisi',
          value: '`c!sunucuinfo , c!sunucular`',
          inline: true
        },
        {
          name: 'Kanal Oluşturma',
          value: '`c!kanaloluştur , c!seskanalıoluştur`',
          inline: true,
        },
        {
          name: 'Sohbet Temizleme',
          value: '`c!temizle <sayı> , c!cc(kanalı temizler)`',
          inline: true,

        },
        {
          name: 'Moderatör',
          value: '`c!yasakla , c!tükür , c!rolekle <rol> <kişi> , c!rolsil <rol> <kişi> , c!duyuru <kanal> <metin>`',
          inline: true,
        },
        {
          name: 'Tepki verme',
          value: '`c!poll`',
          inline: true,
        },
        {
          name : 'Ekonomi',
          value: '`c!pekle , c!pver , c!bakiye , c!günlük , c!haftalık`',
          inline: true
        },
        {
          name : 'Sıralama',
          value: '`c!sıralama <zenginlik> || <level>`',
          inline: true
        },
        {
          name : 'Eğlence :',
          value : '`c!rulet , c!slot , c!yazıtura , c!bj , c!avatar`',
          inline : true
        }


      )

      .setTitle('Davet Linki')
      .setURL(Davet, 'Davet Linki')

    message.channel.send(embed);
  })
  command(client, 'yasakla', message => {
    const { member, mentions } = message;


    if (member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${targetMember} Bu sunucudan banlandı.`)
      } else {
        message.channel.send('Lütfen banlamak için birini etiketleyiniz.')
      }
    } else {
      message.reply('Bu komutu kullanmak için gerekli izne sahip değilsin !')
    }
  })
  command(client, 'tükür', message => {
    const atılmaefekti = ['https://thumbs.gfycat.com/MindlessColorfulArmadillo.webp']
    const { member, mentions } = message;


    if (member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${targetMember} Bu sunucudan atıldı.`)
        message.channel.send(atılmaefekti)
      } else {
        message.channel.send('Lütfen atmak için birini etiketleyiniz.')
      }
    } else {
      message.reply('Bu komutu kullanmak için gerekli izne sahip değilsin !')

    }
  })
  poll(client)
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    return console.log("[LOGS] Komutları bulamadık!");
  }

  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`);
    client.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      client.aliases.set(alias, pull.config.name);
    });
  });
});

client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  let prefix = ayarlar.prefix;
  let args = message.content.slice(prefix.length).trim().split(/ +/)
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  if (!message.content.startsWith(prefix)) return;
  let ekonomiDosyası = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
  if (ekonomiDosyası) ekonomiDosyası.run(client, message, args)

});



client.login(ayarlar.token);
