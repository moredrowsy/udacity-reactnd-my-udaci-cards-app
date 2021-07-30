import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { blue, gray } from '../styles/colors';

function Deck({ deck, style, children }) {
  const { title, cards } = deck;
  const cardCount = Object.keys(cards).length;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.heading}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.subHeader}>{cardCount} cards</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    color: blue,
    fontSize: 30,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 15,
    color: gray,
  },
});

export default Deck;
