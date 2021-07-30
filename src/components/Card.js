import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { blue, green, red, white } from '../styles/colors';
import TextButton from './TextButton';

function Card({ card, onAnswer }) {
  const { answer, question } = card;
  const [showAnswer, setShowAnswer] = useState(false);

  const onToggle = () => {
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
        <Text style={styles.heading}> {showAnswer ? answer : question}</Text>
      </View>
      <View>
        <TextButton onPress={onToggle} textStyle={styles.toggle}>
          {showAnswer ? 'Question' : 'Answer'}
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
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  toggle: {
    color: red,
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
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
