//Array colors
const cardsColor = ["red", "red", "blue", "blue", "yellow", "yellow", "green", "green", "brown", "brown",  "gray", "gray", "lime", "lime", "cadetblue", "cadetblue", "purple", "purple"];

let cards = document.querySelectorAll("div");
cards = [...cards];
//let cards = [...document.querySelectorAll("div")]

//Start game
const startTime = new Date().getTime();

//Click card
let activeCard = "";
//Pair of cards
const activeCards = [];

//Total number of guessed pairs:
const gamePairs = cards.length/2; //(18:2 = 9 par)
//Game score:
let gameResult = 0;

//Two clicks - mini game
const clickCard = function() {
  activeCard = this;

  //Blockade clicking in the same card
  if(activeCard == activeCards[0]) return;

  activeCard.classList.remove("hidden");

  //first click
  if(activeCards.length === 0) {
    activeCards[0] = activeCard;
    return;
  }
  //second click
  else {
    cards.forEach(card => card.removeEventListener('click', clickCard))
    activeCards[1] = activeCard;
  //SetTimeout
  setTimeout(function() {
      if(activeCards[0].className === activeCards[1].className) {
      activeCards.forEach(card => card.classList.add("off"))//win
      gameResult++;
      //Filter of guessed elements
      cards = cards.filter(card => !card.classList.contains("off")); 
      if(gameResult == gamePairs) {
        //End game
        const endTime = new Date().getTime();
        //Tome of our game
        const gameTime = (endTime - startTime)/1000
        //Win information
        alert(`Wygrałeś! Twój wynik to: ${gameTime} sekund`);
        //Reload page - new gameplay
        location.reload();
      }
      }
      else{
      activeCards.forEach(card => card.classList.add("hidden")) //lose
      }
      //Reset game state after the second click
      activeCard = "";
      activeCards.length = 0;

      //New EventListener on click
      cards.forEach(card => card.addEventListener('click', clickCard))

    }, 1000)
  }
};

//Function init game start
const init = function () {
  cards.forEach(card => {
    const position = Math.floor(Math.random() * cardsColor.length);
    
    card.classList.add(cardsColor[position]);
    cardsColor.splice(position, 1);
  })

  setTimeout(function() {
    cards.forEach(card => {
      card.classList.add("hidden")
      card.addEventListener('click', clickCard)
    })
  },2000)
};

init()