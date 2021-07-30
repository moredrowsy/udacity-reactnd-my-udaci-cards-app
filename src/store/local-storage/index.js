import AsyncStorage from '@react-native-async-storage/async-storage';

const DECK_STORAGE_KEY = 'UdaciCards:decks';

export async function deleteDeck(title) {
  const decks = await getDecks();

  if (decks && title in decks) {
    delete decks[title];

    saveDecks(decks);
  }
}

export async function getDecks() {
  const item = await AsyncStorage.getItem(DECK_STORAGE_KEY);
  return item ? JSON.parse(item) : null;
}

export async function getDeck(title) {
  const decks = await getDecks();
  return decks ? decks[title] : null;
}

export async function saveCardToDeck(title, card) {
  const decks = await getDecks();

  if (decks) {
    const deck = decks[title];

    if (deck) {
      deck.cards.push(card);

      return AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({
          [deck.title]: deck,
        })
      );
    } else {
      throw new Error('Deck title does not exists');
    }
  }
}

export function saveDecks(decks) {
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
}

export async function saveDeck(deck) {
  const decks = await getDecks();

  if (decks && deck.title in decks) {
    throw new Error('Deck already exists');
  }

  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [deck.title]: deck,
    })
  );
}
