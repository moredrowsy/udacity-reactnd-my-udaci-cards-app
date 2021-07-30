import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { black, blue, white } from '../styles/colors';
import { handleReceiveDecks } from '../store/redux/actions/decks.action';
import Deck from './Deck';

function Decks({ decks, dispatch, navigation }) {
  const decksForFlatList = decks ? Object.values(decks) : [];

  useEffect(() => {
    dispatch(handleReceiveDecks());
  }, []);

  const onDeckPress = (title) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'DeckDetails',
        params: {
          title: title,
        },
      })
    );
  };

  const renderDeck = ({ item }) => (
    <TouchableOpacity onPress={() => onDeckPress(item.title)}>
      <Deck deck={item} style={[styles.deck, styles.boxWithShadow]} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {decksForFlatList.length > 0 ? (
        <FlatList
          data={decksForFlatList}
          keyExtractor={(item) => item.title}
          renderItem={renderDeck}
        />
      ) : (
        <View style={[styles.emptyDecks]}>
          <Text style={styles.emptyDecksText}>You have no decks.</Text>
          <Text style={styles.emptyDecksText}>Please add a deck.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  deck: {
    backgroundColor: white,
    marginBottom: 15,
    padding: 15,
  },
  boxWithShadow: {
    elevation: 5,
    shadowColor: black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  emptyDecks: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDecksText: {
    color: blue,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = ({ decks }) => ({
  decks,
});

export default connect(mapStateToProps)(Decks);
