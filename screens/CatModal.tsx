<<<<<<< HEAD
import React from 'react';
import { useState} from 'react';
import { Button, StyleSheet, Image} from 'react-native';
import { Text, View } from '../components/Themed';
import { Cat, RootStackParamList, RootTabScreenProps } from '../types';
import Report from '../components/Report';

export default function ModalScreen({ route }, { navigation }: RootTabScreenProps<'Home'>) {
  const cat: Cat = route.params.cat;
  const [reportModalVisible, setReportModalVisible] = useState(false);
  function onReport() {
    setReportModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cat.votes} updoots</Text>
      <Image
        style={{ width: 200, height: 200, top: -150 }}
        source={{
          uri: cat.media
        }}
      />
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />      
      <View style={styles.content}>
        <Text style={styles.contentList}>
          {'Date Sighted: ' + cat.date + ' ' + cat.time + '\n'}
          {cat.name ? 'Collar Name: ' + cat.name + '\n' : ''}
          {cat.color ? 'Color: ' + cat.color + '\n' : ''}
          {cat.eyeColor ? 'Eye Color: ' + cat.eyeColor + '\n' : ''}
          {cat.kitten != null ? 'Kitten: ' + cat.kitten + '\n' : ''}
          {cat.healthy != null ? 'Healthy: ' + cat.healthy + '\n' : ''}
          {cat.friendly != null ? 'Friendly: ' + cat.friendly + '\n' : ''}
          {cat.comments ? 'Additional Comments: ' + cat.comments + '\n' : ''}
        </Text>
      </View>
      <Report/>
    </View>
=======
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { v4 as uuidv4 } from 'uuid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../components/Themed';
import CommentComponent from '../components/CommentComponent';
import firebase from '../utils/firebase';
import { Cat, Comment, RootTabScreenProps } from '../types';

export default function ModalScreen({ route }, { navigation }: RootTabScreenProps<'Home'>) {
  const { cat } = route.params;
  const commentsRef = firebase.database().ref().child(`Cats/${cat.catID}/commentList/`);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const newState: Comment[] = [];

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
        <Text style={styles.title}>{cat.votes} updoots</Text>
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
>>>>>>> 3fed67378a6a5d77cdbddf86e9b45d08ef940de6
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
<<<<<<< HEAD
});
=======
  scrollView: {
    height: 100,
    backgroundColor: 'white',
  },
});
>>>>>>> 3fed67378a6a5d77cdbddf86e9b45d08ef940de6
