const currentUsersInGame = new Set();
const Discord = require('discord.js');
const Deck = require('../utility/cardGames/deck');
const BlackjackHand = require('../utility/cardGames/blackjack/blackjachand');
const Cards = require('../utility/cardGames/cards');
const BlackjackCards = [...Cards, ...Cards, ...Cards];
const GAME_TIME = 60000;
const db = require('quick.db')
module.exports.run = async(client , message , args) => {
    if(!args[1]) {
        message.channel.send('Lütfen para yatırmak için bir miktar girin.')
    }
    if(args[1]) {
    let bet = parseInt(args[1])
    const bakiye = await db.fetch(`money_${message.guild.id}_${message.author.id}`)

      if (bet < 0) {
        return message.reply('Bahisin 0 dan büyük veya eşit olmalı !');
      }

      if (bakiye < bet && bet !== 0) {
        return message.reply(`Yetersiz bakiye ! Şu anda mevcut paran **${bakiye}** $, ve bahise girmek için ${bet - bakiye} $ kadar paraya ihtiyacın var.`);
      }

      if (currentUsersInGame.has(message.author.id)) {
        return message.reply('Zaten bir Blackjack oyunundasın !');
      }

      currentUsersInGame.add(message.author.id);

      const gameDeck = new Deck(BlackjackCards, true);
      const dealerHand = new BlackjackHand([gameDeck.drawCardOffTop(), gameDeck.drawCardOffTop()], true);
      const clientHand = new BlackjackHand([gameDeck.drawCardOffTop(), gameDeck.drawCardOffTop()], false);

      if (clientHand.getSumOfCards() === 21) {
        currentUsersInGame.delete(message.author.id);
        return bet;
      }

      const boardMsg = await message.channel.send({embed: clientHand.toGameboardEmbed(message.member.user, dealerHand, clientHand.getSumOfCards() === 21, true)});
      let gameTimeout = setTimeout(async () => {
        currentUsersInGame.delete(message.author.id);
        clientHand
          .addCard(gameDeck.drawCardOffTop())
          .addCard(gameDeck.drawCardOffTop())
          .addCard(gameDeck.drawCardOffTop())
          .addCard(gameDeck.drawCardOffTop())
          .addCard(gameDeck.drawCardOffTop())
          .addCard(gameDeck.drawCardOffTop());
        await boardMsg.edit({embed: clientHand.toGameboardEmbed(message.member.user, dealerHand, false, false)});
		betCollector.stop();
		
      }, GAME_TIME);

      const betCollector = new Discord.MessageCollector(
        message.channel,
        m => m.author.id === message.author.id,
        {time: GAME_TIME},
      );

      betCollector.on('collect', async msg => {
        let isStand = false;
        if(msg.content === 'hit'){
          clientHand.addCard(gameDeck.drawCardOffTop());
          await boardMsg.edit({embed: clientHand.toGameboardEmbed(msg.member.user, dealerHand, false, true)});
        }

        if(msg.content === 'stand' || msg.content === 'double'){
          if(msg.content === 'double' && dealerHand.cards.length === 2){
            bet *= 2;
            clientHand.addCard(gameDeck.drawCardOffTop());
          }
          isStand = true;
          let dealerSum = dealerHand.getSumOfCards();
          while(dealerSum < 17){
            dealerHand.addCard(gameDeck.drawCardOffTop());
            dealerSum = dealerHand.getSumOfCards();
          }
          await boardMsg.edit({embed: clientHand.toGameboardEmbed(msg.member.user, dealerHand, true, false)});
        }

        const isWinner = clientHand.isWinner(dealerHand, isStand);
        if(isWinner === clientHand.BUST
          || isWinner === clientHand.TIE
          || isWinner === clientHand.BLACKJACK
          || isWinner === clientHand.WIN
          || isWinner === clientHand.LOSE){
          betCollector.stop();
          let embed = clientHand.toGameboardEmbed(msg.member.user, dealerHand, true, isWinner === clientHand.CONTINUEGAME);
          embed.description = embed.description.replace(`${0}` , bet)
           await boardMsg.edit({embed});
          currentUsersInGame.delete(message.author.id);
          clearTimeout(gameTimeout);

          if(isWinner === clientHand.TIE){
            return (0);
          }

          if(isWinner === clientHand.WIN
            || isWinner === clientHand.BLACKJACK){
            return db.add(`money_${message.guild.id}_${message.author.id}` , bet)
          }

          if(isWinner === clientHand.BUST
            || isWinner === clientHand.LOSE){
            return db.subtract(`money_${message.guild.id}_${message.author.id}` , bet)
          }
        }

        await boardMsg.edit({embed: clientHand.toGameboardEmbed(message.member.user, dealerHand, false, isWinner === clientHand.CONTINUEGAME)});
})
    }
}
module.exports.config = {
    name : 'bj',
    aliases : ['blackjack']    
}