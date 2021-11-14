import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import * as React from 'react';
import { Button, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Icon } from 'react-native-elements';
import Mod from '../components/Mod';
import { RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../context/FirebaseAuthContext';
import navigation from '../navigation';

const modStatus: any[] = [];


export default function ModalScreen() {

  const [word, setWord] = React.useState<any>([]);
  const user = React.useContext(AuthContext);

  React.useEffect(() => {
    firebase
      .database()
      .ref(`Accounts/${user?.uid}/modStatus`)
      .on('value', (snapshot) => {
        modStatus.push(snapshot.val());
        setWord(modStatus);
      });
  }, []);


  return (
    <View style={styles.container}>
    
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {
     
      
      
      /* Use a light status bar on iOS to account for the black space above the modal */
      }
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