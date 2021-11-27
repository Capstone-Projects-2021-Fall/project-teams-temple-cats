import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import * as React from 'react';
import {  Platform, StyleSheet, Image, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { View } from '../components/Themed';
import { AuthContext } from '../context/FirebaseAuthContext';
import { Badge, User } from '../types';
import AccountScreen from './Account';

const badges: any[] = [];
const users: any[] = [];

export default function UserRankModal({ route }) {

  const  userSelected  = route.params;
  const [badge, setBadge] = React.useState<Badge[]>([]);
  const [user, setUser] = React.useState<User[]>([]);
 
  
React.useEffect(() => {
  firebase
    .database()
    .ref(`Accounts/`)
    .on('value', (snapshot) => {
      snapshot.forEach((child) => {
        users.push({...child.val()});
      });
     // setUser(users[userSelected.index])
    });
    setUser(users[userSelected.index])
    console.log(users[userSelected.index])
    const badges: any[] = [];
    firebase
    .database()
    .ref(`Accounts/${users[userSelected.index].accountID}/badges`)
    .on('value', (snapshot) => {
      snapshot.forEach((child) =>{
        badges.push(child.val())
       
      });
    });
    setBadge([...badges]);
  //  user.badges
 // console.log(user)
    //console.log(badge.badges.modBadge)
    //console.log(badge.length)
   // console.log({user.accountID})
   console.log(badges)
  // console.log(badge)
}, []);

    return (
      <View style={styles.container}>
          <Image
            style={{ width: 200, height: 200, top: -120 }}
            source={{
              uri: `${user.photo}`
            }}
          />
          <View style={{flexDirection: 'row'}}> 
          {JSON.stringify(badge[4])  === '1' ?
              <Image
                style={{ width: 50, height: 50, top: -110, left: -10 }}
                source={require('../Badges/mods.png')}
              />
              : null
            }
            {JSON.stringify(badge[2]) === '1' ?
              <Image
                style={{ width: 50, height: 50, top: -110, left: -10 }}
                source={require('../Badges/FirstCatPosted.png')}
              />
              : null
            }
            {JSON.stringify(badge[3]) === '1' ?
              <Image
                style={{ width: 50, height: 50, top: -110, left: -10 }}
                source={require('../Badges/FirstComment.png')}
              />
              : null
            }
            {JSON.stringify(badge[1]) === '1' ?
              <Image
                style={{ width: 50, height: 50, top: -110, left: -10 }}
                source={require('../Badges/FirstCatRescued.png')}
              />
              : null
            }
            {JSON.stringify(badge[0]) === '1' ?
              <Image
                style={{ width: 50, height: 50, top: -110, left: -10 }}
                source={require('../Badges/FeedingStation.png')}
              />
              : null
            }
          </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <Text style={styles.title}>{user.display}</Text>
        
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
      marginVertical: -40,
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
  