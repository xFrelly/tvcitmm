const Canvas = require('canvas')
const Discord = require('discord.js')

module.exports.run = async (client , message , args) => {
    if(!args[1]) {
        var user = message.author;
    }else {
        var user = message.mentions.users.first() || client.users.cache.get(args[1])
    }
    var member = message.guild.member(user)

    const canvas = Canvas.createCanvas(500 , 200)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage('https://media.istockphoto.com/photos/blue-abstract-background-or-texture-picture-id1138395421?k=6&m=1138395421&s=612x612&w=0&h=bJ1SRWujCgg3QWzkGPgaRiArNYohPl7-Wc4p_Fa_cyA=')
    ctx.drawImage(background , 0 , 0 ,canvas.width , canvas.height)

    ctx.strokeStyle('RANDOM')
    ctx.strokeRect(0 , 0 , canvas.width , canvas.height)

    ctx.fillStyle('RANDOM');
    const size1 = 40;
    const size2 = 30;
    const size3 = 30;

    var name = user.tag;

    do {
        ctx.font = `${size1 -= 5}px sans-serif`
    }while (ctx.measureText(name).width > canvas.width - 225)
    do {
        ctx.font = `${size1 -= 5}px sans-serif`
    }while (ctx.measureText(name).width > canvas.width - 225)
    do {
        ctx.font = `${size1 -= 5}px sans-serif`
    }while (ctx.measureText(name).width > canvas.width - 225)
}
module.exports.config = {
    name : 'canvas',
    aliases : [""]
}