import firebase from 'firebase';
import React, { useState } from 'react';
import { StyleSheet, Image,  SafeAreaView, ScrollView, Modal, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { AuthContext } from '../context/FirebaseAuthContext';
import { Text, View } from '../components/Themed';
import { v4 as uuidv4 } from 'uuid';
import { Announcement, AnnouncementFeeder, FeedingStation, Report, RootStackParamList, RootTabScreenProps } from '../types';
import { addAnnouncementFeeder } from '../utils/dbInterface';

/**
 * Function that renders the modal for viewing information on a feeding station.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the home button in navigation
 * @returns {JSX.Element} JSX element of the feeding station modal screen
 */
 const { width } = Dimensions.get('window');
 const modStatus: any[] = [];

export default function ModalScreen({ route }) {
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


  React.useEffect(() => {
    firebase
      .database()
      .ref(`Accounts/${user?.uid}/modStatus`)
      .on('value', (snapshot) => {
        modStatus.push(snapshot.val());
        setWord(modStatus);
      });
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
     
      setAnnouncementFeeder((currentState: Announcement) => ({
        ...currentState,
        time: month + '/' + date + '/' + year + '/' + hours + ':' + min + ':' + sec,
      }))


      firebase.database().ref().child('Accounts/').on('value', function (snapshot) {
        const Accounts: any[] = Object.values(snapshot.val());
        const tokens: any[] = [];
  
    
  
        Accounts.forEach((account) => {
          if ((account.expoNotif && Object.keys(account.expoNotif).length > 0)){
            tokens.push(account.expoNotif)
          }
        }
        );
        setexpoNotif(tokens)
        //console.log(tokens)
      });

    }, []);


  const statusReports: any[] = [];
  
  for (const i in route.params.info) {
    statusReports.push(route.params.info[i]);
  }

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
    setAnnouncementFeeder((currentState: AnnouncementFeeder) => ({
      ...currentState,
      announcementID: `${uuidv4()}`,
      location: route.params.title,
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
    
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.title}</Text>
      
      <Image
        style={{ width: 200, height: 200, top: -25 }}
        source={{
          uri: 'https://media.istockphoto.com/vectors/pet-food-food-for-cats-bowl-packaging-advertising-vector-simple-flat-vector-id1176308523?k=20&m=1176308523&s=612x612&w=0&h=dtUknn9C3iCgRDNkwbnuKUO9rwgf_5rNjLkPEX5_xiM=',
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
                  onChangeText={(text) =>
                    setAnnouncementFeeder((currentState: AnnouncementFeeder) => ({
                      ...currentState,
                      subject: text,
                    }))
                  }
                />
                <Input
                  style={styles.additionalInput}
                  value={announcementFeeder.content}
                  selectionColor="black"
                  placeholder="Enter content of announcement..."
                  placeholderTextColor="black"
                  onChangeText={(text) =>
                    setAnnouncementFeeder((currentState: AnnouncementFeeder) => ({
                      ...currentState,
                      content: text,
                    }))
                  }
                />
                <Button
                  title="Submit"
                  buttonStyle={styles.buttonStyle}
                  onPress={() => {
                    toggleModalVisibility();
                    sendPushNotification(expoNotif)
                    
                    console.log(announcementFeeder);
                    addAnnouncementFeeder(announcementFeeder);
                  }}
                />
                <Button title="Close" buttonStyle={styles.buttonStyle} onPress={toggleModalVisibility} />
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {statusReports.map((item) => (
        <View style={styles.content}>
          <Text style={styles.contentList}>
            {`Status: ${item.status}`}
            {'\n'}
            {`Ingredients Needed: ${item.ingredients}`}
            {'\n'}
            {`Time: ${item.time}`}
            {'\n\n'}
          </Text>
        </View>
      ))}
      
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 90,
   // top: -90,
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
    fontSize: 17,
    fontWeight: 'bold',
    top: 195,
  },
  separator: {
    marginVertical: 85,
    height: 1,
    width: '80%',
    top: -90,
  },
  content: {
    fontSize: 20,
    top: -190,
    left: -150,
  },
  contentList: {
    left: 100,
    top: 25,
  },
});
