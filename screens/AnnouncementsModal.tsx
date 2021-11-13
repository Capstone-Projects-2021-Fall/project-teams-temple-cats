import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Button, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Icon } from 'react-native-elements';

import { Text, View } from '../components/Themed';

export default function ModalScreen() {

  function createAnnouncement() { 
    console.log("hi")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moderator view</Text>
     
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
/*
 <Button
        color="#8b0000"
        title="Create Announcement"
        onPress={() => {
          createAnnouncement();
        }}
      />
      </View>

*/