// Class for creating a card object
export default class Card {
  // The constructor accepts three arguments:
  // suit: A string value for the suit in the deck (i.e. hearts, spades, clubs, or diamonds)
  // face: The face value of the card (i.e. 2 - 10, jack, queen, king or ace)
  // score: An array of integer score values for the card (e.g. [2] for a two of diamonds, [10] for a jack, queen or king, and [1,11] for an ace)
  constructor({suit,face,score}) {
    this.suit = suit
    this.face = face
    // Set the image name value to match the format of static card image files found in `public/img/cards/`
    this.image = `${suit}_${face}.png`
    this.score = score
    // The card visibility is used to set where a card image should be displayed in the UI
    // or whether it should be the back of the card (i.e.the dealer's hole card)
    this.visible = true
    // Functionality to switch the card visibility during the game
    this.swapVisibility = swapVisibility
    
    function swapVisibility(){
      this.visible = !this.visible
    }
  }
}
