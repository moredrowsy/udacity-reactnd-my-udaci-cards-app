import AsyncStorage from '@react-native-async-storage/async-storage';

const UDACI_CARDS_STORAGE_KEY = 'UdaciCards:decks';

export async function deleteDeck(title) {
  const decks = await getDecks();

  if (decks && title in decks) {
    delete decks[title];

    saveDecks(decks);
  }
}

export async function getDecks() {
  const decks = await AsyncStorage.getItem(UDACI_CARDS_STORAGE_KEY);
  return decks ? JSON.parse(decks) : null;
}

export async function getDeck(title) {
  const decks = await AsyncStorage.getItem(UDACI_CARDS_STORAGE_KEY);
  return decks ? JSON.parse(decks)[title] : null;
}

export async function saveCardToDeck(title, card) {
  const decks = await getDecks();

  if (decks) {
    const deck = decks[title];

    if (deck) {
      deck.cards.push(card);

      return AsyncStorage.mergeItem(
        UDACI_CARDS_STORAGE_KEY,
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
  return AsyncStorage.setItem(UDACI_CARDS_STORAGE_KEY, JSON.stringify(decks));
}

export async function saveDeck(deck = []) {
  const decks = await AsyncStorage.getItem(UDACI_CARDS_STORAGE_KEY);

  if (decks && deck.title in JSON.parse(decks)) {
    throw new Error('Deck already exists');
  }

  return AsyncStorage.mergeItem(
    UDACI_CARDS_STORAGE_KEY,
    JSON.stringify({
      [deck.title]: deck,
    })
  );
}
