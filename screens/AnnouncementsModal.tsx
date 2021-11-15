import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Modal } from 'react-native-ui-kitten';

import { Text} from '../components/Themed';

/**
 * Function that returns a view for displaying announcements
 * @component
 * @returns { View } for displaying announcements
 */
export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Announcements are going to be built in here</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
