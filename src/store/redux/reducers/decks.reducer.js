import {
  ADD_CARD_TO_DECK,
  ADD_DECK,
  ADD_DECKS,
  RECEIVE_DECKS,
  REMOVE_CARD_FROM_DECK,
  REMOVE_DECK,
} from '../actions/decks.action';

const initialState = {};

export default function decks(state = initialState, action) {
  const { title, card, question } = action;
  let deck;

  switch (action.type) {
    case ADD_CARD_TO_DECK:
      deck = state[title];
      deck.cards[card.question] = card;

      if (deck) {
        return {
          ...state,
          [title]: { ...deck },
        };
      } else {
        return state;
      }
    case ADD_DECK:
      return { ...state, [action.deck.title]: action.deck };
    case ADD_DECKS:
      return { ...state, ...action.decks };
    case RECEIVE_DECKS:
      return { ...action.decks };
    case REMOVE_CARD_FROM_DECK:
      deck = state[title];

      if (deck && question in deck.cards) {
        delete deck.cards[question];

        return {
          ...state,
          [title]: { ...deck },
        };
      } else {
        return state;
      }
    case REMOVE_DECK:
      if (action.title in state) {
        delete state[action.title];
        return { ...state };
      } else {
        return state;
      }
    default:
      return state;
  }
}
