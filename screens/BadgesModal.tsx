import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import firebase from 'firebase';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

/**
 * Function that renders the Badges screen.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the leaderboard button in navigation
 * @returns {JSX.Element} JSX element of the leaderboard screen
 */


export default function BadgesScreen() {
 

  return (
    <View style={styles.container}>
        <Image
        style={{ width: 200, height: 200, top: 5 }}
        source={require('../Badges/FirstComment.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonStyle: {
    textAlign: 'left',
    fontFamily: 'Cochin',
  },
});
