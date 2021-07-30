import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { black, blue, green, red, white } from '../styles/colors';
import TextButton from './TextButton';

function Card({ card, onAnswer }) {
  const { answer, question } = card;
  const [isFlipped, setIsFlipped] = useState(false);

  // Flip animation
  const animatedValue = useRef(new Animated.Value(0)).current;
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const frontAnimationStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };
  const backAnimationStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const onFlip = () => {
    setIsFlipped((prev) => !prev);

    if (isFlipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  const resetFlip = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 1,
      useNativeDriver: true,
    }).start();
  };

  const onCorrect = () => {
    setIsFlipped(false);
    resetFlip();
    onAnswer(true);
  };

  const onIncorrect = () => {
    setIsFlipped(false);
    resetFlip();
    onAnswer(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <Animated.View
          style={[
            styles.boxWithShadow,
            styles.flipCard,
            styles.flipCardBack,
            backAnimationStyle,
          ]}
        >
          <TextButton
            style={styles.cardBtn}
            onPress={onFlip}
            textStyle={styles.cardText}
          >
            {answer}
          </TextButton>
        </Animated.View>
        <Animated.View
          style={[styles.boxWithShadow, styles.flipCard, frontAnimationStyle]}
        >
          <TextButton
            onPress={onFlip}
            style={styles.cardBtn}
            textStyle={styles.cardText}
          >
            {question}
          </TextButton>
        </Animated.View>
      </View>
      <View>
        <TextButton onPress={onFlip} textStyle={styles.flipBtnText}>
          {isFlipped ? 'View Question' : 'View Answer'}
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
  boxWithShadow: {
    elevation: 5,
    shadowColor: black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  flipCard: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: white,
    position: 'absolute',
    top: 0,
  },
  flipBtnText: {
    color: red,
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  cardText: {
    color: blue,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  cardBtn: {
    flex: 1,
    justifyContent: 'center',
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
