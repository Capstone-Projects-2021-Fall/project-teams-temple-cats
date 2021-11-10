import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { v4 as uuidv4 } from 'uuid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../components/Themed';
import firebase from '../utils/firebase';
import { Cat, RootStackParamList, RootTabScreenProps } from '../types';

export default function ModalScreen({ route }, { navigation }: RootTabScreenProps<'Home'>) {
  const { cat } = route.params;

  const [comment, setComment]: Cat = useState({
    commentID: uuidv4(),
    content: '',
    accountID: firebase.auth().currentUser?.uid,
    reports: '',
  });

  return (
    <SafeAreaView>
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
          firebase.database().ref().child(`Cats/${cat.catID}/comments/${comment.commentID}`).set(comment);
        }}
      />
      <View />
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
    height: 120,
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
});
