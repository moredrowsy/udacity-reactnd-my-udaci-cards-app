import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { black, blue, gray, red, white } from '../styles/colors';
import { makeCard } from '../utils/decks';
import { handleAddCardToDeck } from '../store/redux/actions/decks.action';
import TextButton from './TextButton';

function AddCard({ dispatch, route }) {
  const { title } = route.params;
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const addCard = () => {
    if (answer && question) {
      const onError = (errMsg) => setError(errMsg);
      const onSuccess = () => {
        setError(null);
        setAnswer('');
        setQuestion('');
      };

      const card = makeCard(question, answer);
      dispatch(handleAddCardToDeck({ title, card }, onSuccess, onError));
    } else {
      setError('Card question or answer can not be empty');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>{title}</Text>
      </View>
      <View style={styles.texInputView}>
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={setQuestion}
            placeholder='Question'
            value={question}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={setAnswer}
            placeholder='Answer'
            value={answer}
          />
        </View>
      </View>
      <View>
        {error && (
          <View style={styles.center}>
            <MaterialIcons name='error' size={30} color={red} />
            <Text style={styles.errMsg}>{error}</Text>
          </View>
        )}
        {success && (
          <View style={styles.center}>
            <FontAwesome name='check' size={30} color={blue} />
            <Text style={styles.successMsg}>{success}</Text>
          </View>
        )}
      </View>
      <View style={styles.btnContainer}>
        <TextButton
          style={styles.btn}
          textStyle={styles.btnText}
          onPress={addCard}
        >
          Add Card
        </TextButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 15,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: blue,
    fontSize: 30,
    fontWeight: 'bold',
  },
  texInputView: {
    alignSelf: 'stretch',
  },
  textInput: {
    backgroundColor: white,
    borderColor: black,
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginTop: 15,
    padding: 10,
  },
  btnContainer: { alignSelf: 'stretch', marginRight: '25%', marginLeft: '25%' },
  btn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: white,
    textTransform: 'uppercase',
  },
  errMsg: {
    color: red,
    fontSize: 20,
    fontWeight: 'bold',
  },
  successMsg: {
    color: blue,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default connect()(AddCard);
