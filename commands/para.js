const discord = require('discord.js')
const db = require('quick.db');

module.exports.run = async(client , message , args) =>{
    let kişi = message.mentions.members.first();

 let bakiye = await db.fetch(`money_${message.guild.id}_${kişi.id}`)
 if(bakiye === null)bakiye = 0;
 message.channel.send(`${user.tag} , bakiyeniz şu anda **${bakiye}$** miktarında.`)
}
module.exports.config = {
name : "bakiye",
description : "",
usage : "!bakiye",
accesableby : "Members",
aliases : '',
}