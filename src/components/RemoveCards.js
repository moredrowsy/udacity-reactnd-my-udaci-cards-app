import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { handleRemoveCardFromDeck } from '../store/redux/actions/decks.action';
import { black, blue, red, white } from '../styles/colors';

function RemoveCards({ deck, dispatch, title }) {
  const cards = deck && deck.cards ? Object.values(deck.cards) : [];
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const removeCard = (question) => {
    dispatch(handleRemoveCardFromDeck({ title, question }));
  };

  const renderCard = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.questionText}>{item.question}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => removeCard(item.question)}>
            <FontAwesome name='close' size={24} color={red} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>{title}</Text>
      </View>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.question}
        renderItem={renderCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  header: {
    color: blue,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
  },
  questionText: {
    color: black,
    fontSize: 15,
  },
});

const mapStateToProps = ({ decks }, { route }) => ({
  deck: decks[route.params.title],
  title: route.params.title,
});

export default connect(mapStateToProps)(RemoveCards);
