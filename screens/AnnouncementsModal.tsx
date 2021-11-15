import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import * as React from 'react';
import { Image, FlatList, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Icon } from 'react-native-elements';
import Mod from '../components/Mod';
import { Announcement, RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../context/FirebaseAuthContext';
import { useState } from 'react';
import { black } from 'react-native-paper/lib/typescript/styles/colors';


/**
 * Function that returns a view for displaying announcements
 * @component
 * @returns { View } for displaying announcements
 */
export default function ModalScreen() {
  const currentData: Announcement[] = [];
  const announcementRef = firebase.database().ref("Announcements/");
  const [announcementData, setAnnouncementData] = React.useState<Announcement[]>([]); 

  
    
  React.useEffect(() => {
    announcementRef.on("child_added", async (snapshot) => {
     // console.log(snapshot.val())
      currentData.push({...snapshot.val()});
    // console.log(currentData)
      setAnnouncementData([...currentData]);
    });
 console.log(announcementData)

}, [])

 

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200, top: 5 }}
        source={{
          uri: 'https://i1.wp.com/consciouscat.net/wp-content/uploads/2017/12/cat-newspaper-e1513176589145.jpg?resize=550%2C367&ssl=1',
        }}
      />

<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
        <FlatList          
       data={announcementData}          
       renderItem={({ item }) => ( 
         
           <View style={{width: -50, top: -100}} >
             <TouchableOpacity onPress={() => { alert(item.content)}} >
             <Text style={styles.listItem}>{item.subject}</Text>
            </TouchableOpacity>
           </View>
       )}          
     keyExtractor={item => item.announcementID}  
                                
     />         
      
      
      
     
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
    width: 220,
    height: 50,
    paddingTop: 1,
    paddingBottom: -2,
    marginLeft: 275,
    top: 100,
    flexDirection: "row",
    left: -170,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1
  },
});
