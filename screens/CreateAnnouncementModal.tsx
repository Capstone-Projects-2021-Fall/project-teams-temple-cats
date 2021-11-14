import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import * as React from 'react';
import {  Platform, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { View } from '../components/Themed';
import { v4 as uuidv4 } from 'uuid';
import { Announcement, Cat } from '../types';
import { useState } from 'react';
import { addAnnouncement } from '../utils/dbInterface';

export default function ModalScreen() {
  const [announcementBody, setAnnouncementBody] = React.useState("");
  const [announcementTitle, setAnnouncementTitle] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState('');
  const [announcement, setAnnouncement]: Announcement = useState({
    announcementID: uuidv4(),
    subject: '',
    content: '',
    time: '',
  });

  React.useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      month + '/' + date + '/' + year + '/' + hours + ':' + min + ':' + sec
    );
    setAnnouncement((currentState: Announcement) => ({
      ...currentState,
      time: currentDate,
    }))
    
  }, []);

  async function submitAnnouncement() {
    
    if (announcement.content === '' || null) return alert('Add content to send an announcement');
    if (announcement.subject === '' || null) return alert('Add subject to send an announcement');
    const response = await fetch(announcement.announcementID);
    const blob = await response.blob();
    const uploadTask = firebase.storage().ref().child(`Announcements/${announcement.announcementID}`).put(blob);
    //const uploadTask = firebase.storage().ref().child(`Announcements/${announcement.announcementID}`);
    uploadTask
    .then((uploadTaskSnapshot) => {
      // The upload is complete!
      window.alert('Upload complete');

      // In addition, if needed you can get a Download URL, as follows
      return uploadTaskSnapshot.ref.getDownloadURL();
    })
    
    .then(() => addAnnouncement(announcement))
    .catch((err) => {
      console.log(err);
    });
  }


    return (
      <View style={styles.container}>
       <Input
          style={styles.nameInput}
          value={announcementTitle}
          selectionColor="blue"
          placeholder="Enter subject here..."
          placeholderTextColor="black"
          onChangeText={(text) =>  setAnnouncementTitle(text)}
        />
       <Input
          style={styles.additionalInput}
          selectionColor="blue"
          placeholder="Enter announcement here..."
          placeholderTextColor="black"
          value={announcementBody}
          onChangeText={(text) => setAnnouncementBody(text)
          }
        />
      <Button
          title="Submit"
          buttonStyle={styles.buttonStyle}
          containerStyle={{
            alignItems: 'center',
            marginBottom: 10,
          }}
          onPress={() => {
            setAnnouncement((currentState: Announcement) => ({
              ...currentState,
              subject: announcementTitle,
              content: announcementBody,
            }))
           //submitAnnouncement();
          
            firebase.database().ref(`Announcements/${announcement.announcementID}`).set({
              Announcement: announcement
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
  