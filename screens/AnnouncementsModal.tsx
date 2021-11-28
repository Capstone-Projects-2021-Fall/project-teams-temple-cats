// import { FontAwesome, Ionicons } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import * as React from 'react';
import {
  Image, FlatList, Platform, StyleSheet, Button, SafeAreaView, ScrollView,
} from 'react-native';
import { Colors, Icon } from 'react-native-elements';
import { useState } from 'react';
// import { black } from 'react-native-paper/lib/typescript/styles/colors';
// import Mod from '../components/Mod';
import { Announcement, RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../context/FirebaseAuthContext';

const modStatus: any[] = [];

/**
 * Function that returns a view for displaying announcements
 * @component
 * @returns { View } for displaying announcements
 */
export default function ModalScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const announcementRef = firebase.database().ref('Announcements/');
  const [announcementData, setAnnouncementData] = React.useState<Announcement[]>([]);

  const [word, setWord] = useState<any>([]);

  const user = React.useContext(AuthContext);

  const isModerator = JSON.stringify(modStatus[0]) === '3';

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
    <SafeAreaView style={styles.container}>

      {/* <Image
          style={{ width: 200, height: 200, top: 5 }}
          source={{
            uri: 'https://i1.wp.com/consciouscat.net/wp-content/uploads/2017/12/cat-newspaper-e1513176589145.jpg?resize=550%2C367&ssl=1',
          }}
        /> */}

      <ScrollView>
        {announcementData.map((announcement, index) => (
          <View style={styles.listItem} key={index}>
            <Text style={styles.listItemInfo}>
              {announcement.subject}
              :
              {' '}
              {announcement.content}
            </Text>
            <Text>
              {announcement.time}
            </Text>
          </View>
        ))}

        {isModerator && (
          <Button
            // color="#000"
            title="Create announcement"
            onPress={() => {
              navigation.push('CreateAnnouncement');
            }}
          />
        )}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8b0000',
  },
  listItem: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(160, 28, 52, 1)',
    marginTop: 10,
    marginBottom: 10,
  },
  listItemInfo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
