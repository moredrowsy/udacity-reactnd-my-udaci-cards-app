import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import { blue, white } from '../styles/colors';
import TextButton from './TextButton';

function Quiz({ deck, navigation }) {
  const [cardNum, setCardNum] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizDone, setIsQuizDone] = useState(false);
  const { cards } = deck;
  const cardsLen = cards.length;
  const currentCard = cards[cardNum];

  const onAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);

    if (cardNum + 1 === cardsLen) {
      setIsQuizDone(true);
    } else {
      setCardNum((prev) => prev + 1);
    }
  };

  const onRestartQuiz = () => {
    setCardNum(0);
    setScore(0);
    setIsQuizDone(false);
  };

  const onGoBack = () => {
    navigation.goBack();
  };

  if (isQuizDone) {
    return (
      <View style={styles.quizDoneContainer}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreHeader}>Score</Text>
          <Text style={styles.scoreText}>
            {Math.round((score / cardsLen) * 100)}%
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TextButton
            onPress={onRestartQuiz}
            style={[styles.btn, styles.restartBtn]}
            textStyle={styles.btnText}
          >
            Restart Quiz
          </TextButton>
          <TextButton
            onPress={onGoBack}
            style={styles.btn}
            textStyle={styles.btnText}
          >
            Back to Deck
          </TextButton>
        </View>
      </View>
    );
  } else if (cardsLen) {
    return (
      <View style={styles.quizContainer}>
        <Text style={styles.quizProgress}>
          {cardNum + 1} / {cardsLen}
        </Text>
        <Card card={currentCard} onAnswer={onAnswer} />
      </View>
    );
  } else {
    return (
      <View style={styles.noCardsContainer}>
        <Text style={styles.noCardsText}>
          You can not take this quiz because there are no cards in this deck.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
  },
  quizProgress: { fontSize: 20, fontWeight: 'bold', padding: 10 },
  quizDoneContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  scoreContainer: {
    alignSelf: 'center',
  },
  scoreHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreText: {
    color: blue,
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnContainer: { alignSelf: 'stretch', marginRight: '25%', marginLeft: '25%' },
  btn: {
    backgroundColor: blue,
    padding: 10,
  },
  btnText: { color: white },
  restartBtn: {
    marginBottom: 10,
  },
  noCardsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCardsText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = ({ decks }, { route }) => ({
  deck: decks[route.params.title],
});

export default connect(mapStateToProps)(Quiz);
