import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

/**
 * Function that renders the resources screen.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the resources button in navigation
 * @returns {JSX.Element} JSX element of the resources screen
 */
export default function ResourcesScreen({ navigation }: RootTabScreenProps<'Resources'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resources</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
