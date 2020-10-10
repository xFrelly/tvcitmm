const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () =>{
    console.log(`Botun ${client.user.tag} aktif!`)
})

client.on('message' , message =>{
    if(message.content === 'Selam')
    message.reply('Sana da Selam')
});

client.login(procces.env.token)