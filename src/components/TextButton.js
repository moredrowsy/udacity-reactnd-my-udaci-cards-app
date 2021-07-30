import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function TextButton(props) {
  const { children, onPress, style, textStyle } = props;
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={[styles.reset, textStyle && textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
  },
});
