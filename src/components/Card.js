import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { blue, green, red, white } from '../styles/colors';
import TextButton from './TextButton';

function Card({ card, onAnswer }) {
  const { answer, question } = card;
  const [showAnswer, setShowAnswer] = useState(false);

  const onShowAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const onCorrect = () => {
    setShowAnswer(false);
    onAnswer(true);
  };

  const onIncorrect = () => {
    setShowAnswer(false);
    onAnswer(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.question}>{question}</Text>
        <Text></Text>
        <TextButton
          onPress={onShowAnswer}
          textStyle={[
            styles.answer,
            showAnswer ? styles.showAnswer : styles.hideAnswer,
          ]}
        >
          {showAnswer ? answer : 'Answer'}
        </TextButton>
      </View>
      <View style={styles.btnContainer}>
        <TextButton
          onPress={onCorrect}
          style={[styles.btn, styles.correctBtn]}
          textStyle={styles.correctBtnText}
        >
          Correct
        </TextButton>
        <TextButton
          onPress={onIncorrect}
          style={[styles.btn, styles.incorrectBtn]}
          textStyle={styles.incorrectBtnText}
        >
          Incorrect
        </TextButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  question: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  answer: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  hideAnswer: {
    color: red,
    fontWeight: 'bold',
  },
  showAnswer: {
    color: blue,
    fontWeight: 'normal',
  },
  btnContainer: { alignSelf: 'stretch', marginRight: '25%', marginLeft: '25%' },
  btn: {
    padding: 10,
    borderRadius: 5,
  },
  correctBtn: {
    backgroundColor: green,
    marginBottom: 10,
  },
  correctBtnText: {
    color: white,
  },
  incorrectBtn: {
    backgroundColor: red,
  },
  incorrectBtnText: {
    color: white,
  },
});

export default Card;
