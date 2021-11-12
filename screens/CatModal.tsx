import React, { useState, useEffect } from 'react';
import {
  Image, ScrollView, Modal, StyleSheet, Dimensions,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { v4 as uuidv4 } from 'uuid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../components/Themed';
import CommentComponent from '../components/CommentComponent';
import firebase from '../utils/firebase';
import {
  Cat, Comment, RootTabScreenProps, Report,
} from '../types';

const { width } = Dimensions.get('window');

export default function ModalScreen({ route }, { navigation }: RootTabScreenProps<'Home'>) {
  const { cat } = route.params;
  const commentsRef = firebase.database().ref().child(`Cats/${cat.catID}/commentList/`);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const newState: Comment[] = [];
  const [isModalVisible, setModalVisible] = useState(false);
  // const [inputValue, setInputValue] = useState('');
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

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

  useEffect(() => {
    commentsRef.on('child_added', (snapshot) => {
      newState.push(snapshot.val());
      setCommentList([...newState]);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.title}>
          {cat.votes}
          {' '}
          updoots
        </Text>
        <Image
          style={{ width: 200, height: 200 }}
          source={{
            uri: cat.media,
          }}
        />

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={styles.content}>
          <Text>
            {`Date Sighted: ${cat.date} ${cat.time}\n`}
            {cat.name ? `Collar Name: ${cat.name}\n` : ''}
            {cat.color ? `Color: ${cat.color}\n` : ''}
            {cat.eyeColor ? `Eye Color: ${cat.eyeColor}\n` : ''}
            {cat.kitten != null ? `Kitten: ${cat.kitten}\n` : ''}
            {cat.healthy != null ? `Healthy: ${cat.healthy}\n` : ''}
            {cat.friendly != null ? `Friendly: ${cat.friendly}\n` : ''}
            {cat.comments ? `Additional Comments: ${cat.comments}\n` : ''}
          </Text>
        </View>
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
                <Text> Report </Text>
                <Input
                  style={styles.textInput}
                  value={report.reason}
                  selectionColor="white"
                  placeholder="Enter why you're reporting this post..."
                  placeholderTextColor="black"
                  onChangeText={(text) => setReport((currentState: Report) => ({
                    ...currentState,
                    reason: text,
                  }))}
                />
                <Button
                  title="Submit"
                  buttonStyle={styles.buttonStyle}
                  onPress={() => {
                    toggleModalVisibility();
                    setReport((currentState: Report) => ({
                      ...currentState,
                      reportID: `${uuidv4()}`,
                    }));
                    firebase.database().ref().child(`Cats/${cat.catID}/reports/${report.reportID}`).set(report);
                  }}
                />
                <Button title="Close" buttonStyle={styles.buttonStyle} onPress={toggleModalVisibility} />
              </View>
            </View>
          </Modal>
        </View>
        <ScrollView style={styles.scrollView}>
          {commentList.map((comment, index) => (
            <CommentComponent key={index} comment={comment} />
          ))}
        </ScrollView>
        <Input
          style={styles.commentInput}
          value={comment.content}
          selectionColor="white"
          placeholder="Enter Comment"
          placeholderTextColor="black"
          onChangeText={(text) => setComment((currentState: Comment) => ({
            ...currentState,
            content: text,
          }))}
        />
        <Button
          title="Submit Comment"
          buttonStyle={styles.buttonStyle}
          containerStyle={{
            alignItems: 'center',
            marginBottom: 10,
          }}
          onPress={() => {
            firebase.database().ref().child(`Cats/${cat.catID}/commentList/${comment.commentID}`).set(comment);
            setComment((currentState: Comment) => ({
              ...currentState,
              commentID: `${new Date()} ${uuidv4()}`,
            }));
          }}
        />
        <View />
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
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 40,
    height: 1,
    width: '80%',
  },
  content: {
    fontSize: 20,
  },
  commentInput: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  buttonStyle: {
    width: 150,
    padding: 10,
    backgroundColor: '#9D2235',
    borderRadius: 30,
  },
  scrollView: {
    height: 100,
    backgroundColor: 'white',
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
    transform: [{ translateX: -(width * 0.4) },
      { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  textInput: {
    width: '80%',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
  },
});
