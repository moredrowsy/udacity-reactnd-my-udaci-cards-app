import {
  ADD_CARD_TO_DECK,
  ADD_DECK,
  ADD_DECKS,
  RECEIVE_DECKS,
  REMOVE_DECK,
} from '../actions/decks.action';

const initialState = {};

export default function decks(state = initialState, action) {
  switch (action.type) {
    case ADD_CARD_TO_DECK:
      const { title, card } = action;
      const deck = state[title];
      deck.cards.push(card);

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
