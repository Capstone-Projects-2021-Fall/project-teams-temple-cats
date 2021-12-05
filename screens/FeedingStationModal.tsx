import firebase from 'firebase';
import React, { useState } from 'react';
import {
  StyleSheet, Image, SafeAreaView, ScrollView, Modal, Dimensions,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { v4 as uuidv4 } from 'uuid';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../context/FirebaseAuthContext';
import { Text, View } from '../components/Themed';
import {
  Announcement, AnnouncementFeeder, FeedingStations, Comment, Report, RootStackParamList, RootTabScreenProps, CommentType,
} from '../types';
import { addAnnouncementFeeder, addPoints, sendPushNotificationWithWordFeeding } from '../utils/dbInterface';
import CommentComponent from '../components/CommentComponent';

/**
 * Function that renders the modal for viewing information on a feeding station.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the home button in navigation
 * @returns {JSX.Element} JSX element of the feeding station modal screen
 */
const { width } = Dimensions.get('window');
const modStatus: any[] = [];

export default function ModalScreen({ route }) {
  const station: FeedingStations = route.params.feedingStation;
  // console.log(route.params.info)
  const [word, setWord] = useState<any>([]);
  const user = React.useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [expoNotif, setexpoNotif] = React.useState<any[]>([]);
  const [announcementFeeder, setAnnouncementFeeder]: AnnouncementFeeder = useState({
    announcementID: uuidv4(),
    location: '',
    subject: '',
    content: '',
    time: '',
  });
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const newState: Comment[] = [];
  const [comment, setComment] = useState<Comment>({
    commentID: `${new Date()} ${uuidv4()}`,
    content: '',
    accountID: firebase.auth().currentUser?.uid,
    reports: '',
    type: CommentType.Comment,
  });

  React.useEffect(() => {
    firebase
      .database()
      .ref(`Accounts/${user?.uid}/modStatus`)
      .on('value', (snapshot) => {
        modStatus.push(snapshot.val());
        setWord(modStatus);
      });

    firebase
      .database()
      .ref(`Stations/${station.street}/commentList`)
      .on('child_added', (snapshot) => {
        newState.push(snapshot.val());
        setCommentList([...newState]);
      });

    const date = new Date().getDate(); // Current Date
    const month = new Date().getMonth() + 1; // Current Month
    const year = new Date().getFullYear(); // Current Year
    const hours = new Date().getHours(); // Current Hours
    const min = new Date().getMinutes(); // Current Minutes
    const sec = new Date().getSeconds(); // Current Seconds

    setAnnouncementFeeder((currentState: Announcement) => ({
      ...currentState,
      location: 'test',
      time: `${month}/${date}/${year}/${hours}:${min}:${sec}`,
    }));

    firebase.database().ref().child('Accounts/').on('value', (snapshot) => {
      const Accounts: any[] = Object.values(snapshot.val());
      const tokens: any[] = [];

      Accounts.forEach((account) => {
        if ((account.expoNotif && Object.keys(account.expoNotif).length > 0)) {
          tokens.push(account.expoNotif);
        }
      });
      setexpoNotif(tokens);
      // console.log(tokens)
    });
  }, []);

  const statusReports: any[] = [];

  for (const i in station.info) {
    statusReports.push(station.info[i]);
  }

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
    setAnnouncementFeeder((currentState: AnnouncementFeeder) => ({
      ...currentState,
      announcementID: `${uuidv4()}`,
      location: 'test',
    }));
  };

  async function sendPushNotification(array: string[]) {
    for (let i = 0; i < array.length; i++) {
      const message = {
        to: array[i],
        sound: 'default',
        title: 'Temple Cats',
        body: 'A new feeder announcement has been posted',
        data: { someData: 'goes here' },
      };

      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.titleSeparator} />
        <Text style={styles.title}>{station.street}</Text>
        <View style={styles.titleSeparator} />
        <Image
          style={styles.image}
          source={{
            uri: 'https://www.alleycat.org/wp-content/uploads/2017/01/feeding-2-300x225.gif',
          }}
        />
        <View>
          <Button title="Create Announcement" buttonStyle={styles.buttonStyle} onPress={toggleModalVisibility} />
          <Modal
            animationType="slide"
            transparent
            visible={isModalVisible}
            presentationStyle="overFullScreen"
            onDismiss={toggleModalVisibility}
          >
            <View style={styles.viewWrapper}>
              <View style={styles.modalView}>
                <Text style={styles.reportHeader}> Announcement </Text>
                <Input
                  style={styles.textInput}
                  value={announcementFeeder.subject}
                  selectionColor="black"
                  placeholder="Enter subject of announcement..."
                  placeholderTextColor="black"
                  onChangeText={(text) => setAnnouncementFeeder((currentState: AnnouncementFeeder) => ({
                    ...currentState,
                    subject: text,
                  }))}
                />
                <Input
                  style={styles.additionalInput}
                  value={announcementFeeder.content}
                  selectionColor="black"
                  placeholder="Enter content of announcement..."
                  placeholderTextColor="black"
                  onChangeText={(text) => setAnnouncementFeeder((currentState: AnnouncementFeeder) => ({
                    ...currentState,
                    content: text,
                    location: station.street,
                  }))}
                />
                <Button
                  title="Submit"
                  buttonStyle={styles.buttonStyle}
                  onPress={() => {
                    toggleModalVisibility();
                    sendPushNotification(expoNotif);

                    console.log(announcementFeeder);
                    addAnnouncementFeeder(announcementFeeder);
                  }}
                />
                <Button title="Close" buttonStyle={styles.buttonStyle} onPress={toggleModalVisibility} />
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.separator} lightColor="#8B0000" darkColor="rgba(255,255,255,0.1)" />
        {statusReports.map((item, index) => (
          <View key={index} style={styles.content}>
            <Text style={styles.contentList}>
              {`Status: ${item.status}`}
              {'\n'}
              {`Ingredients Needed: ${item.ingredients}`}
              {'\n'}
              {`Time: ${item.time}`}
              {'\n'}
            </Text>
          </View>
        ))}
        <View style={styles.separator} lightColor="#8B0000" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.sectionHeader}>Comment Thread:</Text>
        <ScrollView style={styles.scrollView}>
          {commentList.map((comment, index) => (
            <CommentComponent key={index} comment={comment} />
          ))}
        </ScrollView>
        <Input
          style={styles.commentInput}
          value={comment.content}
          placeholder="Enter Comment..."
          placeholderTextColor="#8B0000"
          onChangeText={(text) => setComment((currentState: Comment) => ({
            ...currentState,
            content: text,
          }))}
        />
        <View style={styles.pickers}>
          <Picker
            style={styles.commentTypePicker}
            selectedValue={comment.type}
            onValueChange={(itemValue, itemIndex) => {
              setComment((currentState: Comment) => ({
                ...currentState,
                type: itemValue,
              }));
            }}
          >
            {[CommentType.Comment, CommentType.Station].map((item, index) => (
              <Picker.Item label={item} value={item} key={index} />
            ))}
          </Picker>
        </View>
        <Button
          title="Submit Comment"
          buttonStyle={styles.buttonStyle}
          onPress={() => {
            submitComment();
            sendPushNotificationWithWordFeeding(expoNotif, station.street);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );

  function submitComment() {
    firebase.database().ref().child(`Stations/${station.street}/commentList/${comment.commentID}`).set(comment);
    setComment((currentState: Comment) => ({
      ...currentState,
      commentID: `${new Date()} ${uuidv4()}`,
    }));
    if (comment.type == CommentType.Station) {
      addPoints(30, firebase.auth().currentUser?.uid);
    }
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginBottom: 5,
    backgroundColor: '#8B0000',
    marginLeft: 'auto',
    marginRight: 'auto',
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
  reportHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#8B0000',
    textAlign: 'center',
    letterSpacing: 1,
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  textInput: {
    width: '80%',
    fontSize: 15,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
  },
  additionalInput: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 400,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#8B0000',
    textAlign: 'center',
  },
  titleSeparator: {
    height: 5,
    width: '100%',
    backgroundColor: 'rgba(160, 28, 52, 0.75)',
  },
  separator: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    height: 3,
    width: '100%',
  },
  content: {
    justifyContent: 'center',
  },
  contentList: {
    textAlign: 'center',
    fontSize: 16,
  },
  commentInput: {
    height: 'auto',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#8B0000',
    backgroundColor: 'white',
  },
  pickers: {
    width: 350,
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
  },
  commentTypePicker: {
    width: 350,
    height: 40,
  },
  bottomSeparator: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
    height: 5,
    width: '100%',
  },
  sectionHeader: {
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    fontSize: 19,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 15,
  },
  scrollView: {
    height: 160,
    backgroundColor: '#8B0000',
  },
});
