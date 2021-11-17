import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import * as React from 'react';
import { Image, FlatList, Platform, StyleSheet, TouchableOpacity, Button, SafeAreaView, ScrollView } from 'react-native';
import { Colors, Icon } from 'react-native-elements';
import Mod from '../components/Mod';
import { Announcement, RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../context/FirebaseAuthContext';
import { useState } from 'react';
import { black } from 'react-native-paper/lib/typescript/styles/colors';

const modStatus: any[] = [];

/**
 * Function that returns a view for displaying announcements
 * @component
 * @returns { View } for displaying announcements
 */
export default function ModalScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const announcementRef = firebase.database().ref("Announcements/");
  const [announcementData, setAnnouncementData] = React.useState<Announcement[]>([]); 

  
  const [word, setWord] = useState<any>([]);

  const user = React.useContext(AuthContext);
    
  React.useEffect(() => {

    firebase
    .database()
    .ref(`Accounts/${user?.uid}/modStatus`)
    .on('value', (snapshot) => {
      modStatus.push(snapshot.val());
      setWord(modStatus);
    });
    announcementRef.get().then((snapshot) => {
      const announcements: Announcement[] = Object.values(snapshot.val());
      const announcementDataTmp: Announcement[] = [];
      announcements.forEach((announcement) => {
        // find cats that have reports
        if (announcement.content && Object.keys(announcement.content).length > 0) {
          announcementDataTmp.push(announcement);
        }
    });
    setAnnouncementData(announcementDataTmp);
 

});
}, []);

 

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200, top: 5 }}
        source={{
          uri: 'https://i1.wp.com/consciouscat.net/wp-content/uploads/2017/12/cat-newspaper-e1513176589145.jpg?resize=550%2C367&ssl=1',
        }}
      />
      {JSON.stringify(modStatus[0]) === '3' ?
        
        <Button
        color="#8b0000"
        title="Create announcement"
        onPress={() => {
          navigation.push("CreateAnnouncement")
        }}
      />
      
        : null
      }
      <ScrollView>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.flexColumnContainer}>
        {announcementData.map((announcement, index) => (
          <TouchableOpacity onPress={() => alert(announcement.time)}>
            <Text style={styles.listItem}>{announcement.subject}: {announcement.content}</Text>
          </TouchableOpacity>
        ))}
        </View>
      </ScrollView>
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexColumnContainer: {
    flex: 1,
  },
  flexRowContainer: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    top: 100,
  },
 
  separator: {
    marginVertical: 30,
    height: 1,
    top:-20,
    width: '80%',
    
  },
  
  listItem: {
    color: 'black',
    fontSize: 16,
    alignItems: 'center',
    fontWeight: "bold", 
   
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1
  },
});
