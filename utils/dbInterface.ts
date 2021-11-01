import React from 'react';
import { LatLng } from 'react-native-maps';
import firebase from './firebase';
import {
  Account, Cat, Pin, User,
} from '../types';

const root = firebase.database().ref();
let reference;

export function addCat(cat: Cat) {
  cat.id = firebase.auth().currentUser?.uid;
  firebase
    .database()
    .ref()
    .child(`Cats/${cat.catID}`)
    .set(cat);
}

export async function addPicture(cat: Cat) {
  const response = await fetch(cat.media);
  const blob = await response.blob();

  firebase
    .storage()
    .ref()
    .child(`${firebase.auth().currentUser?.uid}/${cat.catID}`)
    .put(blob);
}

export function addUser(name: User['displayName'], id: User['accountID'], email: User['email'], photo: User['photo']) {
  firebase
    .database()
    .ref()
    .child(`Accounts/${id}`)
    .set({
      display: name,
      accountID: id,
      email,
      photo,
      posts: 0,
      modStatus: true,
      banStatus: false,
    });

  firebase
    .database()
    .ref()
    .child(`Accounts/${id}`).child('/points')
    .set({
      userName: name,
      highScore: 1,
    });
}
