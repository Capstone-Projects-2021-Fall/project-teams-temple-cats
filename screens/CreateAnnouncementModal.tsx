import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import * as React from 'react';
import {  Platform, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { View } from '../components/Themed';

export default function ModalScreen() {
  const [announcementBody, setAnnouncementBody] = React.useState("");
  const [announcementTitle, setAnnouncementTitle] = React.useState("");
    return (
      <View style={styles.container}>
       <Input
          style={styles.nameInput}
          value={announcementTitle}
          selectionColor="white"
          placeholder="Enter subject here..."
          placeholderTextColor="black"
          onChangeText={(text) => setAnnouncementTitle(text)}
        />
       <Input
          style={styles.additionalInput}
          selectionColor="white"
          placeholder="Enter announcement here..."
          placeholderTextColor="black"
          value={announcementBody}
          onChangeText={(text) => setAnnouncementBody(text)}
        />
      <Button
          title="Submit"
          buttonStyle={styles.buttonStyle}
          containerStyle={{
            alignItems: 'center',
            marginBottom: 10,
          }}
          onPress={() => {
            firebase.database().ref('Announcements/Subject').set({
              announcement: announcementTitle,
            });
            firebase.database().ref('Announcements/Subject/Body').set({
              announcement: announcementBody,
            });
            
           
            alert('Submitted Successfully');
            return;
          } 
          }
        />


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
    additionalInput: {
      height: 120,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: 'black',
      backgroundColor: 'white',
    },
    nameInput: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: 'black',
      backgroundColor: 'white',
    },
    buttonStyle: {
      width: 150,
      padding: 10,
      backgroundColor: '#9D2235',
      borderRadius: 30,
    },
  });
  