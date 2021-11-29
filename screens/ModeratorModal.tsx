import * as React from 'react';
import { StyleSheet, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';


import firebase from "../utils/firebase";
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { Cat, Comment, Report, RootStackScreenProps, Application, Account } from '../types';
import { Divider } from 'react-native-elements';

export default function ModalScreen({ navigation }: RootStackScreenProps<'ReportedPosts'>) {

  const [submissons, setSubmissions] = React.useState<Account[]>([]);
  const [iDs, setiDs] = React.useState<any[]>([]);
  const [expoNotif, setexpoNotif] = React.useState<any[]>([]);


  let CatsCounter = 0;


  function changeStatus(accountID: string, notif: any) {
    alert("Moderator application has been approved");
    firebase
      .database()
      .ref()
      .child(`Accounts/${accountID}/modStatus`).set(3); //Set mod status to 3

    firebase
      .database()
      .ref()
      .child(`Accounts/${accountID}/Application`).remove(); //Remove application

      var notifyArray = [notif]
      sendPushNotification(notifyArray)

  }

  function findOccurences(accountID: string) {

    for (let i = 0; i <= iDs.length; i++) {
      if (iDs[i] === accountID) {
        CatsCounter++;
      }
      else {
        null
      }
    }
    return CatsCounter;
  }



  function removeApp(accountID: string, notif: any) {
    alert("Moderator application has been removed and denied")

    firebase
      .database()
      .ref()
      .child(`Accounts/${accountID}/Application`).remove(); //Remove application

      var notifArray = [notif]
      sendPushNotificationBad(notifArray)

  }


  //Looks for all accounts that have applications

  useEffect(() => {

    firebase.database().ref().child('Accounts/').on('value', function (snapshot) {
      const Accounts: any[] = Object.values(snapshot.val());
      const Applications: any[] = [];

      Accounts.forEach((account) => {
        if (account.Application && Object.keys(account.Application).length > 0) {
          Applications.push(account)
        }
      }
      );

      setSubmissions(Applications)
      //console.log(submissons)
    });

    firebase.database().ref().child('Cats/').on('value', function (snapshot) {
      const Cats: any[] = Object.values(snapshot.val());
      const foundIDs: any[] = [];

      Cats.forEach((item) => {
        if (item.accountID && Object.keys(item.accountID).length > 0) {
          foundIDs.push(item.accountID)
        }
      }
      );

      setiDs(foundIDs)
      //console.log(foundIDs)
    });

    firebase.database().ref().child('Accounts/').on('value', function (snapshot) {
      const Accounts: any[] = Object.values(snapshot.val());
      const tokens: any[] = [];

      Accounts.forEach((account) => {
        if (account.expoNotif && Object.keys(account.expoNotif).length > 0 && (account.modStatus === 3)) {
          tokens.push(account.expoNotif)
        }
      }
      );

      setexpoNotif(tokens)
      //console.log(tokens)
    });

  }, []);

  async function sendPushNotification(array: string[]) {

    for (let i = 0; i < array.length; i++) {

      const message = {
        to: array[i],
        sound: 'default',
        title: 'Temple Cats',
        body: 'Your application has been approved! Please reload the app',
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

  async function sendPushNotificationBad(array: string[]) {

    for (let i = 0; i < array.length; i++) {

      const message = {
        to: array[i],
        sound: 'default',
        title: 'Temple Cats',
        body: 'Your application has been denied!',
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

  //console.log(submissons)

  return (
    <ScrollView>
      <View style={[styles.container, styles.flexColumnContainer]}>

        <Text style={styles.title}>{'\n'}Moderator Applications{'\n'}</Text>
        <View style={styles.flexColumnContainer}>
          {submissons.map((item, index) => (
            <View key={index} style={styles.flexRowContainer}>
              {Object.values(item.Application).map((report, index) => {

                let number = findOccurences(report.accountID);

                return (
                  <View key={index}>

                    <Text>{'Name: ' + report.name}</Text>
                    <Text>{'Why: ' + report.reason1}</Text>
                    <Text>{'Availability: ' + report.reason2}</Text>
                    <Text>{'Prior Experience: ' + report.reason3}</Text>
                    <Text>{'Date: ' + report.date}</Text>
                    <Text>{'Time: ' + report.time}</Text>
                    <Text>{'Cats Reported: ' + number}</Text>



                    {(report.votes) < 3 ? // Do not approve if report has less than 3 votes
                      <Button title='Approve' buttonStyle={styles.buttonStyle} onPress={() => alert("We don't have enough votes yet")} />
                      : <Button title='Approve' buttonStyle={styles.buttonStyle} onPress={() =>
                        changeStatus(report.accountID, item.expoNotif)
                      }
                      />
                    }

                    {(report.votes) <= -3 ? // Do not delete if report does not have -3 votes
                      <Button title='Disapprove' buttonStyle={styles.buttonStyle} onPress={() => removeApp(report.accountID, item.expoNotif)} />
                      : <Button title='Disapprove' buttonStyle={styles.buttonStyle} onPress={() =>
                        alert("More negative votes are needed to remove applcation")
                      }
                      />
                    }

                    <View style={styles.voteContainer}>

                      <Icon
                        name="chevron-up"
                        color="white"
                        type="material-community"
                        size={30}

                        onPress={() => { //Increase votes
                          firebase
                            .database()
                            .ref()
                            .child(`Accounts/${report.accountID}/Application/${report.applicationID}/votes`)
                            .set(report.votes + 1);

                        }}

                      />
                      <Text style={styles.upvoteStyle}>{`${report.votes} upvotes`}</Text>
                      <Icon
                        name="chevron-down"
                        color="white"
                        type="material-community"
                        size={30}
                        onPress={() => { //Decrease votes
                          firebase
                            .database()
                            .ref()
                            .child(`Accounts/${report.accountID}/Application/${report.applicationID}/votes`)
                            .set(report.votes - 1);
                        }}
                      />

                    </View>

                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                  </View>
                );

              })}
            </View>
          ))}
        </View>
        <View style={styles.separator} />
      </View>
    </ScrollView>

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
    paddingVertical: 2,
    paddingHorizontal: 40,
    borderRadius: 40,
    backgroundColor: 'maroon',
    marginBottom: 20,
    marginRight: 'auto',
    fontSize: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    marginHorizontal: -45,
    height: 1,
    width: '150%',
    marginTop: 2,
  },
  flexColumnContainer: {
    flex: 1,
  },
  flexRowContainer: {
    flex: 1,
    flexDirection: "column",
  },

  voteContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#8B0000',
    borderRadius: 40,
    marginRight: 'auto',
    marginBottom: 10,
  },
  upvoteStyle: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});