import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import * as React from 'react';
import {  Platform, StyleSheet, Image } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { View } from '../components/Themed';
import { v4 as uuidv4 } from 'uuid';
import { Announcement} from '../types';
import { useState } from 'react';
import { addAnnouncement } from '../utils/dbInterface';

export default function ModalScreen() {
  const [expoNotif, setexpoNotif] = React.useState<any[]>([]);
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
   
    setAnnouncement((currentState: Announcement) => ({
      ...currentState,
      time: month + '/' + date + '/' + year + '/' + hours + ':' + min + ':' + sec,
    }))

    //Retrieves all expo tokens for moderators 


    firebase.database().ref().child('Accounts/').on('value', function (snapshot) {
      const Accounts: any[] = Object.values(snapshot.val());
      const tokens: any[] = [];

  

      Accounts.forEach((account) => {
        if ((account.expoNotif && Object.keys(account.expoNotif).length > 0)){
          tokens.push(account.expoNotif)
        }
      }
      );
      setexpoNotif(tokens)
      //console.log(tokens)
    });
    
  }, []);

  async function submitAnnouncement() {
    
    if (announcement.content === '' || null) return alert('Add content to send an announcement');
    if (announcement.subject === '' || null) return alert('Add subject to send an announcement');
    else{
      
    const uploadTask = firebase.storage().ref().child(`Announcements/${announcement.announcementID}`).put(announcement);
    uploadTask
    
    .then(() => addAnnouncement(announcement)
    )
    .catch((err) => {
      console.log(err);
    });
    alert('Submitted Successfully');
  }
  }

  async function sendPushNotification(array: string[]) {

    for (let i = 0; i < array.length; i++) {

      const message = {
        to: array[i],
        sound: 'default',
        title: 'Temple Cats',
        body: 'A new annoucenment has been posted',
        data: { someData: 'goes here' },
      };

      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    }
  }

    return (
      <View style={styles.container}>
          <Image
        style={{ width: 200, height: 200, top: 5 }}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2018/06/18/14/20/cat-3482623_960_720.jpg',
        }}
      />
      
       <Input
          style={styles.nameInput}
          value={announcement.subject}
          selectionColor="blue"
          placeholder="Enter subject here..."
          placeholderTextColor="black"
          onChangeText={(text) =>  setAnnouncement((currentState: Announcement) => ({
            ...currentState,
            subject: text,
      
          }))}
        />
       <Input
          style={styles.additionalInput}
          selectionColor="blue"
          placeholder="Enter announcement here..."
          placeholderTextColor="black"
          value={announcement.content}
          onChangeText={(text) => setAnnouncement((currentState: Announcement) => ({
            ...currentState,
            content: text,
          }))
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
            submitAnnouncement();
            sendPushNotification(expoNotif)
            return;
          }}
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
  