import firebase from 'firebase';
import * as React from 'react';
import {
  StyleSheet, SafeAreaView, ScrollView, Switch,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useState } from 'react';
import { Announcement, AnnouncementFeeder, RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../context/FirebaseAuthContext';

const modStatus: any[] = [];

/**
 * Function that returns a view for displaying announcements
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the home button in navigation
 * @returns { JSX.Element } JSX element for modal screen displaying announcements
 */
export default function Announcements({ navigation }: RootTabScreenProps<'Home'>) {
  const announcementRef = firebase.database().ref('Announcements/general');
  const announcementFeederRef = firebase.database().ref('Announcements/feeder/');
  const [announcementData, setAnnouncementData] = React.useState<Announcement[]>([]);
  const [announcementFeederData, setAnnouncementFeederData] = React.useState<AnnouncementFeeder[]>([]);
  const [word, setWord] = useState<any>([]);
  const [value, setValue] = useState<any>([]);

  const user = React.useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);

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
        if (announcement.content && Object.keys(announcement.content).length > 0) {
          announcementDataTmp.push(announcement);
        }
      });
      setAnnouncementData(announcementDataTmp);
      setValue(announcements);
    });

    announcementFeederRef.get().then((snapshot) => {
      const announcements: AnnouncementFeeder[] = Object.values(snapshot.val());
      const announcementDataTmp: AnnouncementFeeder[] = [];
      announcements.forEach((announcement) => {
        // find cats that have reports
        if (announcement.content && Object.keys(announcement.content).length > 0) {
          announcementDataTmp.push(announcement);
        }
      });
      setAnnouncementFeederData(announcementDataTmp);
    });
  }, []);

  function toggleSwitch() {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      setValue(announcementData);
    } else {
      setValue(announcementFeederData);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', backgroundColor: 'transparent', top: 15 }}>
        <Text style={styles.toggleText}>General  </Text>
        <Switch
          trackColor={{ false: '#696969', true: '#8b0000' }}
          thumbColor={isEnabled ? 'white' : 'white'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            toggleSwitch();
          }}
          value={isEnabled}
        />
        <Text style={styles.toggleText}>  Feeder</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.announcementWrapper}>

          <Text style={styles.title}>
            {value.length}
            {' '}
            {(value.length > 1 || value.length === 0) ? 'Announcements' : 'Announcement'}
          </Text>
          {value.map((announcement, index) => (
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
      {isModerator && !isEnabled && (
        <Button
          buttonStyle={styles.buttonStyle}
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
  toggleText: {
    top: 1,
    right: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 90,
    borderRadius: 40,
    backgroundColor: '#8B0000',
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
