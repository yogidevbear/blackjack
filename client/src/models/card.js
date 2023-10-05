export default class Card {
  constructor({suit,face}) {
    this.suit = suit
    this.face = face
    this.image = `${suit}_${face}.png`
  }
}
