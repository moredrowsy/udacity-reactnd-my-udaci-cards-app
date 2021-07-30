import {
  deleteDeck,
  getDecks,
  saveCardToDeck,
  saveDeck,
  saveDecks,
} from '../../local-storage';

// ACTIONS
export const ADD_CARD_TO_DECK = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const ADD_DECKS = 'SAVE_DECKS';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const REMOVE_DECK = 'REMOVE_DECK';

// ACTION CREATORS
export function addCardToDeck(title, card) {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card,
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function addDecks(decks) {
  return {
    type: ADD_DECKS,
    decks,
  };
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function removeDeck(title) {
  return {
    type: REMOVE_DECK,
    title,
  };
}

// ASYNC
export const handleAddCardToDeck =
  ({ title, card }, onSuccess, onError) =>
  async (dispatch) => {
    try {
      await saveCardToDeck(title, card);
      dispatch(addCardToDeck(title, card));
      if (onSuccess) onSuccess();
    } catch (e) {
      console.log('Fail handleAddCardToDeck()', e);
      if (onError) onError(e.message);
    }
  };

export const handleAddDeck = (deck, onSuccess, onError) => async (dispatch) => {
  try {
    await saveDeck(deck);
    dispatch(addDeck(deck));
    if (onSuccess) onSuccess();
  } catch (e) {
    console.log('Fail handleAddDeck()', e);
    if (onError) onError(e.message);
  }
};

export const handleAddDecks =
  (decks, onSuccess, onError) => async (dispatch) => {
    try {
      await saveDecks(decks);
      dispatch(addDecks(decks));
      if (onSuccess) onSuccess();
    } catch (e) {
      console.log('Fail handleAddDecks()', e);
      if (onError) onError(e.message);
    }
  };

export const handleReceiveDecks = (onError) => async (dispatch) => {
  try {
    const decks = await getDecks();
    if (decks) dispatch(receiveDecks(decks));
  } catch (e) {
    console.log('Fail handleReceiveDecks()', e);
    if (onError) onError(e.message);
  }
};

export const handleRemoveDeck = (title, onError) => async (dispatch) => {
  try {
    await deleteDeck(title);
    if (title) dispatch(removeDeck(title));
  } catch (e) {
    console.log('Fail handleReceiveDecks()', e);
    if (onError) onError(e.message);
  }
};
