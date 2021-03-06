import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Permissions from 'expo-permissions'
import { AuthContext } from '../context/FirebaseAuthContext';
import firebase from '../utils/firebase';



export default function Notifications1() {

  const user = React.useContext(AuthContext);

  useEffect(() => {
    registerForPushNotification().then(token => console.log(token));
  }, [])

  async function registerForPushNotification() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status != 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    //console.log(token)

    firebase.database().ref(`Accounts/${firebase.auth().currentUser?.uid}/expoNotif`).once('value', (snapshot) => {
      console.log(snapshot);
      if (!snapshot.exists()) {
        firebase
          .database()
          .ref()
          .child(`Accounts/${firebase.auth().currentUser?.uid}/expoNotif`)
          .set(token);
        //console.log('added');
      }
    });
    return token
  }
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

}