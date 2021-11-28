import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import * as React from 'react';
import {  Platform, StyleSheet, Image, Text, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import { Badge, User } from '../types';

const badges: any[] = [];
const users: any[] = [];
export default function UserRankModal({ route }) {

  const  userSelected  = route.params.item;
  const sortedUsers = route.params.value;
  const [badge, setBadge] = React.useState<Badge[]>([]);
  const [user, setUser] = React.useState<User[]>([]);//sorted users in descending order for highScore
  const [user2, setUsers] = React.useState<User[]>([]);//has photo, email, display

React.useEffect(() => {
  firebase
    .database()
    .ref(`Accounts/`)
    .orderByChild("points")
        .on('value', (snapshot) => {
          const newState: User[] = [];
          snapshot.forEach((child) => {
            newState.push({ ...child.val() });
            setUser([...newState]);
          });

  
     
    });
    firebase
      .database()
      .ref(`Accounts/`)
      .on('value', (snapshot) => {
        const newState: User[] = [];
        snapshot.forEach((child) => {
          newState.push({ ...child.val() });
          setUsers([...newState]);
        });
      });

    setUser(user2[userSelected.index])
    //console.log(user2)
   // setUsers(users[userSelected.index])
  // setUsers(users[userSelected.index])
    //sortedUsers.push({...userSelected})
    //setUser(sortedUsers)
    console.log(user2)
    //console.log(sortedUsers)
   // console.log(user)
    //setUser(users.sort((a, b) => a.index - b.index));

    const badges: any[] = [];
    firebase
    .database()
    .ref(`Accounts/${sortedUsers[userSelected.index].accountID}/badges`)
    .on('value', (snapshot) => {
      snapshot.forEach((child) =>{
        badges.push(child.val())
      });
    });
    setBadge([...badges]);
}, []);

    return (
    
      <View style={styles.container}>
        
          <Image
            style={styles.profilePic}
            source={{
              uri: userSelected.photo 
            }}
          />
           <Text style={styles.title}>{userSelected.userName ? `${userSelected.userName}\n` : `${userSelected.userName}\n`} </Text>
           <View style={styles.attributeContainer}>
          <Text style={styles.personInfo}>{user2.email ?`Email: ${user2.email}\n` : 'Email: Unspecified'}</Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.personInfo}>{userSelected.highScore ?`High Score: ${userSelected.highScore}\n` : 'High Score: 0 points'}</Text>
        </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
          <View style={{flexDirection: 'row'}}> 
          {JSON.stringify(badge[4])  === '1' ?
              <Image
                style={{ width: 70, height: 70, top: -90, left: -10 }}
                source={require('../Badges/mods.png')}
              />
              : null
            }
            {JSON.stringify(badge[2]) === '1' ?
              <Image
                style={{ width: 70, height: 70, top: -90, left: -10 }}
                source={require('../Badges/FirstCatPosted.png')}
              />
              : null
            }
            {JSON.stringify(badge[3]) === '1' ?
              <Image
                style={{ width: 70, height: 70, top: -90, left: -10 }}
                source={require('../Badges/FirstComment.png')}
              />
              : null
            }
            {JSON.stringify(badge[1]) === '1' ?
              <Image
                style={{ width: 70, height: 70, top: -90, left: -10 }}
                source={require('../Badges/FeedingStation.png')}
              />
              : null
            }
            {JSON.stringify(badge[0]) === '1' ?
              <Image
                style={{ width: 70, height: 70, top: -90, left: -10 }}
                source={require('../Badges/FirstCatRescued.png')}
              />
              : null
            }
          </View>
        
        
      
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    attributeContainer: {
      height: 20,
      borderRadius: 40,
      backgroundColor: '#8B0000',
      marginBottom: 5,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 5,
      paddingRight: 5,
    },
    personInfo: {
  
      justifyContent: 'center',
      color: 'white',
      flexDirection: 'row',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    profilePic:{
      width: 70,
      height: 70,
      top: -5,
      left: -140,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 40,
      marginBottom: 5,
      backgroundColor: '#8B0000',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      justifyContent: 'center',
      top: -60,
      left: 50,
      color: 'white',
      backgroundColor: '#8B0000',
      textAlign: 'center',
      height: 35,
      letterSpacing: 1,
    },
    separator: {
      marginVertical: 100,
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
    listItem: {
      fontSize: 9,
      alignItems: 'center',
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
  