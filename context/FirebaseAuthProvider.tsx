import React, { useEffect, useState } from 'react';
import { AuthContext } from './FirebaseAuthContext';
import firebase from '../utils/firebase';
import { User } from '../types';
import { addUser } from '../utils/dbInterface';

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<firebase.User | null>(null);

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);

      firebase.database().ref(`Accounts/${firebaseUser?.uid}`).once('value', (snapshot) => {
        console.log(snapshot);
        if (!snapshot.exists()) {
          addUser(firebaseUser?.uid, firebaseUser?.email, firebaseUser?.photoURL);
          console.log('added');
        }
      });
    });
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
