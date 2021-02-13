const suits = ['Kupa', 'Maça', 'Sinek', 'Karo'];

class Card {
  constructor(suit, value, name) {
    if(!suits.includes(suit)){
      throw new Error('Takım Kupa , Maça , Sinek veya Karo değil.');
    }

    if(value < 1 || value > 12){
      throw new Error('Kart değeri çok yüksek. 2 ila 12 arasında olmak zorunda');
    }
    this.suit = suit;
    this.value = value;
    this.name = name;
  }

  getValue(){
    return this.value;
  }

  getName(){
    return this.name;
  }
}

module.exports = Card;