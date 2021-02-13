module.exports = (client) => {
    const channelIds = [
        '777619484105244684', '780323550631297054',
]

    const addReactions = (message) => {
        message.react('👍')

        setTimeout(() => {
            message.react('👎')
        }, 750);
    }
    client.on('message' , async (message) => {
        if(channelIds.includes(message.channel.id)){
            addReactions(message);
        } else if(message.content.toLowerCase() === 'c!poll') {
        await message.delete();

        const fetched = await message.channel.messages.fetch({ limit:1 })
        if(fetched && fetched.first()) {
            addReactions(fetched.first())
        }
      }
    })
}