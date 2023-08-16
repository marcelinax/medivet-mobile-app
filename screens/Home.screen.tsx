import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from 'themes/colors';

export const HomeScreen = () => (
  <View style={styles.centeredView}>
    <Text>Homescreen</Text>
  </View>
);

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
