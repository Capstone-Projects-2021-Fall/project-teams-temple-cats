import React, { useEffect, useState } from 'react';
import { StyleSheet, Button } from 'react-native';

import firebase from 'firebase';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { AuthContext } from '../context/FirebaseAuthContext';
import Mod from '../components/Mod';
import { AuthProvider } from '../context/FirebaseAuthProvider';
import Navigation from '../navigation';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

const modStatus: any[] = [];

/**
 * Function that renders the account screen.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the account button in navigation
 * @returns {JSX.Element} JSX element of the account screen
 */
export default function AccountScreen({ navigation }: RootTabScreenProps<'Account'>) {
  // Needs to be refactored

  const [word, setWord] = useState<any>([]);

  const user = React.useContext(AuthContext);

  useEffect(() => {
    firebase
      .database()
      .ref(`Accounts/${user?.uid}/modStatus`)
      .on('value', (snapshot) => {
        modStatus.push(snapshot.val());
        setWord(modStatus);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button
        color="#8b0000"
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
      {JSON.stringify(modStatus[0]) === '3' ?
        <Mod onReportedPostsPress={() => navigation.push("ReportedPosts")} onDownvotedPostsPress={() => navigation.push("DownvotedPosts")}/>
        : null
      }
    </View>
  );
}

const signOut = async () => {
  firebase.auth().signOut();
};

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
