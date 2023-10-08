export default class Card {
  constructor({suit,face,score}) {
    this.suit = suit
    this.face = face
    this.image = `${suit}_${face}.png`
    this.score = score
    this.visible = true
    this.swapVisibility = swapVisibility
    
    function swapVisibility(){
      this.visible = !this.visible
    }
  }
}
