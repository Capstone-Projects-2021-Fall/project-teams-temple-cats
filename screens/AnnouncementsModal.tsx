import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import * as React from 'react';
import { Button, FlatList, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Icon } from 'react-native-elements';
import Mod from '../components/Mod';
import { Announcement, RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../context/FirebaseAuthContext';
import { useState } from 'react';


/**
 * Function that returns a view for displaying announcements
 * @component
 * @returns { View } for displaying announcements
 */
export default function ModalScreen() {
  const currentData: Announcement[] = [];
  const announcementRef = firebase.database().ref().child("Announcements/");
  const [data, setData] = useState<Announcement[]>([]);
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
    
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {
        <FlatList          
       data={announcementData}          
       renderItem={({ item }) => ( 
         
           <View style={{paddingBottom: -10}} >
             <TouchableOpacity onPress={() => { alert(item.content)}} >
             <Text style={styles.listItem}>{item.subject}</Text>
            </TouchableOpacity>
           </View>
       )}          
     keyExtractor={item => item.announcementID}  
     //ItemSeparatorComponent={renderSeparator} 
     
     //ListHeaderComponent={<Text>Announcements</Text>}                             
     />         
      
      
      }
     
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
  listItem: {
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
