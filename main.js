const Discord = require('discord.js');
const client = new Discord.Client();
const command = require('./command/command')
const db = require('quick.db')

client.on('ready', () =>{
    console.log(`Botun ${client.user.tag} aktif!`)
})

const fs = require("fs");
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
  let prefix = '!';
  let args = message.content.slice(prefix.length).trim().split(/ +/g)
  let commands = args.shift().toLowerCase();
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  if (!message.content.startsWith(prefix)) return;
  let commandFile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
  if (commandFile) commandFile.run(client, message, args)

});

client.on('message' , message =>{
    if(message.content === 'Selam')
    message.reply('Sana da Selam')
});

command(client, 'yasakla', (message) => {
  const { member, mentions } = message;

  const tag = `<@${member.id}>`;

  if (
    member.hasPermission('ADMINISTRATOR') ||
    member.hasPermission('BAN_MEMBERS')
  ) {
    const target = mentions.users.first();
    if (target) {
      const targetMember = message.guild.members.cache.get(target.id);
      targetMember.ban()
      message.channel.send(`${tag} https://i.pinimg.com/originals/05/05/0e/05050ebee6a2927ea3e8846f0fe57ffd.gif`)
    } else {
      message.channel.send(`${tag} lütfen banlamak için birini etiketleyin.`)
    }
  } else {
    message.channel.send(
      `${tag} bu komutu kullanmak için izne sahip değilsin.`
    )
  }
})

command(client, 'tükür', (message) => {
  const { member, mentions } = message;

  const tag = `<@${member.id}>`;

  if (
    member.hasPermission('ADMINISTRATOR') ||
    member.hasPermission('KICK_MEMBERS')
  ) {
    const target = mentions.users.first();
    if (target) {
      const targetMember = message.guild.members.cache.get(target.id);
      targetMember.kick()
      message.channel.send(`${tag} https://i.pinimg.com/originals/05/05/0e/05050ebee6a2927ea3e8846f0fe57ffd.gif`)
    } else {
      message.channel.send(`${tag} lütfen atmak için birini etiketleyin.`)
    }
  } else {
    message.channel.send(
      `${tag} bu komutu kullanmak için izne sahip değilsin.`
    )
  }
});


client.login(process.env.token)