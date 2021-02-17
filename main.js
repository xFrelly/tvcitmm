const Discord = require('discord.js')
const client = new Discord.Client();
const command = require('./command')
const ayarlar = require('./config.json');
const poll = require('./poll')
const fs = require('fs')
const mongoose = require('mongoose')
const Levels = require('discord-xp')

client.on('guildMemberAdd' , member => {

})

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

client.on('ready', () => {
       console.log('Bot şu anda aktif!')
     let mesajlar = [
        "!yardım",
         "Dynamic Code"
          ]
          let statü = [
            "idle",
            "dnd",
            "online"
          ]
          setInterval(function() {
          let randomstatü = statü[Math.floor(Math.random() * statü.length)] 
        
          client.user.setStatus(randomstatü)
          },3000)
          setInterval(function(){
            let randommesaj = mesajlar[Math.floor(Math.random() * mesajlar.length)] 
            client.user.setActivity(randommesaj)
          },3000)
        });
        
        const isValidCommand = (message, cmdName) => message.content.toLowerCase().startsWith(PREFİX + cmdName);
        
        const fs = require('fs')
        client.commands = new Discord.Collection()
        client.aliases = new Discord.Collection()
        
        fs.readdirSync('./commands').forEach(dir => {
          const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'))
          for (const file of commandFiles){
            const komutlar = require(`./commands/${dir}/${file}`)
            const table = new AsciiTable('Dynamic Code Guard')
        
            table
            .setHeading("Komut" , "Status" , "Aliases")
        
            if(komutlar.help.name){
              client.commands.set(komutlar.help.name , komutlar)
              table.addRow(komutlar.help.name , "✔️" , komutlar.conf.aliases)
            }else {
              table.addRow(komutlar.help.name , "❌")
              continue;
            }
            komutlar.conf.aliases.forEach(alias => {
              client.aliases.set(alias ,komutlar.help.name)
            });
            console.log(table.toString())
          }
        })
        
client.on('message' , message => {
          let client = message.client;
          if(message.author.bot) return;
          if(!message.content.startsWith(PREFİX)) return;
          let command = message.content.split(' ')[0].slice(PREFİX.length)
          let params = message.content.split(' ').slice(1)
          let perms = client.elevation(message)
          let cmd;
          if(client.commands.has(command)) {
            cmd = client.commands.get(command)
          }else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command))
          }
          if(cmd){
            if(perms < cmd.conf.permLevel)return;
            cmd.run(client , message , params , perms)
          }
        })
        
        client.elevation = message => {
          if(!message.guild) return;
          let permlvl = 0;
          if(message.member.hasPermission('KICK_MEMBERS')) permlvl = 1
          if(message.member.hasPermission('BAN_MEMBERS')) permlvl = 2;
          if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
          if(message.member.hasPermission('MANAGE_NICKNAMES')) permlvl = 4;
          if(message.member.hasPermission("MANAGE_GUILD")) permlvl = 5;
          if(message.author.id === ayarlar.authorid) permlvl = 6
        }
        
        
        client.on('message', function (message) {
          let args = message.content.substring(PREFİX.length).split(' ');
          if (isValidCommand(message, 'temizle')) {
            if (!args[0]) return message.channel.send('Lütfen kaç mesaj sileceğinizi yazınız.');
            message.channel.bulkDelete(args[1], args[1]);
          }
        });



        client.on('message', async message => {// can#0002
          if(message.author.bot || message.channel.type !== 'text') return;
          if(message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':')).length > 1) {
          let emojiler = [];
          message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':')).forEach(x => {
          emojiler.push(message.guild.emojis.cache.find(s => s.name.includes(x.replace(/:/g, ''))));
          });
          let newMessage;
          var d = -1;
          if(emojiler.length >= 1) {
          emojiler.forEach(s => {
          d++
          if(!newMessage) newMessage = message.content.replace(message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':'))[d], s);
          if(newMessage) newMessage = newMessage.replace(message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':'))[d], s);
          });
          };
          return message.delete() && message.channel.send(`**${message.author.tag}**: ${newMessage}`);
          };
          let emoji = message.content.split(' ').find(x => x.startsWith(':') && x.endsWith(':')).toString().replace(/:/g, '');
          let emojii = message.guild.emojis.cache.find(x => x.name.includes(emoji));
          if(!emojii) return;
          message.content = message.content.replace(message.content.split(' ').find(x => x.startsWith(':') && x.endsWith(':')), emojii);
          return message.delete() && message.channel.send(`**${message.author.tag}**: ${message.content}`);
          });
          const express = require("express"); // satır hata verirse silin
          const app = express(); // satır hata verirse silin
          
          app.get("/", (req, res) => res.send("Bot şu anda aktif"));
          app.listen(process.env.PORT, () =>
            console.log("Port ayarlandı:" + process.env.PORT)
          );
          
          const guildInvites = new Map();
          
          client.on("ready", () => {
            client.guilds.cache.forEach(guild => {
              guild.fetchInvites()
              .then(invites => guildInvites.set(guild.id, invites))
              .catch(err => console.log(err));
              });
          });
          client.on('inviteCreate', async invite => {
            guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
          });
          client.on('guildMemberAdd', async member => {
            const cachedInvites = guildInvites.get(member.guild.id);
            const newInvites = await member.guild.fetchInvites();
            guildInvites.set(member.guild.id, newInvites);
            try {
              console.log("Davet Eklendi")
              const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
              const currentInvites = await db.get(`inv.${usedInvite.inviter.id}.total`)
              if(currentInvites) {
                db.set(`inv.${member.id}.inviter`, usedInvite.inviter.id)
                db.add(`${usedInvite.inviter.id}`, 1)
              } else {
                db.set(`inv.${usedInvite.inviter.id}.total`, 1)
                db.set(`inv.${member.id}.inviter`, usedInvite.inviter.id)
              }
            }
            catch(err) {
              console.log(err);
            }
          });
          
          client.on('guildMemberRemove', async member => {
            const inviter = await db.get(`inv.${member.id}.inviter`)
            const userinviter = await member.guild.members.fetch(`${inviter}`);
            const currentInvites = await db.get(`inv.${inviter}.total`)
            try {
              console.log("Davet Silindi")
              db.add(`inv.${inviter}.total`, -1)
              db.delete(`inv.${member.id}.inviter`)
            } catch(err) {
              console.log(err);
            }
          });
          
          client.login(process.env.token);
