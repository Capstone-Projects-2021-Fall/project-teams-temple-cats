import firebase from 'firebase';
import * as React from 'react';
import {
  StyleSheet, Button, SafeAreaView, ScrollView,
} from 'react-native';
import { useState } from 'react';
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.announcementWrapper}>
          <Text style={styles.title}>
            {announcementData.length}
            {' '}
            {(announcementData.length > 1 || announcementData.length === 0) ? 'Announcements' : 'Announcement'}
          </Text>
          {announcementData.map((announcement, index) => (
            <View style={styles.listItem} key={index}>
              <Text style={styles.listItemSubject}>
                {announcement.subject}
              </Text>
              <Text style={styles.listItemContent}>
                {announcement.content}
              </Text>
              <Text style={styles.listItemDateTime}>
                {announcement.time}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {isModerator && (
        <Button
          color="#fff"
          title="Create announcement"
          onPress={() => {
            navigation.push('CreateAnnouncement');
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(160, 28, 52, 0.65)',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
  },
  announcementWrapper: {
    backgroundColor: 'transparent',
    paddingTop: 30,
  },
  listItem: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#8b0000',
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    width: 350,
    borderRadius: 20,
    display: 'flex',
  },
  listItemSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  listItemContent: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },
  listItemDateTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'flex-end',
  },
});
