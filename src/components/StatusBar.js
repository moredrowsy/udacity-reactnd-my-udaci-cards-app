import React from 'react';
import { View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import Consants from 'expo-constants';
import { blue } from '../styles/colors';

export default function StatusBar({ backgroundColor }) {
  return (
    <View
      style={{
        backgroundColor: backgroundColor ? backgroundColor : blue,
        height: Consants.statusBarHeight,
      }}
    >
      <ExpoStatusBar translucent style='light' />
    </View>
  );
}
