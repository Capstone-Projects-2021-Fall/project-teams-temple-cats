import * as React from 'react';
import { StyleSheet, Image, Button, Alert, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import firebase from '../utils/firebase';
import { Text, View } from '../components/Themed';
import { Cat, Comment, RootStackScreenProps } from '../types';
/**
 * Function that renders the screen for resolving downvoted posts.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the account button in navigation
 * @returns {JSX.Element} JSX element of the reported posts modal screen
 */
export default function ModalScreen({ navigation }: RootStackScreenProps<'ReportedPosts'>) {
  const [reportedCats, setReportedCats] = React.useState<Cat[]>([]);
  const [reportedComments, setReportedComments] = React.useState<Comment[]>([]);

  const catsRef = firebase.database().ref().child('Cats/');

  useEffect(() => {
    catsRef.get().then((snapshot) => {
      const cats: Cat[] = Object.values(snapshot.val());
      const reportedCats: Cat[] = [];
      const reportedComments: Comment[] = [];

      cats.forEach((cat) => {
        if (cat.votes <= -3) {
          reportedCats.push(cat);
        }

        if (cat.commentList) {
          Object.values(cat.commentList).forEach((comment) => {
            if (comment.votes <= -3) {
              reportedComments.push(comment);
            }
          });
        }
      });

      setReportedCats(reportedCats);
      setReportedComments(reportedComments);
    });
  }, []);

  return (
    <View style={[styles.container, styles.flexColumnContainer]}>
      <Text style={styles.title}>Downvoted Cats</Text>
      {/* <View style={styles.separator}/> */}
      <View style={styles.flexColumnContainer}>
        {reportedCats.map((cat, index) => (
          <View key={index} style={styles.flexRowContainer}>
            <TouchableOpacity onPress={() => navigation.push('Cat', { cat })}>
              <Image style={styles.catImage} source={{ uri: cat.media }} />
            </TouchableOpacity>
            <View key={index}>
              <Text>{`Downvotes: ${cat.votes}`}</Text>
              <Button title="Resolve" color="#9D2235" onPress={() => resolveCat(cat)} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.separator} />

      <Text style={styles.title}>Downvoted Comments</Text>
      {/* <View style={styles.separator}/> */}
      <View style={styles.flexColumnContainer}>
        {reportedComments.map((comment, index) => (
          <View key={index} style={styles.flexRowContainer}>
            <Text>{comment.content}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  function resolveCat(cat: Cat) {
    Alert.alert(
      'Alert',
      'Do you want delete this post?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            catsRef.child(`${cat.catID}`).remove();
            setReportedCats(reportedCats.filter((cats) => cats.catID !== cat.catID));
          },
        },
      ],
      { cancelable: true },
    );
  }
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
    color: 'rgba(160, 28, 52, 0.75)',
  },
  flexColumnContainer: {
    flex: 1,
  },
  flexRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  catImage: {
    width: 70,
    height: 70,
    borderWidth: 4,
    borderColor: 'rgba(160, 28, 52, 0.75)',
    borderRadius: 7,
  },
});
