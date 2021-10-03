import * as React from 'react';
import { StyleSheet } from 'react-native';
import CatMap from '../components/CatMap';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

/**
 * Function that renders the home screen. This is the main screen that includes the lost & found map and reporting features.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the home button in navigation
 * @returns {JSX.Element} JSX element of the home screen
 */
export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home/Map</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <CatMap/>
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
});