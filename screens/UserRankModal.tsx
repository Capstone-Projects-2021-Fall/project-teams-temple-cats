import * as React from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import { View } from '../components/Themed';

export default function UserRankModal({ route }) {

  const  userSelected  = route.params.item;

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
          <Text style={styles.personInfo}>{userSelected.email ?`Email: ${userSelected.email}\n` : 'Email: Unspecified'}</Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.personInfo}>{userSelected.highScore ?`High Score: ${userSelected.highScore}\n` : 'High Score: 0 points'}</Text>
        </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
          <View style={{flexDirection: 'row'}}> 
          {JSON.stringify(userSelected.badges.thousandPoints)  === '1' ?
              <Image
                style={{ width: 70, height: 70, top: -90, left: -10 }}
                source={require('../Badges/1000points.png')}
              />
              : null
            }
            {JSON.stringify(userSelected.badges.hundredPoints)  === '1' ?
              <Image
                style={{ width: 70, height: 70, top: -90, left: -10 }}
                source={require('../Badges/100points.png')}
              />
              : null
            }
          {JSON.stringify(userSelected.badges.modBadge)  === '1' ?
              <Image
                style={{ width: 70, height: 70, top: -90, left: -10 }}
                source={require('../Badges/mods.png')}
              />
              : null
            }
            {JSON.stringify(userSelected.badges.firstCatPostedBadge) === '1' ?
              <Image
                style={{ width: 70, height: 70, top: -90, left: -10 }}
                source={require('../Badges/FirstCatPosted.png')}
              />
              : null
            }
            {JSON.stringify(userSelected.badges.firstCommentBadge) === '1' ?
              <Image
                style={{ width: 70, height: 70, top: -90, left: -10 }}
                source={require('../Badges/FirstComment.png')}
              />
              : null
            }
            {JSON.stringify(userSelected.badges.feedingStationAttendeeBadge) === '1' ?
              <Image
                style={{ width: 70, height: 70, top: -90, left: -10 }}
                source={require('../Badges/FeedingStation.png')}
              />
              : null
            }
            {JSON.stringify(userSelected.badges.firstCatRescuedBadge) === '1' ?
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
  