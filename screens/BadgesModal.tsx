import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
//import { ScrollView } from 'react-native-gesture-handler';

/**
 * Function that renders the Badges screen.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the leaderboard button in navigation
 * @returns {JSX.Element} JSX element of the leaderboard screen
 */


export default function BadgesScreen() {
 

  return (
    <View style={styles.container}>
        <ScrollView>
        <Image
            style={{ width: 200, height: 200, top: 5 }}
            source={require('../Badges/FirstComment.png')}
        />  
        <Text style={styles.title}>       First Comment  </Text>
        <Text style={styles.listItem}>Post a comment on a cat post to obtain this badge.  </Text>
         <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Image
            style={{ width: 200, height: 200, top: 5 }}
            source={require('../Badges/FirstCatPosted.png')}
        />
        <Text style={styles.title}>     First Cat Posted  </Text>
        <Text style={styles.listItem}> Upload a new stray cat to obtain this badge.  </Text>
         <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Image
            style={{ width: 200, height: 200, top: 5 }}
            source={require('../Badges/FirstCatRescued.png')}
        />
        <Text style={styles.title}>         Cat Rescuer  </Text>
        <Text style={styles.listItem}>Update a cat's status to "rescued" by   </Text>
        <Text style={styles.listItem}>commenting on the cat post to obtain this badge.  </Text>
        <Text style={styles.note}>NOTE: Comment must be approved first.   </Text>
         <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
         <Image
            style={{ width: 200, height: 200, top: 5 }}
            source={require('../Badges/FeedingStation.png')}
        />
        <Text style={styles.title}>Feeding Station Attendee  </Text>
        <Text style={styles.listItem}>  Attend at least one feeding station in the Temple   </Text>
        <Text style={styles.listItem}>  University area to obtain this badge.    </Text>
         <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
         <Image
            style={{ width: 200, height: 200, top: 5 }}
            source={require('../Badges/mods.png')}
        />
        <Text style={styles.title}>            Moderator  </Text>
        <Text style={styles.listItem}>    Become a moderator to obtain this badge.   </Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </ScrollView>
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
    alignItems: 'center',
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  buttonStyle: {
    textAlign: 'left',
    fontFamily: 'Cochin',
  },
  listItem: {
    fontSize: 9,
    alignItems: 'center',
  },
  note: {
    fontSize: 9,
    fontWeight: 'bold',
    alignItems: 'center',
  }
});
