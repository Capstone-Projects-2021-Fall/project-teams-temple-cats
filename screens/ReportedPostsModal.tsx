import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import firebase from "../utils/firebase";
import { Text, View } from '../components/Themed';
import { useEffect } from 'react';
import { Cat, Comment } from '../types';

export default function ModalScreen() {
  const [reportedCats, setReportedCats] = React.useState<Cat[]>([]);
  const [reportedComments, setReportedComments] = React.useState<Comment[]>([]);

  const catsRef = firebase.database().ref().child('Cats/');
  const picsRef = firebase.storage().ref();

  useEffect(() => {
    let cats: Cat[];
    catsRef.get().then((snapshot) => {
      cats = Object.values(snapshot.val());

      // find cats that have reports
      const reportedCats = cats.filter((cat) => {
        picsRef.child(cat.accountID + '/' + cat.catID).getDownloadURL().then((picUrl) => cat.media = picUrl);
        return cat.reports && Object.keys(cat.reports).length > 0;
      })
      setReportedCats(reportedCats);

      // find comments that have reports
      const reportedComments: Comment[] = [];
      cats.forEach((cat) => {
        if (cat.commentList) {
          Object.values(cat.commentList).forEach((comment) => {
            if (comment.reports && Object.keys(comment.reports).length > 0) {
              reportedComments.push(comment);
            }
          });
        }
      });
      setReportedComments(reportedComments);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reported Cats</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {reportedCats?.map((cat, index) => (
        <Image
          style={{
            width: 40,
            height: 40,
            borderWidth: 4,
            borderColor: 'rgba(160, 28, 52, 0.75)',
            borderRadius: 7,
          }}
          source={{ uri: cat.media }}
        />
      ))}

      <Text style={styles.title}>Reported Comments</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {reportedComments?.map((comment, index) => (
        <Text>{comment.content}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
