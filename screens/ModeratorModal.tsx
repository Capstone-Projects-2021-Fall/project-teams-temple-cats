import * as React from 'react';
import { StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';


import firebase from "../utils/firebase";
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { Cat, Comment, Report, RootStackScreenProps, Application, Account } from '../types';
import { ThemeConsumer } from 'react-native-elements';

export default function ModalScreen({ navigation }: RootStackScreenProps<'ReportedPosts'>) {

  const [submissons, setSubmissions] = React.useState<Account[]>([]);

  function changeStatus(accountID: string){
    alert("Moderator application has been approved");
    firebase
    .database()
    .ref()
    .child(`Accounts/${accountID}/modStatus`).set(3); //Set mod status to 3

    firebase
    .database()
    .ref()
    .child(`Accounts/${accountID}/Application`).remove(); //Remove application

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

  }, []);

  //console.log(submissons)

  return (
    <View style={[styles.container, styles.flexColumnContainer]}>

      <Text style={styles.title}>{'\n'}Moderator Applications{'\n'}</Text>
      <View style={styles.flexColumnContainer}>
        {submissons.map((item, index) => (
          <View key={index} style={styles.flexRowContainer}>
            {Object.values(item.Application).map((report, index) => {

              return (
                <View key={index}>

                  <Text>{'Name: ' + report.name}</Text>
                  <Text>{'Reason: ' + report.reason}</Text>


                  {(report.votes) < 5 ? // Do not approve if report has less than 5 votes
                    <Button title='Approve' buttonStyle={styles.buttonStyle} onPress={() => alert("We don't have enough votes yet")}  /> 
                    : <Button title='Approve' buttonStyle={styles.buttonStyle} onPress={() =>  
                     changeStatus(report.accountID)                   
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
                </View>

              );

            })}
          </View>
        ))}
      </View>
      <View style={styles.separator} />
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
    paddingVertical: 2,
    paddingHorizontal: 40,
    borderRadius: 40,
    backgroundColor: 'maroon',
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 2,
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
    flexDirection: "row",
    left: -50,
  },
  catImage: {
    width: 70,
    height: 70,
    borderWidth: 4,
    borderColor: 'rgba(160, 28, 52, 0.75)',
    borderRadius: 7,
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
  upvoteStyle: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});