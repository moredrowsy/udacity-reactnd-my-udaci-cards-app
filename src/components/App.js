import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../store/redux';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { blue, gray, white } from '../styles/colors';
import { setLocalNotification } from '../utils/notifications';
import StatusBar from './StatusBar';
import AddCard from './AddCard';
import AddDeck from './AddDeck';
import Decks from './Decks';
import DeckDetails from './DeckDetails';
import Quiz from './Quiz';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: blue,
      inactiveTintColor: gray,
    }}
  >
    <Tabs.Screen
      name='Decks'
      component={Decks}
      options={{
        title: 'Decks',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name='cards' color={color} size={30} />
        ),
      }}
    ></Tabs.Screen>
    <Tabs.Screen
      name='AddDeck'
      component={AddDeck}
      options={{
        title: 'Add Deck',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name='card-plus' color={color} size={30} />
        ),
      }}
    ></Tabs.Screen>
  </Tabs.Navigator>
);

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
    }}
  >
    <Stack.Screen
      name='TabsNavigator'
      component={TabsNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='DeckDetails'
      component={DeckDetails}
      options={({ route }) => ({
        title:
          route.params && route.params.title
            ? route.params.title
            : 'DeckDetails',
        headerShown: true,
      })}
    />
    <Stack.Screen
      name='AddCard'
      component={AddCard}
      options={() => ({
        title: 'Add Card',
        headerShown: true,
      })}
    />
    <Stack.Screen
      name='Quiz'
      component={Quiz}
      options={() => ({
        title: 'Quiz',
        headerShown: true,
      })}
    />
  </Stack.Navigator>
);

function App() {
  useEffect(() => {
    setLocalNotification();
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar />
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});

export default App;
