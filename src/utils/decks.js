export function makeCard(question, answer) {
  return {
    question,
    answer,
  };
}

export function makeDeck(title, cards = []) {
  return {
    title,
    cards,
  };
}
