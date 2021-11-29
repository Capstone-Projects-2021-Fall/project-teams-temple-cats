import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Modal, StyleSheet, Dimensions, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { v4 as uuidv4 } from 'uuid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../components/Themed';
import CommentComponent from '../components/CommentComponent';
import { AuthContext } from '../context/FirebaseAuthContext';
import firebase from '../utils/firebase';
import { Cat, Comment, RootTabScreenProps, Report } from '../types';

const { width } = Dimensions.get('window');
const modStatus: any[] = [];
/**
 * Function that renders the modal for displaying a reported cat.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the home button in navigation
 * @returns {JSX.Element} JSX element of the cat modal screen
 */
export default function ModalScreen({ route }, { navigation }: RootTabScreenProps<'Home'>) {
  const { cat } = route.params;
  const commentsRef = firebase.database().ref().child(`Cats/${cat.catID}/commentList/`);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const newState: Comment[] = [];
  const [isModalVisible, setModalVisible] = useState(false);
  const [votes, setVotes] = useState(cat.votes);
  const [word, setWord] = useState<any>([]);
  const user = React.useContext(AuthContext);
  const [showValidation, setShowValidation] = useState(true);
  const [expoNotif, setexpoNotif] = React.useState<any[]>([]);


  const [report, setReport]: Report = useState({
    reportID: '',
    catID: cat.catID,
    accountID: firebase.auth().currentUser?.uid,
    reason: '',
  });

  const [comment, setComment]: Cat = useState({
    commentID: `${new Date()} ${uuidv4()}`,
    content: '',
    accountID: firebase.auth().currentUser?.uid,
    reports: '',
  });

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
    setReport((currentState: Report) => ({
      ...currentState,
      reportID: `${uuidv4()}`,
    }));
  };

  const deleteCat = () => {
    const catRef = firebase.database().ref('Cats').child(cat.catID);
    catRef.remove();
    const imageRef = firebase.storage().refFromURL(cat.media);
    imageRef.delete();
  };

  const showValidationAlert = () =>
    Alert.alert('Delete', 'Are your sure you want to delete this post?', [
      {
        text: 'Yes',
        onPress: () => {
          setShowValidation(false);
          deleteCat();
        },
      },
      {
        text: 'No',
      },
    ]);

  useEffect(() => {
    commentsRef.on('child_added', (snapshot) => {
      newState.push(snapshot.val());
      setCommentList([...newState]);
    });
  }, []);

  useEffect(() => {
    firebase
      .database()
      .ref(`Accounts/${user?.uid}/modStatus`)
      .on('value', (snapshot) => {
        modStatus.push(snapshot.val());
        setWord(modStatus);
      });

      firebase.database().ref().child('Accounts/').on('value', function (snapshot) {
        const Accounts: any[] = Object.values(snapshot.val());
        const tokens: any[] = [];
  
    
  
        Accounts.forEach((account) => {
          if ((account.expoNotif && Object.keys(account.expoNotif).length > 0) && (account.modStatus === 3)){
            tokens.push(account.expoNotif)
          }
        }
        );
        setexpoNotif(tokens)
        //console.log(tokens)
      });

  }, []);

  async function sendPushNotification(array: string[], name: String) {

    for (let i = 0; i < array.length; i++) {

      const message = {
        to: array[i],
        sound: 'default',
        title: 'Temple Cats',
        body: 'Comment has been submitted on Cat: ' + name,
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

  async function sendPushNotificationReport(array: string[], name: String) {

    for (let i = 0; i < array.length; i++) {

      const message = {
        to: array[i],
        sound: 'default',
        title: 'Temple Cats',
        body: 'A report has been made on Cat: ' + name,
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
        <Text style={styles.title}>{cat.name ? `Known Name: ${cat.name}\n` : 'Unknown Name'}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Image
          style={styles.catImage}
          source={{
            uri: cat.media,
          }}
        />
        <View style={styles.separator} lightColor="rgba(255,255,255,0.1)" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.voteContainer}>
          <Icon
            name="chevron-up"
            color="white"
            type="material-community"
            size={30}
            onPress={() => {
              setVotes(votes + 1);
              firebase
                .database()
                .ref()
                .child(`Cats/${cat.catID}/votes`)
                .set(votes + 1);
            }}
          />
          <Text style={styles.upvoteStyle}>{`${votes} upvotes`}</Text>
          <Icon
            name="chevron-down"
            color="white"
            type="material-community"
            size={30}
            onPress={() => {
              setVotes(votes - 1);
              firebase
                .database()
                .ref()
                .child(`Cats/${cat.catID}/votes`)
                .set(votes - 1);
            }}
          />
        </View>
        <View style={styles.separator} lightColor="rgba(255,255,255,0.1)" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.catDate}>{`Date Sighted: ${cat.date} ${cat.time}\n`}</Text>
        <View style={styles.cattributeContainer}>
          <Text style={styles.catInfo}>{cat.friendly != null ? `Friendly: ${cat.friendly}\n` : ''}</Text>
        </View>
        <View style={styles.cattributeContainer}>
          <Text style={styles.catInfo}>{cat.healthy != null ? `Healthy: ${cat.healthy}\n` : ''}</Text>
        </View>
        <View style={styles.cattributeContainer}>
          <Text style={styles.catInfo}>{cat.kitten != null ? `Kitten: ${cat.kitten}\n` : ''}</Text>
        </View>
        <View style={styles.cattributeContainer}>
          <Text style={styles.catInfo}>{cat.color ? `Color: ${cat.color}\n` : ''}</Text>
        </View>
        <View style={styles.cattributeContainer}>
          <Text style={styles.catInfo}>{cat.eyeColor ? `Eye Color: ${cat.eyeColor}` : ''}</Text>
        </View>
        <View style={styles.cattributeContainer}>
          <Text style={styles.catInfo}>
            {cat.comments ? `Additional Comments: ${cat.comments}\n` : 'No Additional Info'}
          </Text>
        </View>
        <View style={styles.bottomSeparator} lightColor="rgba(255,255,255,0.1)" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.catDate}>Comment Thread:</Text>
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
          onChangeText={(text) =>
            setComment((currentState: Comment) => ({
              ...currentState,
              content: text,
            }))
          }
        />
        <Button
          title="Submit Comment"
          buttonStyle={styles.buttonStyle}
          onPress={() => {
            firebase.database().ref().child(`Cats/${cat.catID}/commentList/${comment.commentID}`).set(comment);
            setComment((currentState: Comment) => ({
              ...currentState,
              commentID: `${new Date()} ${uuidv4()}`,
            }));
            sendPushNotification(expoNotif, cat.name)
          }}
        />
        <View style={styles.bottomSeparator} lightColor="rgba(255,255,255,0.1)" darkColor="rgba(255,255,255,0.1)" />
        <View>
          <Button title="Report" buttonStyle={styles.buttonStyle} onPress={toggleModalVisibility} />
          <Modal
            animationType="slide"
            transparent
            visible={isModalVisible}
            presentationStyle="overFullScreen"
            onDismiss={toggleModalVisibility}
          >
            <View style={styles.viewWrapper}>
              <View style={styles.modalView}>
                <Text style={styles.reportHeader}> Report </Text>
                <Input
                  style={styles.textInput}
                  value={report.reason}
                  selectionColor="white"
                  placeholder="Enter why you're reporting this post..."
                  placeholderTextColor="black"
                  onChangeText={(text) =>
                    setReport((currentState: Report) => ({
                      ...currentState,
                      reason: text,
                    }))
                  }
                />
                <Button
                  title="Submit"
                  buttonStyle={styles.buttonStyle}
                  onPress={() => {
                    toggleModalVisibility();
                    console.log(report);
                    firebase.database().ref().child(`Cats/${cat.catID}/reports/${report.reportID}`).set(report);
                    sendPushNotificationReport(expoNotif, cat.name)
                  }}
                />
                <Button title="Close" buttonStyle={styles.buttonStyle} onPress={toggleModalVisibility} />
              </View>
            </View>
          </Modal>
        </View>
        {JSON.stringify(modStatus[0]) === '3' ? (
          <Button title="Delete Cat" buttonStyle={styles.buttonStyle} onPress={() => showValidationAlert()} />
        ) : null}
        <View />
        <View style={styles.bottomSeparator} lightColor="#8B0000" darkColor="rgba(255,255,255,0.1)" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#8B0000',
    textAlign: 'center',
    height: 35,
    letterSpacing: 1,
  },
  upvoteStyle: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    height: 5,
    width: '40%',
  },
  content: {
    fontSize: 20,
  },
  commentInput: {
    height: 'auto',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#8B0000',
    backgroundColor: 'white',
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
  scrollView: {
    height: 160,
    backgroundColor: '#8B0000',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 300,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
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
  catImage: {
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
  voteContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#8B0000',
    marginLeft: 'auto',
    borderRadius: 40,
    marginRight: 'auto',
  },
  cattributeContainer: {
    height: 20,
    borderRadius: 40,
    backgroundColor: '#8B0000',
    marginBottom: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 5,
    paddingRight: 5,
  },
  additionalCommentContainer: {
    width: 'auto',
    height: 'auto',
    borderRadius: 40,
    backgroundColor: '#8B0000',
    marginBottom: 5,
  },
  catInfo: {
    justifyContent: 'center',
    color: 'white',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  catDate: {
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    fontSize: 19,
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
  bottomSeparator: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    height: 5,
    width: '100%',
  },
});
