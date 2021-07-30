import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { blue, green, red, white } from '../styles/colors';
import { handleRemoveDeck } from '../store/redux/actions/decks.action';
import Deck from './Deck';
import TextButton from './TextButton';

function DeckDetails({ deck, dispatch, navigation }) {
  const title = deck && deck.title ? deck.title : '';

  const addCard = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AddCard',
        params: {
          title: title,
        },
      })
    );
  };

  const removeCard = () => {
    dispatch(handleRemoveDeck(title));
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Decks',
        params: {
          title: title,
        },
      })
    );
  };

  const startQuiz = () => {
    // TODO
    console.log('startQuiz');
  };

  if (!deck) {
    return <View></View>;
  }

  return (
    <Deck deck={deck} style={styles.container}>
      <View>
        <View style={styles.btnContainer}>
          <TextButton
            style={styles.btn}
            textStyle={styles.btnText}
            onPress={addCard}
          >
            Add Card
          </TextButton>
        </View>
        <View style={styles.btnContainer}>
          <TextButton
            style={[styles.btn, { backgroundColor: green }]}
            textStyle={styles.btnText}
            onPress={startQuiz}
          >
            Start Quiz
          </TextButton>
        </View>
        <View style={styles.btnContainer}>
          <TextButton
            style={[styles.btn, { backgroundColor: red }]}
            textStyle={styles.btnText}
            onPress={removeCard}
          >
            Delete
          </TextButton>
        </View>
      </View>
    </Deck>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  btnContainer: {
    marginBottom: 10,
  },
  btn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: white,
    textTransform: 'uppercase',
  },
});

const mapStateToProps = ({ decks }, { route }) => ({
  deck: decks[route.params.title],
});

export default connect(mapStateToProps)(DeckDetails);
