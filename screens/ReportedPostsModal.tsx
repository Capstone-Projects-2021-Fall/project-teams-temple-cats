import * as React from 'react';
import { StyleSheet, Image, Button, Alert, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import firebase from '../utils/firebase';
import { Text, View } from '../components/Themed';
import { Cat, Comment, Report, RootStackScreenProps } from '../types';
/**
 * Function that renders the screen for resolving reported posts.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the account button in navigation
 * @returns {JSX.Element} JSX element of the account screen
 */
export default function ModalScreen({ navigation }: RootStackScreenProps<'ReportedPosts'>) {
  const [reportedCats, setReportedCats] = React.useState<Cat[]>([]);
  const [reportedComments, setReportedComments] = React.useState<Comment[]>([]);

  const catsRef = firebase.database().ref().child('Cats/');
  const picsRef = firebase.storage().ref();

  useEffect(() => {
    catsRef.get().then((snapshot) => {
      const cats: Cat[] = Object.values(snapshot.val());
      const reportedCats: Cat[] = [];
      const reportedComments: Comment[] = [];

      cats.forEach((cat) => {
        // find cats that have reports
        if (cat.reports && Object.keys(cat.reports).length > 0) {
          picsRef
            .child(`${cat.accountID}/${cat.catID}`)
            .getDownloadURL()
            .then((picUrl) => {
              cat.media = picUrl;
            });
          reportedCats.push(cat);
        }

        // find comments that have reports
        if (cat.commentList) {
          Object.values(cat.commentList).forEach((comment) => {
            if (comment.reports && Object.keys(comment.reports).length > 0) {
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
      <Text style={styles.title}>Reported Cats</Text>
      {/* <View style={styles.separator}/> */}
      <View style={styles.flexColumnContainer}>
        {reportedCats.map((cat, index) => (
          <View key={index} style={styles.flexRowContainer}>
            <TouchableOpacity onPress={() => navigation.push('Cat', { cat })}>
              <Image style={styles.catImage} source={{ uri: cat.media }} />
            </TouchableOpacity>
            {Object.values(cat.reports).map((report, index) => (
              <View key={index}>
                <Text>{`Reason: ${report.reason}`}</Text>
                <Button title="Resolve" color="#9D2235" onPress={() => resolveReport(report)} />
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.separator} />

      <Text style={styles.title}>Reported Comments</Text>
      {/* <View style={styles.separator}/> */}
      <View style={styles.flexColumnContainer}>
        {reportedComments.map((comment, index) => (
          <View key={index} style={styles.flexRowContainer}>
            <Text>{comment.content}</Text>
            {Object.values(comment.reports).map((report, index) => (
              <View key={index}>
                <Text>{`Reason: ${report.reason}`}</Text>
                <Button title="Resolve" color="#9D2235" onPress={() => resolveReport(report)} />
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );

  function resolveReport(report: Report) {
    Alert.alert(
      'Alert',
      'Do you want to resolve this report? This will delete the report. This should be done when you have reviewed the report and do not want to delete the post.',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            catsRef.child(`${report.catID}/reports/${report.reportID}`).remove();
            setReportedCats(reportedCats.filter((cat) => cat.catID !== report.catID));
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
