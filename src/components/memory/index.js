import React, { useState } from "react";
import "./index.css";
import StatusBar from "./StatusBar";
import MemoryCard from "./MemoryCard";

const colors = [
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "purple",
];

function generateCards() {
  const cards = [];
  for (let i = 0; i < colors.length; i++) {
    cards.push({
      key: i * 2,
      color: colors[i],
      isFlipped: false,
    });
    cards.push({
      key: i * 2 + 1,
      color: colors[i],
      isFlipped: false,
    });
  }
  return cards.sort(() => Math.random() - 0.5);
}
// []= useState(<>) when I call useState I give it the initial state of the component
// [<current state>], <function to update state>] =useState(<initial state>)

function flipCard(cards, cardToFlip) {
  return cards.map((card) => {
    //this return belongs to the first function
    if (card.key === cardToFlip.key) {
      return { ...card, isFlipped: !card.isFlipped };
    }
    return card;
  });
}

function Memory() {
  const [game, setGame] = useState({
    cards: generateCards(),
    firstCard: undefined,
    secondCard: undefined,
  });

  /*  const [cards, setCards] = useState(generateCards());*/
  /*the same as:
  const stateArray= usteSTate(generateCards());
  const cards = stateArray[0];
  const setCards = stateArray[1];*/

  function onCardClicked(clickedCard) {
    if (clickedCard.isFlipped) {
      return;
    }

    // If the card is already flipped there is nothing we need to do (write an if-statement with a return; inside)

    setGame((oldGame) => {
      //all these cards come from the oldGame object
      const cards = oldGame.cards;
      const firstCard = oldGame.firstCard;
      const secondCard = oldGame.secondCard;

      // The { cards, firstCard, secondCard } above is the decomposed game object.
      // These three variables represent the previous state, before a card was clicked.
      // We should return the new state, depending on the previous one and on the card that was clicked.
      // There are 4 different cases.
      // 1. If both firstCard and secondCard from the previous state are undefined =>
      // we should flip the clicked card and set it as the firstCard

      if (!firstCard) {
        // firstCard== undefined - shorter with !
        return {
          cards: flipCard(cards, clickedCard),
          firstCard: clickedCard, //secondCard:undefined} - since secondCard is undefined we don't need it here
        };
      }
      // 2. Else, if firstCard is defined, but secondCard isn't =>
      // we should flip the clicked card, keep the firstCard as is, but set the secondCard
      else if (!secondCard) {
        return {
          cards: flipCard(cards, clickedCard),
          firstCard: firstCard,
          secondCard: clickedCard,
        };
      }

      // 3. Else, if the previous two clicked cards have the same color =>
      // we should flip the clicked card, set the new firstCard and remove secondCard from the state
      else if (secondCard.color === firstCard.color) {
        //property .color assigned to the object secondCard
        return {
          cards: flipCard(cards, clickedCard),
          firstCard: clickedCard,
        };
      }
      // 4. Else, if the previous two clicked cards have different colors =>
      // we should flip the clicked card and flip back firstCard and secondCard,
      // we should also set the new firstCard and remove secondCard from the state
      /*Runs every time a card is clicked, flips this card (update state)*/
      else {
        //we can skip if because it is the only case left
        let newCards = flipCard(cards, firstCard);
        newCards = flipCard(newCards, secondCard);
        newCards = flipCard(newCards, clickedCard);
        return {
          cards: newCards,
          firstCard: clickedCard,
        };
      }
    });
  }

  function onRestart() {
    setGame = useState({
      cards: generateCards(),
      firstCard: undefined,
      secondCard: undefined,
    });
  }

  return (
    <div className="game-container">
      <StatusBar status="Time: 0s" onRestart={onRestart}></StatusBar>
      <div className="memory-grid">
        {game.cards.map((card) => (
          <MemoryCard
            key={card.key}
            color={card.color}
            isFlipped={card.isFlipped}
            onClick={() => onCardClicked(card)} //these are all props, they need to match what I am using
          />
        ))}
      </div>
    </div>
  );
}
export default Memory;
